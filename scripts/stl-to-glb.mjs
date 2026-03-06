#!/usr/bin/env node
/**
 * Convert an STL file to a compressed GLB for use in the 3D specimen viewer.
 * Usage: node scripts/stl-to-glb.mjs <input.stl> <output.glb>
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const [,, inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/stl-to-glb.mjs <input.stl> <output.glb>');
  process.exit(1);
}

const stlBuffer = readFileSync(resolve(inputPath));

function parseBinarySTL(buffer) {
  const dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const triangleCount = dv.getUint32(80, true);
  const positions = new Float32Array(triangleCount * 9);
  const normals = new Float32Array(triangleCount * 9);

  let offset = 84;
  for (let i = 0; i < triangleCount; i++) {
    const nx = dv.getFloat32(offset, true);
    const ny = dv.getFloat32(offset + 4, true);
    const nz = dv.getFloat32(offset + 8, true);
    offset += 12;

    for (let v = 0; v < 3; v++) {
      const base = i * 9 + v * 3;
      positions[base] = dv.getFloat32(offset, true);
      positions[base + 1] = dv.getFloat32(offset + 4, true);
      positions[base + 2] = dv.getFloat32(offset + 8, true);
      normals[base] = nx;
      normals[base + 1] = ny;
      normals[base + 2] = nz;
      offset += 12;
    }
    offset += 2; // attribute byte count
  }

  return { positions, normals, triangleCount };
}

function buildGLB(positions, normals) {
  const posBytes = new Uint8Array(positions.buffer);
  const normBytes = new Uint8Array(normals.buffer);
  const binLength = posBytes.length + normBytes.length;

  let posMin = [Infinity, Infinity, Infinity];
  let posMax = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      if (positions[i + j] < posMin[j]) posMin[j] = positions[i + j];
      if (positions[i + j] > posMax[j]) posMax[j] = positions[i + j];
    }
  }

  const vertexCount = positions.length / 3;

  const gltf = {
    asset: { version: '2.0', generator: 'esy-stl-to-glb' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{
      primitives: [{
        attributes: { POSITION: 0, NORMAL: 1 },
        mode: 4,
      }],
    }],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: vertexCount,
        type: 'VEC3',
        max: posMax,
        min: posMin,
      },
      {
        bufferView: 1,
        componentType: 5126,
        count: vertexCount,
        type: 'VEC3',
      },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: posBytes.length },
      { buffer: 0, byteOffset: posBytes.length, byteLength: normBytes.length },
    ],
    buffers: [{ byteLength: binLength }],
  };

  const jsonStr = JSON.stringify(gltf);
  const jsonBuf = Buffer.from(jsonStr);
  const jsonPad = (4 - (jsonBuf.length % 4)) % 4;
  const jsonChunkLength = jsonBuf.length + jsonPad;

  const binPad = (4 - (binLength % 4)) % 4;
  const binChunkLength = binLength + binPad;

  const totalLength = 12 + 8 + jsonChunkLength + 8 + binChunkLength;
  const out = Buffer.alloc(totalLength);
  let o = 0;

  // GLB header
  out.writeUInt32LE(0x46546C67, o); o += 4; // magic "glTF"
  out.writeUInt32LE(2, o); o += 4;           // version
  out.writeUInt32LE(totalLength, o); o += 4;

  // JSON chunk
  out.writeUInt32LE(jsonChunkLength, o); o += 4;
  out.writeUInt32LE(0x4E4F534A, o); o += 4; // "JSON"
  jsonBuf.copy(out, o); o += jsonBuf.length;
  for (let i = 0; i < jsonPad; i++) out[o++] = 0x20;

  // BIN chunk
  out.writeUInt32LE(binChunkLength, o); o += 4;
  out.writeUInt32LE(0x004E4942, o); o += 4; // "BIN\0"
  Buffer.from(posBytes).copy(out, o); o += posBytes.length;
  Buffer.from(normBytes).copy(out, o); o += normBytes.length;
  for (let i = 0; i < binPad; i++) out[o++] = 0x00;

  return out;
}

const { positions, normals, triangleCount } = parseBinarySTL(stlBuffer);
console.log(`Parsed ${triangleCount} triangles (${(positions.length / 3).toLocaleString()} vertices)`);

const glb = buildGLB(positions, normals);
writeFileSync(resolve(outputPath), glb);
console.log(`Written ${(glb.length / 1024 / 1024).toFixed(2)} MB GLB → ${outputPath}`);
