'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   Penrose Diagram — Immersive 2.5D Visualization

   An interactive Penrose (conformal) diagram showing the causal
   structure of a Schwarzschild black hole, presented as an
   immersive 2.5D experience.

   The diagram is viewed from a tilted perspective that reveals:
   - The black hole interior as a physical depression in the
     spacetime surface — a pit you can see into
   - 3D light cones that rise from the diagram surface
   - A glowing cliff face at the event horizon
   - The singularity pulsing at the bottom of the pit
   
   Light always travels at 45° angles — the fundamental rule
   that makes causal structure immediately visible.
   
   [Penrose, 1963; Hawking & Ellis, 1973]
   ═══════════════════════════════════════════════════════════════ */

// ─── Color palette (essay design system) ─────────────────────
const COLORS = {
  void: 0x050508,
  diamondEdge: 0x3d7ec7,
  gridLine: 0x4a7ab8,
  horizon: 0x1a9e8f,
  horizonGlow: 0x2fd4c0,
  singularity: 0xb5382a,
  singularityGlow: 0xff4444,
  interiorFill: 0x0a1428,
  cliffFace: 0x0e2a4a,
  lightConeOutside: 0x3d7ec7,
  lightConeInside: 0xb5382a,
  observerPoint: 0xc4922a,
  worldline: 0xc4922a,
  photonLine: 0x5a9fd4,
  dust: 0x3d5a80,
  singParticle: 0xd44a3a,
};

// ─── Geometry constants ──────────────────────────────────────
const DS = 4; // diamond scale
const TOP = new THREE.Vector3(0, DS, 0);
const BOTTOM = new THREE.Vector3(0, -DS, 0);
const RIGHT = new THREE.Vector3(DS, 0, 0);
const LEFT = new THREE.Vector3(-DS, 0, 0);
const INTERIOR_DEPTH = -0.7;
const SING_Y = DS * 0.42;
const SING_LEFT_X = -DS * 0.56;
const SING_RIGHT_X = 0;
const SING_MID_X = (SING_LEFT_X + SING_RIGHT_X) / 2;

// ─── Camera poses for different views ────────────────────────
const CAM = {
  home: { pos: [0.2, 3.2, 10.5], look: [0, -0.1, 0] },
  obs0: { pos: [2.0, 2.5, 9.5], look: [1.8, -0.5, 0] },
  obs1: { pos: [-0.2, 5.0, 7.5], look: [-0.8, 0.8, INTERIOR_DEPTH * 0.4] },
  obs2: { pos: [2.5, 2.0, 11.0], look: [2.5, -2.0, 0] },
};

// ─── Observer definitions ────────────────────────────────────
const OBSERVERS = [
  { px: 1.8, py: -0.5, pz: 0.15, label: 'Outside observer', inside: false },
  { px: -0.8, py: 0.8, pz: INTERIOR_DEPTH + 0.15, label: 'Fallen inside', inside: true },
  { px: 2.5, py: -2.0, pz: 0.15, label: 'Distant observer', inside: false },
];

// ─── Utility ─────────────────────────────────────────────────
function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min((x - edge0) / (edge1 - edge0), 1));
  return t * t * (3 - 2 * t);
}

function createTextSprite(text, color = '#888888', size = 0.25, bold = false) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 64;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${bold ? '600' : '400'} ${bold ? 28 : 24}px "JetBrains Mono", "Fira Code", monospace`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 32);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, opacity: 0 });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(size * 4, size, 1);
  return sprite;
}

function createGlowSprite(colorStr, size = 0.5, startOpacity = 0.3) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 128;
  canvas.height = 128;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, colorStr);
  g.addColorStop(0.4, colorStr.replace('rgb(', 'rgba(').replace(')', ', 0.4)'));
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({
    map: texture, transparent: true, opacity: startOpacity,
    blending: THREE.AdditiveBlending, depthTest: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(size, size, 1);
  return sprite;
}

// ═══════════════════════════════════════════════════════════════
//  Component
// ═══════════════════════════════════════════════════════════════

export default function PenroseVisualization({ className = '' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);
  const lightConesRef = useRef([]);
  const selectedRef = useRef(-1);
  const interactionGroupRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const clickablesRef = useRef([]);
  const [selectedPoint, setSelectedPoint] = useState(-1);
  const [hovered, setHovered] = useState(false);
  const [initFailed, setInitFailed] = useState(false);
  const initRef = useRef(false);

  // Camera animation targets
  const camTargetPos = useRef(new THREE.Vector3(...CAM.home.pos));
  const camTargetLook = useRef(new THREE.Vector3(...CAM.home.look));
  const camCurrentLook = useRef(new THREE.Vector3(...CAM.home.look));

  // ─── Build scene ──────────────────────────────────────────
  const buildScene = useCallback(() => {
    if (!containerRef.current || initRef.current) return;
    initRef.current = true;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = Math.min(width * 0.85, 560);

    // CSP guard — Three.js shader compilation uses new Function()
    try { new Function('return true')(); }
    catch { setInitFailed(true); return; }

    let renderer;
    try {
      // ─── Scene ─────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.void);
      scene.fog = new THREE.FogExp2(COLORS.void, 0.012);
    sceneRef.current = scene;

      // ─── Camera (tilted perspective reveals depth) ─────
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(...CAM.home.pos);
      camera.lookAt(...CAM.home.look);
    cameraRef.current = camera;

      // ─── Renderer ─────────────────────────────────────
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

      // ─── Interaction group ────────────────────────────
    const interactionGroup = new THREE.Group();
    scene.add(interactionGroup);
    interactionGroupRef.current = interactionGroup;

      // ═══════════════════════════════════════════════════
      //  DIAMOND BOUNDARY
      // ═══════════════════════════════════════════════════
    const diamondVerts = new Float32Array([
        TOP.x, TOP.y, 0, RIGHT.x, RIGHT.y, 0,
        RIGHT.x, RIGHT.y, 0, BOTTOM.x, BOTTOM.y, 0,
        BOTTOM.x, BOTTOM.y, 0, LEFT.x, LEFT.y, 0,
        LEFT.x, LEFT.y, 0, TOP.x, TOP.y, 0,
      ]);
      const diamondGeom = new THREE.BufferGeometry();
    diamondGeom.setAttribute('position', new THREE.BufferAttribute(diamondVerts, 3));
      const diamondMat = new THREE.LineBasicMaterial({ color: COLORS.diamondEdge, transparent: true, opacity: 0 });
    scene.add(new THREE.LineSegments(diamondGeom, diamondMat));

      // ═══════════════════════════════════════════════════
      //  CONFORMAL GRID
      // ═══════════════════════════════════════════════════
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);

      // Constant-r curves (timelike): i⁻ → i⁺, bowing toward i⁰
    for (let i = 1; i <= 8; i++) {
      const f = i / 9;
        const curve = new THREE.QuadraticBezierCurve3(BOTTOM.clone(), new THREE.Vector3(DS * f, 0, 0), TOP.clone());
        const pts = curve.getPoints(40);
        const geom = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: COLORS.gridLine, transparent: true, opacity: 0 });
        mat.userData = { baseOpacity: 0.18 + f * 0.12 };
      gridGroup.add(new THREE.Line(geom, mat));
    }

      // Constant-t curves (spacelike): LEFT → RIGHT
    for (let i = 1; i <= 6; i++) {
      const f = (i / 7) * 2 - 1;
        const curve = new THREE.QuadraticBezierCurve3(LEFT.clone(), new THREE.Vector3(0, -DS * f * 0.35, 0), RIGHT.clone());
        const pts = curve.getPoints(40);
        const geom = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color: COLORS.gridLine, transparent: true, opacity: 0 });
        mat.userData = { baseOpacity: 0.15 + Math.abs(f) * 0.12 };
      gridGroup.add(new THREE.Line(geom, mat));
    }

      // 45° light ray reference diagonals
      const rayMat = new THREE.LineDashedMaterial({ color: COLORS.observerPoint, transparent: true, opacity: 0, dashSize: 0.15, gapSize: 0.25 });
      const ray1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([BOTTOM.clone(), RIGHT.clone()]), rayMat.clone());
      ray1.computeLineDistances(); gridGroup.add(ray1);
      const ray2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([BOTTOM.clone(), LEFT.clone()]), rayMat.clone());
      ray2.computeLineDistances(); gridGroup.add(ray2);

      // ═══════════════════════════════════════════════════
      //  INTERIOR PIT (depressed region)
      // ═══════════════════════════════════════════════════
      const interiorShape = new THREE.Shape();
      interiorShape.moveTo(LEFT.x, LEFT.y);
      interiorShape.lineTo(SING_LEFT_X, SING_Y);
      interiorShape.lineTo(SING_RIGHT_X, SING_Y);
      interiorShape.lineTo(TOP.x, TOP.y);
      interiorShape.closePath();
      const interiorGeom = new THREE.ShapeGeometry(interiorShape);
      // Depress all vertices into the pit
      const iPos = interiorGeom.attributes.position;
      for (let vi = 0; vi < iPos.count; vi++) iPos.setZ(vi, INTERIOR_DEPTH);
      iPos.needsUpdate = true;
      const interiorMat = new THREE.MeshBasicMaterial({
        color: COLORS.interiorFill, transparent: true, opacity: 0, side: THREE.DoubleSide,
      });
      const interiorMesh = new THREE.Mesh(interiorGeom, interiorMat);
      scene.add(interiorMesh);

      // ─── Cliff wall (event horizon face) ─────────────
      const wallSegs = 24;
      const wallPos = [];
      const wallIdx = [];
      for (let i = 0; i <= wallSegs; i++) {
        const t = i / wallSegs;
        const x = LEFT.x + t * (TOP.x - LEFT.x);
        const y = LEFT.y + t * (TOP.y - LEFT.y);
        wallPos.push(x, y, 0, x, y, INTERIOR_DEPTH);
        if (i > 0) {
          const b = (i - 1) * 2;
          wallIdx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
        }
      }
      const wallGeom = new THREE.BufferGeometry();
      wallGeom.setAttribute('position', new THREE.Float32BufferAttribute(wallPos, 3));
      wallGeom.setIndex(wallIdx);
      wallGeom.computeVertexNormals();
      const wallMat = new THREE.MeshBasicMaterial({
        color: COLORS.cliffFace, transparent: true, opacity: 0, side: THREE.DoubleSide,
      });
      scene.add(new THREE.Mesh(wallGeom, wallMat));

      // ─── Cliff edge glow ──────────────────────────────
      const cliffEdgePts = [];
      for (let i = 0; i <= wallSegs; i++) {
        const t = i / wallSegs;
        cliffEdgePts.push(new THREE.Vector3(LEFT.x + t * (TOP.x - LEFT.x), LEFT.y + t * (TOP.y - LEFT.y), 0.01));
      }
      const cliffEdgeMat = new THREE.LineBasicMaterial({ color: COLORS.horizonGlow, transparent: true, opacity: 0 });
      const cliffEdge = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cliffEdgePts), cliffEdgeMat);
      scene.add(cliffEdge);

      // Horizon glow sprite
      const horizonGlow = createGlowSprite('rgb(26, 158, 143)', 3.0, 0);
      horizonGlow.position.set((LEFT.x + TOP.x) / 2, (LEFT.y + TOP.y) / 2, 0.15);
    scene.add(horizonGlow);

    // Horizon label
    const horizonLabel = createTextSprite('event horizon', '#1a9e8f', 0.22, true);
      horizonLabel.position.set(LEFT.x + 1.5, (LEFT.y + TOP.y) / 2 + 0.2, 0.3);
    scene.add(horizonLabel);

      // ═══════════════════════════════════════════════════
      //  SINGULARITY
      // ═══════════════════════════════════════════════════
      // Wavy line
      const singPts = [];
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        const x = SING_LEFT_X + t * (SING_RIGHT_X - SING_LEFT_X);
        const wave = Math.sin(t * Math.PI * 14) * 0.08;
        singPts.push(new THREE.Vector3(x, SING_Y + wave, INTERIOR_DEPTH + 0.02));
      }
      const singMat = new THREE.LineBasicMaterial({ color: COLORS.singularity, transparent: true, opacity: 0 });
      const singLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(singPts), singMat);
      scene.add(singLine);

      // Primary glow
      const singGlow = createGlowSprite('rgb(181, 56, 42)', 3.5, 0);
      singGlow.position.set(SING_MID_X, SING_Y, INTERIOR_DEPTH + 0.1);
    scene.add(singGlow);

      // Hot inner glow
      const singGlow2 = createGlowSprite('rgb(255, 80, 60)', 1.5, 0);
      singGlow2.position.set(SING_MID_X, SING_Y, INTERIOR_DEPTH + 0.15);
      scene.add(singGlow2);

      // Label
    const singLabel = createTextSprite('SINGULARITY', '#b5382a', 0.2, true);
      singLabel.position.set(SING_MID_X, SING_Y + 0.4, INTERIOR_DEPTH + 0.2);
    scene.add(singLabel);

      // ─── Absorption particles ─────────────────────────
      const singPCount = 35;
      const singPGeom = new THREE.BufferGeometry();
      const singPPos = new Float32Array(singPCount * 3);
      const singPSpeeds = new Float32Array(singPCount);
      function resetSP(i) {
        const a = Math.random() * Math.PI;
        const r = 0.3 + Math.random() * 1.8;
        singPPos[i * 3] = SING_MID_X + Math.cos(a) * r;
        singPPos[i * 3 + 1] = SING_Y - Math.sin(a) * r * 0.6 - 0.2;
        singPPos[i * 3 + 2] = INTERIOR_DEPTH + 0.05 + Math.random() * 0.3;
        singPSpeeds[i] = 0.003 + Math.random() * 0.005;
      }
      for (let i = 0; i < singPCount; i++) resetSP(i);
      singPGeom.setAttribute('position', new THREE.BufferAttribute(singPPos, 3));
      const singPMat = new THREE.PointsMaterial({
        color: COLORS.singParticle, size: 0.04, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthTest: false,
      });
      const singParticles = new THREE.Points(singPGeom, singPMat);
      scene.add(singParticles);

      // ═══════════════════════════════════════════════════
      //  LABELS
      // ═══════════════════════════════════════════════════
      const labels = [];
      const addLabel = (text, color, sz, bold, pos) => {
        const s = createTextSprite(text, color, sz, bold);
        s.position.set(...pos);
        scene.add(s);
        labels.push(s);
        return s;
      };
      addLabel('i\u207A  future timelike \u221E', '#666666', 0.2, true, [TOP.x, TOP.y + 0.4, 0]);
      addLabel('i\u207B  past timelike \u221E', '#666666', 0.2, true, [BOTTOM.x, BOTTOM.y - 0.4, 0]);
      addLabel('i\u2070  spatial \u221E', '#666666', 0.2, true, [RIGHT.x + 0.7, RIGHT.y, 0]);
      addLabel('\uD835\uDCA5\u207A', '#555555', 0.22, false, [DS * 0.62, DS * 0.52, 0]);
      addLabel('\uD835\uDCA5\u207B', '#555555', 0.22, false, [DS * 0.62, -DS * 0.52, 0]);

      // ═══════════════════════════════════════════════════
      //  INTERACTIVE OBSERVER POINTS
      // ═══════════════════════════════════════════════════
      const clickables = [];
      OBSERVERS.forEach((obs, i) => {
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.14, 16, 16),
          new THREE.MeshBasicMaterial({ color: COLORS.observerPoint, transparent: true, opacity: 0 }),
        );
        sphere.position.set(obs.px, obs.py, obs.pz);
      sphere.userData = { observerIndex: i };
      interactionGroup.add(sphere);
      clickables.push(sphere);

        // Glow
        const glow = createGlowSprite('rgb(196, 146, 42)', 0.7, 0);
        glow.position.set(obs.px, obs.py, obs.pz + 0.08);
        glow.userData = { role: 'obsGlow' };
      interactionGroup.add(glow);

      // Label
        const lbl = createTextSprite(obs.label, '#c4922a', 0.16);
        lbl.position.set(obs.px + 0.6, obs.py - 0.3, obs.pz + 0.05);
        lbl.userData = { role: 'obsLabel' };
        interactionGroup.add(lbl);
    });
    clickablesRef.current = clickables;

      // ═══════════════════════════════════════════════════
      //  TRAPPED LIGHT CONES (always visible in interior)
      // ═══════════════════════════════════════════════════
      const trappedCones = [];
      [
        [-0.6, 0.4, INTERIOR_DEPTH + 0.1],
        [-1.4, 0.5, INTERIOR_DEPTH + 0.1],
        [-0.2, 1.1, INTERIOR_DEPTH + 0.1],
      ].forEach(p => {
        const grp = new THREE.Group();
        grp.position.set(...p);

        // Solid cone pointing toward singularity
        const coneGeom = new THREE.ConeGeometry(0.35, 0.6, 16, 1, true);
        const coneMat = new THREE.MeshBasicMaterial({
          color: COLORS.lightConeInside, transparent: true, opacity: 0, side: THREE.DoubleSide, depthTest: false,
        });
        const cone = new THREE.Mesh(coneGeom, coneMat);
        cone.position.set(0, 0.3, 0.1);
        grp.add(cone);

        // Wireframe overlay
        const wire = new THREE.Mesh(
          new THREE.ConeGeometry(0.35, 0.6, 8, 1, true),
          new THREE.MeshBasicMaterial({ color: COLORS.lightConeInside, transparent: true, opacity: 0, wireframe: true }),
        );
        wire.position.set(0, 0.3, 0.1);
        grp.add(wire);

        // Base point
        grp.add(new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 8, 8),
          new THREE.MeshBasicMaterial({ color: COLORS.lightConeInside, transparent: true, opacity: 0 }),
        ));

        scene.add(grp);
        trappedCones.push(grp);
      });

      // ═══════════════════════════════════════════════════
      //  WORLDLINES
      // ═══════════════════════════════════════════════════
    const worldlines = [];

      // WL1: infalling observer (gold)
      const wl1Pts = [];
      for (let i = 0; i <= 80; i++) {
        const t = i / 80;
        const x = 1.5 - t * 2.8 + Math.sin(t * Math.PI) * 0.25;
        let y = -2.8 + t * 5.5;
        y = Math.min(y, SING_Y - 0.15);
        const crossT = 0.45;
        const z = t > crossT ? INTERIOR_DEPTH * Math.min((t - crossT) / 0.15, 1) + 0.02 : 0.02;
        wl1Pts.push(new THREE.Vector3(x, y, z));
      }
      const wl1 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(wl1Pts),
        new THREE.LineBasicMaterial({ color: COLORS.worldline, transparent: true, opacity: 0 }),
      );
    scene.add(wl1);
      const wl1Head = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 12, 12),
        new THREE.MeshBasicMaterial({ color: COLORS.worldline, transparent: true, opacity: 0 }),
      );
      scene.add(wl1Head);
      const wl1Glow = createGlowSprite('rgb(196, 146, 42)', 0.5, 0);
      scene.add(wl1Glow);
      worldlines.push({ line: wl1, points: wl1Pts, progress: 0, speed: 0, head: wl1Head, glow: wl1Glow });

      // WL2: photon at 45° (blue)
      const wl2Pts = [];
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        wl2Pts.push(new THREE.Vector3(2.5 - t * 4.5, Math.min(-2.5 + t * 4.5, DS - 0.15), 0.02));
      }
      const wl2 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(wl2Pts),
        new THREE.LineDashedMaterial({ color: COLORS.photonLine, transparent: true, opacity: 0, dashSize: 0.12, gapSize: 0.08 }),
      );
    wl2.computeLineDistances();
    scene.add(wl2);
      const wl2Head = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 10, 10),
        new THREE.MeshBasicMaterial({ color: COLORS.photonLine, transparent: true, opacity: 0 }),
      );
      scene.add(wl2Head);
      const wl2Glow = createGlowSprite('rgb(90, 159, 212)', 0.35, 0);
      scene.add(wl2Glow);
      worldlines.push({ line: wl2, points: wl2Pts, progress: 0, speed: 0, head: wl2Head, glow: wl2Glow });

      // ═══════════════════════════════════════════════════
      //  AMBIENT DUST
      // ═══════════════════════════════════════════════════
      const dustCount = 100;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * DS * 0.85;
        dustPositions[i * 3] = Math.cos(a) * r * 0.7;
        dustPositions[i * 3 + 1] = Math.sin(a) * r * 0.7;
        dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      }
      const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
        color: COLORS.dust, size: 0.03, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthTest: false,
    });
    const dust = new THREE.Points(dustGeom, dustMat);
    scene.add(dust);

      // ═══════════════════════════════════════════════════
      //  ANIMATE
      // ═══════════════════════════════════════════════════
    const clock = new THREE.Clock();
      const BUILD_DUR = 4.5;
    
    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
        const bT = Math.min(elapsed / BUILD_DUR, 1);

        // ── Camera lerp ────────────────────────────────
        camera.position.lerp(camTargetPos.current, 0.025);
        camCurrentLook.current.lerp(camTargetLook.current, 0.025);
        camera.lookAt(camCurrentLook.current);

        // Subtle ambient sway
        const sway = Math.sin(elapsed * 0.06) * 0.15;
        camera.position.x += sway * 0.3;
        camera.position.y += Math.sin(elapsed * 0.04) * 0.08;

        // ── Phase 1: Diamond boundary (0 → 0.2) ───────
        diamondMat.opacity = 0.5 * smoothstep(0, 0.2, bT);

        // ── Phase 2: Grid (0.1 → 0.35) ────────────────
        gridGroup.children.forEach(child => {
          const base = child.material.userData?.baseOpacity || 0.08;
          child.material.opacity = base * smoothstep(0.1, 0.35, bT);
        });

        // ── Phase 3: Interior + cliff + horizon (0.25 → 0.5)
        const intT = smoothstep(0.25, 0.5, bT);
        interiorMat.opacity = 0.3 * intT;
        wallMat.opacity = 0.2 * intT;
        cliffEdgeMat.opacity = 0.7 * intT;
        horizonGlow.material.opacity = (0.08 + Math.sin(elapsed * 1.2 + 1) * 0.04) * intT;
        horizonLabel.material.opacity = intT;

        // ── Phase 4: Singularity (0.4 → 0.65) ─────────
        const sT = smoothstep(0.4, 0.65, bT);
        singMat.opacity = 0.9 * sT;
        singGlow.material.opacity = (0.15 + Math.sin(elapsed * 2) * 0.08) * sT;
      singGlow.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.15);
        singGlow2.material.opacity = (0.1 + Math.sin(elapsed * 2.5 + 1) * 0.05) * sT;
        singLabel.material.opacity = sT;
        singPMat.opacity = 0.4 * sT;

        // ── Phase 5: Labels (0.5 → 0.7) ───────────────
        const lT = smoothstep(0.5, 0.7, bT);
        labels.forEach(l => { l.material.opacity = lT; });

        // ── Phase 6: Observers (0.65 → 0.85) ──────────
        const oT = smoothstep(0.65, 0.85, bT);
        clickables.forEach((sphere, i) => {
          const sel = selectedRef.current === i;
          sphere.material.opacity = (sel ? 1.0 : 0.85) * oT;
          sphere.scale.setScalar(sel ? 1.4 : 1 + Math.sin(elapsed * 2 + i) * 0.05);
        });
        interactionGroup.children.forEach(child => {
          if (child.userData?.role === 'obsGlow') child.material.opacity = 0.35 * oT;
          if (child.userData?.role === 'obsLabel') child.material.opacity = oT;
        });

        // Trapped cones (follow singularity phase)
        trappedCones.forEach((grp, i) => {
          const s = 1 + Math.sin(elapsed * 1.5 + i * 2) * 0.05;
          grp.scale.set(s, s, s);
          grp.children.forEach(child => {
            if (!child.material) return;
            const baseOp = child.material.wireframe ? 0.25 : (child.geometry?.parameters?.radius < 0.1 ? 0.6 : 0.12);
            child.material.opacity = baseOp * sT;
          });
        });

        // ── Singularity absorption particles ───────────
        if (bT > 0.5) {
          for (let i = 0; i < singPCount; i++) {
            const px = singPPos[i * 3];
            const py = singPPos[i * 3 + 1];
            const dx = SING_MID_X - px;
            const dy = SING_Y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.08) { resetSP(i); }
            else {
              const spd = singPSpeeds[i];
              singPPos[i * 3] += (dx / dist) * spd;
              singPPos[i * 3 + 1] += (dy / dist) * spd;
            }
          }
          singParticles.geometry.attributes.position.needsUpdate = true;
        }

        // ── Worldlines (start after phase 0.7) ────────
        if (bT > 0.7) {
          const wlFade = smoothstep(0.7, 0.85, bT);
          worldlines.forEach(wl => {
            wl.progress = Math.min(wl.progress + wl.speed, 1);
            wl.line.material.opacity = wl.progress * 0.4 * wlFade;
            const total = wl.points.length;
            const dc = Math.floor(wl.progress * total);
            wl.line.geometry.setDrawRange(0, dc);
            if (dc > 0) {
              const pt = wl.points[Math.min(dc - 1, total - 1)];
              wl.head.position.copy(pt);
              wl.head.material.opacity = wl.progress > 0.02 ? 0.9 * wlFade : 0;
              wl.glow.position.copy(pt);
              wl.glow.position.z += 0.05;
              wl.glow.material.opacity = wl.progress > 0.02 ? 0.5 * wlFade : 0;
            }
          });
        }

        // ── Dust drift ─────────────────────────────────
        if (bT > 0.2) {
          dustMat.opacity = 0.12 * smoothstep(0.2, 0.5, bT);
          const dp = dust.geometry.attributes.position.array;
          for (let i = 0; i < dustCount; i++) {
            dp[i * 3 + 1] += 0.0004 * Math.sin(elapsed + i);
            dp[i * 3] += 0.0003 * Math.cos(elapsed * 0.7 + i);
            if (Math.abs(dp[i * 3]) > DS || Math.abs(dp[i * 3 + 1]) > DS) {
              dp[i * 3] = (Math.random() - 0.5) * DS * 1.2;
              dp[i * 3 + 1] = -DS * 0.8 + Math.random() * DS * 0.4;
        }
      }
      dust.geometry.attributes.position.needsUpdate = true;
        }

      renderer.render(scene, camera);
    }

    animate();

      // Stagger worldline start
      setTimeout(() => { worldlines[0].speed = 0.004; }, 3200);
      setTimeout(() => { worldlines[1].speed = 0.006; }, 4000);

    } catch (err) {
      console.warn('[PenroseVisualization] Three.js init failed:', err);
      setInitFailed(true);
      if (renderer) { try { renderer.dispose(); renderer.forceContextLoss(); } catch {} }
    }
  }, []);

  // ─── Light cone creation on observer selection ────────────
  useEffect(() => {
    if (!sceneRef.current || !interactionGroupRef.current) return;

    // Clear previous cones
    lightConesRef.current.forEach(obj => {
      interactionGroupRef.current.remove(obj);
      obj.traverse(c => { if (c.geometry) c.geometry.dispose(); if (c.material) c.material.dispose(); });
    });
    lightConesRef.current = [];

    if (selectedPoint < 0) {
      // Reset camera
      camTargetPos.current.set(...CAM.home.pos);
      camTargetLook.current.set(...CAM.home.look);
      return;
    }

    const obs = OBSERVERS[selectedPoint];
    if (!obs) return;

    // Update camera target
    const camKey = `obs${selectedPoint}`;
    const camPose = CAM[camKey] || CAM.home;
    camTargetPos.current.set(...camPose.pos);
    camTargetLook.current.set(...camPose.look);

    // Build 3D light cone
    const grp = new THREE.Group();
    grp.position.set(obs.px, obs.py, obs.pz);

    const isInside = obs.inside;
    const coneColor = isInside ? COLORS.lightConeInside : COLORS.lightConeOutside;
    const coneH = isInside ? 0.9 : 1.2;
    const coneR = isInside ? 0.55 : 0.7;

    // Future light cone
    const futureGeom = new THREE.ConeGeometry(coneR, coneH, 24, 1, true);
    const futureMat = new THREE.MeshBasicMaterial({
      color: coneColor, transparent: true, opacity: 0.15, side: THREE.DoubleSide, depthTest: false,
    });
    const futureCone = new THREE.Mesh(futureGeom, futureMat);
    futureCone.position.set(0, coneH / 2, isInside ? 0 : 0.1);
    if (isInside) futureCone.rotation.z = 0.15; // tilt toward singularity
    grp.add(futureCone);

    // Future wireframe
    const futureWire = new THREE.Mesh(
      new THREE.ConeGeometry(coneR, coneH, 12, 1, true),
      new THREE.MeshBasicMaterial({ color: coneColor, transparent: true, opacity: 0.35, wireframe: true }),
    );
    futureWire.position.copy(futureCone.position);
    futureWire.rotation.copy(futureCone.rotation);
    grp.add(futureWire);

    // Past light cone (inverted, smaller)
    const pastGeom = new THREE.ConeGeometry(coneR * 0.7, coneH * 0.7, 24, 1, true);
    const pastMat = new THREE.MeshBasicMaterial({
      color: coneColor, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthTest: false,
    });
    const pastCone = new THREE.Mesh(pastGeom, pastMat);
    pastCone.position.y = -coneH * 0.35;
    pastCone.rotation.x = Math.PI;
    grp.add(pastCone);

    // Central glow
    const colorStr = isInside ? 'rgb(181, 56, 42)' : 'rgb(61, 126, 199)';
    const glow = createGlowSprite(colorStr, 1.2, 0.5);
    glow.position.z = 0.1;
    grp.add(glow);

    interactionGroupRef.current.add(grp);
    lightConesRef.current.push(grp);
  }, [selectedPoint]);

  // ─── Click handler ────────────────────────────────────────
  const handleClick = useCallback((e) => {
    if (!rendererRef.current || !cameraRef.current) return;
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const hits = raycasterRef.current.intersectObjects(clickablesRef.current);
    if (hits.length > 0) {
      const idx = hits[0].object.userData.observerIndex;
      const val = selectedRef.current === idx ? -1 : idx;
      selectedRef.current = val;
      setSelectedPoint(val);
    } else {
      selectedRef.current = -1;
      setSelectedPoint(-1);
    }
  }, []);

  // ─── Mouse move (cursor) ──────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    if (!rendererRef.current || !cameraRef.current) return;
    const rect = rendererRef.current.domElement.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    setHovered(raycasterRef.current.intersectObjects(clickablesRef.current).length > 0);
  }, []);

  // ─── Lazy init via IntersectionObserver ────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { buildScene(); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => {
      obs.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement?.parentNode) rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
      }
      if (sceneRef.current) {
        sceneRef.current.traverse(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) { if (child.material.map) child.material.map.dispose(); child.material.dispose(); }
        });
      }
    };
  }, [buildScene]);

  // ─── Attach interaction listeners ─────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('click', handleClick);
    el.addEventListener('mousemove', handleMouseMove);
    return () => { el.removeEventListener('click', handleClick); el.removeEventListener('mousemove', handleMouseMove); };
  }, [handleClick, handleMouseMove]);

  // ─── Resize ───────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = Math.min(w * 0.85, 560);
      rendererRef.current.setSize(w, h);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, []);

  // ─── Fallback (CSP / WebGL failure) ───────────────────────
  if (initFailed) {
    return (
      <div className={`bh-penrose-3d ${className}`}
        role="figure"
        aria-label="Penrose conformal diagram showing the causal structure of a black hole."
        style={{ height: 500, background: '#050508', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="280" height="280" viewBox="0 0 280 280" style={{ opacity: 0.6 }}>
          <polygon points="140,20 260,140 140,260 20,140" fill="none" stroke="#3d7ec7" strokeWidth="1.5" opacity="0.4" />
          <line x1="20" y1="140" x2="140" y2="20" stroke="#1a9e8f" strokeWidth="1.5" opacity="0.6" />
          <line x1="60" y1="100" x2="100" y2="100" stroke="#b5382a" strokeWidth="2" strokeDasharray="4 2" />
          <text x="140" y="15" textAnchor="middle" fill="#666" fontSize="10" fontFamily="monospace">i⁺</text>
          <text x="140" y="275" textAnchor="middle" fill="#666" fontSize="10" fontFamily="monospace">i⁻</text>
          <text x="270" y="144" textAnchor="start" fill="#666" fontSize="10" fontFamily="monospace">i⁰</text>
          <text x="80" y="88" textAnchor="middle" fill="#b5382a" fontSize="9" fontFamily="monospace">singularity</text>
          <text x="65" y="130" textAnchor="middle" fill="#1a9e8f" fontSize="9" fontFamily="monospace">horizon</text>
        </svg>
        <p style={{ color: '#666', fontSize: '0.8rem', fontFamily: 'monospace', marginTop: '1rem', textAlign: 'center', maxWidth: 300, lineHeight: 1.5 }}>
          Interactive visualization unavailable. The Penrose diagram maps all of spacetime onto a diamond where light always travels at 45°.
        </p>
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className={`bh-penrose-3d ${className}`}>
      <div
        ref={containerRef}
        className="bh-penrose-3d__canvas"
        style={{ cursor: hovered ? 'pointer' : 'default' }}
        role="figure"
        aria-label="Interactive 3D Penrose conformal diagram for a Schwarzschild black hole. Tap observer points to see their light cones."
      />
      <div className="bh-penrose-3d__hint">
        {selectedPoint >= 0
          ? `${OBSERVERS[selectedPoint].label} — ${
              OBSERVERS[selectedPoint].inside
                ? 'Light cone points toward singularity. No escape direction exists.'
                : 'Light cone reaches future infinity. Signals can escape.'
            }`
          : 'Tap any gold point to see its light cone — the region of spacetime its future can reach.'}
      </div>
    </div>
  );
}
