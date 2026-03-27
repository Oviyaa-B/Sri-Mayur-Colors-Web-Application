/**
 * Advanced 3D Procedural Dress Shirt
 * - Realistic geometry (tapered torso, cloth fold deformation)
 * - Dual-layer canvas texture: fabric weave + selectable pattern
 * - Smooth PBR property interpolation per material
 * - Floating + idle gentle rotation animation
 * - Color changes propagate instantly via easing
 */
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { easing } from 'maath';
import useDesignStore from '../../store/designStore';
import { CLOTH_DATABASE } from '../../config/designLabOptions';
import { PATTERNS, shiftColor } from './PatternSelector';

// ─────────────────────────────────────────────────────────────
// PBR PROFILES BY MATERIAL CATEGORY
// ─────────────────────────────────────────────────────────────
const PBR = {
  'Luxury':       { roughness: 0.10, metalness: 0.06, envMapIntensity: 2.2, normalScale: 0.15 },
  'Synthetic':    { roughness: 0.45, metalness: 0.10, envMapIntensity: 1.3, normalScale: 0.2 },
  'Blended':      { roughness: 0.55, metalness: 0.03, envMapIntensity: 0.9, normalScale: 0.3 },
  'Technical':    { roughness: 0.75, metalness: 0.00, envMapIntensity: 0.5, normalScale: 0.4 },
  'Heavy Duty':   { roughness: 0.92, metalness: 0.00, envMapIntensity: 0.3, normalScale: 0.6 },
  'Natural':      { roughness: 0.82, metalness: 0.00, envMapIntensity: 0.6, normalScale: 0.45 },
  'Sustainable':  { roughness: 0.78, metalness: 0.00, envMapIntensity: 0.6, normalScale: 0.4 },
  'Semi-Synthetic':{ roughness: 0.35, metalness: 0.04, envMapIntensity: 1.1, normalScale: 0.2 },
};

const getPBR = (matData) => {
  const base = PBR[matData?.category] || PBR['Natural'];
  const s = matData?.smoothness ?? 0.5;
  return {
    roughness: Math.max(0.05, base.roughness - s * 0.15),
    metalness: base.metalness,
    envMapIntensity: base.envMapIntensity + s * 0.3,
    normalScale: base.normalScale,
  };
};

// ─────────────────────────────────────────────────────────────
// COMBINED TEXTURE BUILDER — fabric weave + pattern overlay
// ─────────────────────────────────────────────────────────────
const buildCombinedTexture = (weave, smoothness, patternId, color) => {
  const SIZE = 512;
  const c = document.createElement('canvas');
  c.width = SIZE; c.height = SIZE;
  const ctx = c.getContext('2d');

  // ── STEP 1: Draw fabric base ──────────────────────────────
  ctx.fillStyle = '#f7f7f5';
  ctx.fillRect(0, 0, SIZE, SIZE);

  switch (weave) {
    case 'Satin Weave': {
      const g = ctx.createLinearGradient(0, 0, SIZE, SIZE);
      g.addColorStop(0, '#ffffff'); g.addColorStop(0.5, '#f0f0f0'); g.addColorStop(1, '#ffffff');
      ctx.fillStyle = g; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1;
      for (let i = 0; i < SIZE; i += 4) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(SIZE, i); ctx.stroke(); }
      break;
    }
    case 'Oxford (Basketweave)': {
      const bs = 10;
      for (let y = 0; y < SIZE; y += bs * 2) for (let x = 0; x < SIZE; x += bs * 2) {
        ctx.fillStyle = 'rgba(205,205,202,0.45)'; ctx.fillRect(x, y, bs * 2, bs);
        ctx.fillStyle = 'rgba(190,190,187,0.45)';
        ctx.fillRect(x, y + bs, bs, bs); ctx.fillRect(x + bs, y + bs, bs, bs);
      }
      break;
    }
    case 'Twill (Diagonal)': {
      ctx.fillStyle = '#f0f0ee'; ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.strokeStyle = 'rgba(170,170,168,0.32)'; ctx.lineWidth = 2.5;
      for (let i = -SIZE; i < SIZE * 2; i += 10) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i - SIZE, SIZE); ctx.stroke(); }
      break;
    }
    case 'Pique (Honeycomb)': {
      const hs = 13;
      for (let y = 0; y < SIZE; y += hs * 1.73) for (let x = 0; x < SIZE; x += hs * 3) {
        const ox = (Math.round(y / (hs * 1.73)) % 2) * hs * 1.5;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) { const a = (Math.PI / 3) * k; k === 0 ? ctx.moveTo(x + ox + hs * Math.cos(a), y + hs * Math.sin(a)) : ctx.lineTo(x + ox + hs * Math.cos(a), y + hs * Math.sin(a)); }
        ctx.closePath(); ctx.strokeStyle = 'rgba(185,185,182,0.3)'; ctx.lineWidth = 1; ctx.stroke();
      }
      break;
    }
    default: { // Plain weave
      const step = Math.max(2, Math.round(4 - smoothness * 2));
      ctx.strokeStyle = 'rgba(190,190,188,0.22)'; ctx.lineWidth = 1;
      for (let i = 0; i < SIZE; i += step) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, SIZE); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(SIZE, i); ctx.stroke();
      }
    }
  }

  // Micro fiber noise
  const id = ctx.getImageData(0, 0, SIZE, SIZE); const d = id.data;
  const ns = (1 - smoothness) * 18;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * ns;
    d[i] = Math.min(255, Math.max(0, d[i] + n));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + n));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + n));
  }
  ctx.putImageData(id, 0, 0);

  // ── STEP 2: Apply color tint ──────────────────────────────
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = color || '#ffffff';
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.globalCompositeOperation = 'source-over';

  // ── STEP 3: Overlay pattern ───────────────────────────────
  if (patternId && patternId !== 'Plain') {
    const patternDef = PATTERNS.find(p => p.id === patternId);
    if (patternDef) {
      // Draw pattern into a temp canvas, then composite it
      const pc = document.createElement('canvas');
      pc.width = SIZE; pc.height = SIZE;
      const pCtx = pc.getContext('2d');
      // Use transparent base so we only get the pattern marks
      patternDef.generate(pCtx, SIZE, color || '#ffffff');
      ctx.globalAlpha = 1.0;
      ctx.drawImage(pc, 0, 0);
    }
  }

  // ── STEP 4: Build normal map for fabric depth ─────────────
  const nc = document.createElement('canvas');
  nc.width = SIZE; nc.height = SIZE;
  const nCtx = nc.getContext('2d');
  nCtx.fillStyle = '#8080ff';
  nCtx.fillRect(0, 0, SIZE, SIZE);
  // Add weave-appropriate normal ridges
  switch (weave) {
    case 'Twill (Diagonal)':
      nCtx.strokeStyle = 'rgba(95,95,210,0.4)'; nCtx.lineWidth = 3;
      for (let i = -SIZE; i < SIZE * 2; i += 10) { nCtx.beginPath(); nCtx.moveTo(i, 0); nCtx.lineTo(i - SIZE, SIZE); nCtx.stroke(); }
      break;
    case 'Oxford (Basketweave)':
      for (let y = 0; y < SIZE; y += 20) for (let x = 0; x < SIZE; x += 20) {
        nCtx.fillStyle = (((x / 20) + (y / 20)) % 2 === 0) ? 'rgba(120,80,255,0.25)' : 'rgba(80,120,255,0.25)';
        nCtx.fillRect(x, y, 20, 20);
      }
      break;
    case 'Satin Weave':
      nCtx.strokeStyle = 'rgba(128,128,240,0.15)'; nCtx.lineWidth = 2;
      for (let i = 0; i < SIZE; i += 4) { nCtx.beginPath(); nCtx.moveTo(0, i); nCtx.lineTo(SIZE, i); nCtx.stroke(); }
      break;
    default:
      nCtx.strokeStyle = 'rgba(100,100,220,0.2)'; nCtx.lineWidth = 1;
      for (let i = 0; i < SIZE; i += 4) { nCtx.beginPath(); nCtx.moveTo(i, 0); nCtx.lineTo(i, SIZE); nCtx.stroke(); nCtx.beginPath(); nCtx.moveTo(0, i); nCtx.lineTo(SIZE, i); nCtx.stroke(); }
  }

  const mkTex = (canvas, repeatX = 5, repeatY = 5) => {
    const t = new THREE.CanvasTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeatX, repeatY);
    t.anisotropy = 16;
    t.needsUpdate = true;
    return t;
  };

  return { diffuse: mkTex(c, 4, 4), normal: mkTex(nc, 4, 4) };
};

// ─────────────────────────────────────────────────────────────
// SHARED MATERIAL HOOK
// ─────────────────────────────────────────────────────────────
const useShirtMaterial = (color, materialType, pattern) => {
  const matData = CLOTH_DATABASE[materialType] || CLOTH_DATABASE['Pure Cotton'];
  const pbr = useMemo(() => getPBR(matData), [materialType]); // eslint-disable-line

  const textures = useMemo(
    () => buildCombinedTexture(matData?.weave ?? 'Plain Weave', matData?.smoothness ?? 0.5, pattern, color),
    [materialType, pattern, color] // eslint-disable-line
  );

  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      roughness: pbr.roughness,
      metalness: pbr.metalness,
      envMapIntensity: pbr.envMapIntensity,
      map: textures.diffuse,
      normalMap: textures.normal,
      normalScale: new THREE.Vector2(pbr.normalScale, pbr.normalScale),
    });
    m.needsUpdate = true;
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialType, pattern, color]);

  return { mat, pbr };
};

// ─────────────────────────────────────────────────────────────
// VERTEX CLOTH FOLD DEFORMATION
// ─────────────────────────────────────────────────────────────
const applyClothFolds = (geometry, intensity = 0.038) => {
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    const fold =
      Math.sin(y * 4.5 + x * 2.0) * intensity * 0.5 +
      Math.sin(y * 8.0 - x * 3.5) * intensity * 0.3 +
      Math.sin(x * 5.0 + y * 1.8) * intensity * 0.2;
    pos.setZ(i, pos.getZ(i) + fold);
  }
  geometry.computeVertexNormals();
  pos.needsUpdate = true;
  return geometry;
};

// ─────────────────────────────────────────────────────────────
// PEARL BUTTON
// ─────────────────────────────────────────────────────────────
const ShirtButton = React.memo(({ position }) => (
  <mesh position={position} castShadow name="button">
    <sphereGeometry args={[0.022, 12, 8]} />
    <meshStandardMaterial color="#edeae5" roughness={0.18} metalness={0.18} />
  </mesh>
));

// ─────────────────────────────────────────────────────────────
// SHOULDER SEAM STRIP
// ─────────────────────────────────────────────────────────────
const SeamStrip = React.memo(({ position, rotation }) => (
  <mesh position={position} rotation={rotation} castShadow name="seam">
    <boxGeometry args={[0.52, 0.022, 0.022]} />
    <meshStandardMaterial color="#eceae6" roughness={0.7} />
  </mesh>
));

// ─────────────────────────────────────────────────────────────
// MAIN PROCEDURAL SHIRT
// ─────────────────────────────────────────────────────────────
const ProceduralShirt = ({ color, materialType, pattern }) => {
  const groupRef = useRef();
  const { mat, pbr } = useShirtMaterial(color, materialType, pattern);

  // Build vertex-deformed geometries once
  const torsoGeo  = useMemo(() => applyClothFolds(new THREE.CylinderGeometry(0.68, 0.60, 2.05, 48, 10), 0.038), []);
  const sleeveGeo = useMemo(() => applyClothFolds(new THREE.CylinderGeometry(0.205, 0.175, 1.18, 32, 6), 0.022), []);

  // Apply material to all shirt meshes when material/pattern/color changes
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.traverse(child => {
      if (child.isMesh && child.name !== 'button' && child.name !== 'seam') {
        child.material = mat;
        child.material.needsUpdate = true;
      }
    });
  }, [mat]);

  // Animate: float + idle spin + smooth color + smooth PBR
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = -0.5 + Math.sin(t * 0.65) * 0.034;
    groupRef.current.rotation.y += delta * 0.08; // ~0.5 rpm idle

    groupRef.current.traverse(child => {
      if (child.isMesh && child.material && child.name !== 'button' && child.name !== 'seam') {
        // Smooth PBR property interpolation
        child.material.roughness = THREE.MathUtils.lerp(child.material.roughness, pbr.roughness, delta * 2.5);
        child.material.metalness = THREE.MathUtils.lerp(child.material.metalness, pbr.metalness, delta * 2.5);
        child.material.envMapIntensity = THREE.MathUtils.lerp(child.material.envMapIntensity, pbr.envMapIntensity, delta * 2.5);
      }
    });
  });

  const buttonYs = [0.60, 0.37, 0.13, -0.11, -0.35, -0.58];

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>

      {/* ── TORSO ── */}
      <mesh castShadow receiveShadow name="torso" geometry={torsoGeo} />

      {/* Front chest volume */}
      <mesh castShadow receiveShadow name="chest" position={[0, 0.5, 0.56]} scale={[0.85, 0.40, 0.21]}>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* ── SHOULDERS ── */}
      <mesh castShadow receiveShadow name="shoulder_L" position={[-0.80, 0.88, 0]} rotation={[0, 0, 0.20]}>
        <sphereGeometry args={[0.30, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
      </mesh>
      <mesh castShadow receiveShadow name="shoulder_R" position={[0.80, 0.88, 0]} rotation={[0, 0, -0.20]}>
        <sphereGeometry args={[0.30, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
      </mesh>

      {/* Shoulder seams */}
      <SeamStrip position={[-0.72, 0.93, 0]} rotation={[0, 0, Math.PI / 6]} />
      <SeamStrip position={[0.72, 0.93, 0]}  rotation={[0, 0, -Math.PI / 6]} />

      {/* ── LEFT SLEEVE + CUFF ── */}
      <mesh castShadow receiveShadow name="sleeve_L" geometry={sleeveGeo} position={[-1.08, 0.42, 0]} rotation={[0, 0, 1.08]} />
      <mesh castShadow receiveShadow name="cuff_L" position={[-1.54, -0.20, 0]} rotation={[0, 0, 1.08]}>
        <cylinderGeometry args={[0.212, 0.212, 0.22, 32]} />
      </mesh>
      {/* Cuff stitching ring */}
      <mesh castShadow receiveShadow name="cuff_ring_L" position={[-1.54, -0.20, 0]} rotation={[0, 0, 1.08]}>
        <cylinderGeometry args={[0.218, 0.218, 0.024, 32]} />
      </mesh>

      {/* ── RIGHT SLEEVE + CUFF ── */}
      <mesh castShadow receiveShadow name="sleeve_R" geometry={sleeveGeo} position={[1.08, 0.42, 0]} rotation={[0, 0, -1.08]} />
      <mesh castShadow receiveShadow name="cuff_R" position={[1.54, -0.20, 0]} rotation={[0, 0, -1.08]}>
        <cylinderGeometry args={[0.212, 0.212, 0.22, 32]} />
      </mesh>
      <mesh castShadow receiveShadow name="cuff_ring_R" position={[1.54, -0.20, 0]} rotation={[0, 0, -1.08]}>
        <cylinderGeometry args={[0.218, 0.218, 0.024, 32]} />
      </mesh>

      {/* ── COLLAR STAND ── */}
      <mesh castShadow receiveShadow name="collar_stand" position={[0, 1.01, 0]}>
        <cylinderGeometry args={[0.32, 0.33, 0.13, 32, 1, true, 0, Math.PI]} />
      </mesh>

      {/* ── COLLAR ARC ── */}
      <mesh castShadow receiveShadow name="collar_arc" position={[0, 1.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.29, 0.065, 16, 48, Math.PI]} />
      </mesh>

      {/* ── SPREAD COLLAR TIPS ── */}
      <mesh castShadow receiveShadow name="collar_L" position={[-0.26, 0.93, 0.17]} rotation={[0.26, 0.52, -0.20]}>
        <boxGeometry args={[0.33, 0.062, 0.20]} />
      </mesh>
      <mesh castShadow receiveShadow name="collar_R" position={[0.26, 0.93, 0.17]} rotation={[0.26, -0.52, 0.20]}>
        <boxGeometry args={[0.33, 0.062, 0.20]} />
      </mesh>

      {/* ── BUTTON PLACKET ── */}
      <mesh castShadow receiveShadow name="placket" position={[0, 0.04, 0.70]} rotation={[0.06, 0, 0]}>
        <boxGeometry args={[0.096, 1.60, 0.013]} />
      </mesh>

      {/* ── BUTTONS ── */}
      {buttonYs.map((y, i) => <ShirtButton key={i} position={[0, y, 0.722]} />)}

      {/* ── SHIRT HEM ── */}
      <mesh castShadow receiveShadow name="hem" position={[0, -1.095, 0]}>
        <cylinderGeometry args={[0.62, 0.59, 0.09, 48, 2]} />
      </mesh>

    </group>
  );
};

// ─────────────────────────────────────────────────────────────
// ERROR BOUNDARY
// ─────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <ProceduralShirt color="#ffffff" materialType="Pure Cotton" pattern="Plain" />;
    return this.props.children;
  }
}

// ─────────────────────────────────────────────────────────────
// ROOT — reads all three state values
// ─────────────────────────────────────────────────────────────
const ShirtModel = () => {
  const { color, material, pattern } = useDesignStore();
  return (
    <ErrorBoundary>
      <ProceduralShirt color={color} materialType={material} pattern={pattern} />
    </ErrorBoundary>
  );
};

export default ShirtModel;
