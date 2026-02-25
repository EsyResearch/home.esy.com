'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html, Center } from '@react-three/drei';
import * as THREE from 'three';

const BONE_IVORY = '#E8DCC8';
const SIGNAL_AMBER = '#C4893A';
const CAVE_CHARCOAL = '#1A1C22';

interface Hotspot {
  position: [number, number, number];
  label: string;
  detail: string;
}

interface SpecimenViewerProps {
  meshUrl: string;
  fallbackImage: string;
  fallbackAlt: string;
  fallbackCaption: string;
  label: string;
  hotspots?: Hotspot[];
  autoRotate?: boolean;
  cameraPosition?: [number, number, number];
}

function Specimen({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  React.useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(BONE_IVORY),
          roughness: 0.7,
          metalness: 0.05,
        });
      }
    });
  }, [scene]);

  return (
    <Center>
      <group ref={ref}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

function HotspotMarker({ hotspot, onSelect, isSelected }: {
  hotspot: Hotspot;
  onSelect: () => void;
  isSelected: boolean;
}) {
  return (
    <group position={hotspot.position}>
      <mesh onClick={onSelect}>
        <sphereGeometry args={[0.003, 16, 16]} />
        <meshBasicMaterial color={isSelected ? SIGNAL_AMBER : BONE_IVORY} />
      </mesh>
      {isSelected && (
        <Html distanceFactor={0.3} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: CAVE_CHARCOAL,
            border: `1px solid ${SIGNAL_AMBER}`,
            borderRadius: 4,
            padding: '6px 10px',
            color: BONE_IVORY,
            fontSize: 11,
            fontFamily: 'JetBrains Mono, monospace',
            maxWidth: 180,
            whiteSpace: 'normal',
          }}>
            <div style={{ color: SIGNAL_AMBER, fontWeight: 600, marginBottom: 2 }}>
              {hotspot.label}
            </div>
            <div style={{ opacity: 0.85, lineHeight: 1.4 }}>
              {hotspot.detail}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function LoadingIndicator() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.8;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.05, 0.008, 16, 32]} />
      <meshBasicMaterial color={SIGNAL_AMBER} />
    </mesh>
  );
}

function Scene({ meshUrl, hotspots, autoRotate, cameraPosition }: {
  meshUrl: string;
  hotspots: Hotspot[];
  autoRotate: boolean;
  cameraPosition: [number, number, number];
}) {
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} />
      <Environment preset="warehouse" />
      <Suspense fallback={<LoadingIndicator />}>
        <Specimen url={meshUrl} />
        {hotspots.map((h, i) => (
          <HotspotMarker
            key={i}
            hotspot={h}
            isSelected={selectedHotspot === i}
            onSelect={() => setSelectedHotspot(selectedHotspot === i ? null : i)}
          />
        ))}
      </Suspense>
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        enablePan={false}
        minDistance={0.1}
        maxDistance={1}
        makeDefault
      />
    </>
  );
}

export default function SpecimenViewer({
  meshUrl,
  fallbackImage,
  fallbackAlt,
  fallbackCaption,
  label,
  hotspots = [],
  autoRotate = true,
  cameraPosition = [0, 0, 0.4],
}: SpecimenViewerProps) {
  const [webglFailed, setWebglFailed] = useState(false);

  if (webglFailed) {
    return (
      <div className="naledi-3d-viewer">
        <div className="naledi-3d-viewer__label">{label}</div>
        <div className="naledi-3d-viewer__fallback">
          <img src={fallbackImage} alt={fallbackAlt} loading="lazy" />
          <p>{fallbackCaption}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="naledi-3d-viewer naledi-3d-viewer--live">
      <div className="naledi-3d-viewer__label">{label}</div>
      <div className="naledi-3d-viewer__canvas-wrap">
        <Canvas
          camera={{ position: cameraPosition, fov: 45, near: 0.01, far: 10 }}
          frameloop="demand"
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
          }}
          onError={() => setWebglFailed(true)}
          style={{ background: CAVE_CHARCOAL }}
        >
          <Scene
            meshUrl={meshUrl}
            hotspots={hotspots}
            autoRotate={autoRotate}
            cameraPosition={cameraPosition}
          />
        </Canvas>
        <div className="naledi-3d-viewer__controls-hint">
          Drag to rotate &middot; Scroll to zoom
        </div>
      </div>
    </div>
  );
}
