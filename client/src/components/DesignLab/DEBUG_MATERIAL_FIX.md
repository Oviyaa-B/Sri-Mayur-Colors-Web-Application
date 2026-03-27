# Complete Material Fix - Debugging Guide

## Problem Solved ✅

**Issue:** Shirt stays plain white even after selecting materials, or materials appear as small logos.

**Root Cause:** Using JSX material syntax (`<meshStandardMaterial />`) instead of real THREE.js material instances.

---

## Solution Implemented

### 1. Real THREE.js Material Instance

**❌ WRONG (JSX approach):**
```javascript
const shirtMaterial = (
  <meshStandardMaterial 
    color={color}
    roughness={roughness}
    map={fabricTexture}
  />
);

// Apply in JSX
<mesh>{shirtMaterial}</mesh>
```

**✅ CORRECT (Real Instance):**
```javascript
const shirtMaterial = useMemo(() => {
  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: roughness,
    metalness: metalness,
    map: fabricTexture,
  });
  
  // Configure texture wrapping
  if (material.map) {
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.needsUpdate = true;
  }
  
  return material;
}, [color, roughness, metalness, fabricTexture]);
```

### 2. Apply Material to Meshes Programmatically

**❌ WRONG:**
```javascript
<mesh>{shirtMaterial}</mesh>
```

**✅ CORRECT:**
```javascript
useEffect(() => {
  if (groupRef.current) {
    groupRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material = shirtMaterial;
      }
    });
  }
}, [shirtMaterial]);

// In JSX - just define geometry
<mesh>
  <cylinderGeometry args={[0.75, 0.85, 2.0, 32, 8]} />
</mesh>
```

---

## Step-by-Step Implementation

### Step 1: Create Fabric Texture

```javascript
const fabricTexture = useMemo(() => {
  console.log('🎨 Creating fabric texture for:', materialType);
  const texture = createFabricTexture(materialType);
  console.log('✅ Texture created with repeat:', texture.repeat);
  return texture;
}, [materialType]);
```

**Key Points:**
- Depends on `materialType` from store
- Logs creation for debugging
- Returns CanvasTexture instance

---

### Step 2: Calculate Material Properties

```javascript
const currentMaterial = CLOTH_DATABASE[materialType] || CLOTH_DATABASE['Pure Cotton'];
const roughness = Math.max(0.1, 1.0 - (currentMaterial.smoothness || 0.5));
const metalness = (currentMaterial.category === 'Synthetic' || currentMaterial.category === 'Luxury') ? 0.2 : 0;
```

**Material Properties:**
- **Cotton:** roughness=0.4, metalness=0.0 (matte)
- **Silk:** roughness=0.05, metalness=0.2 (shiny)
- **Oxford:** roughness=0.35, metalness=0.0 (textured)

---

### Step 3: Create THREE.Material Instance

```javascript
const shirtMaterial = useMemo(() => {
  console.log('🔧 Creating material instance with:', { 
    color, roughness, metalness, hasTexture: !!fabricTexture 
  });
  
  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: roughness,
    metalness: metalness,
    map: fabricTexture,
  });
  
  // CRITICAL: Configure texture wrapping
  if (material.map) {
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.needsUpdate = true;
    console.log('✅ Material map configured with repeat:', material.map.repeat);
  }
  
  return material;
}, [color, roughness, metalness, fabricTexture]);
```

**Dependencies:**
- `color` - changes when user picks color
- `roughness` - changes when material changes
- `metalness` - changes when material changes
- `fabricTexture` - regenerates when material changes

---

### Step 4: Apply Material to All Meshes

```javascript
useEffect(() => {
  if (groupRef.current) {
    groupRef.current.traverse((child) => {
      if (child.isMesh) {
        console.log('📦 Applying material to mesh:', child.name || 'unnamed');
        child.material = shirtMaterial;
      }
    });
  }
}, [shirtMaterial]);
```

**What This Does:**
- Runs whenever `shirtMaterial` changes
- Traverses all child meshes
- Replaces material entirely
- Works for both procedural and GLTF models

---

### Step 5: Define Clean Geometry (No Materials in JSX)

```javascript
return (
  <group ref={groupRef} position={[0, -0.6, 0]}>
    {/* Main Torso */}
    <mesh castShadow receiveShadow position={[0, 0, 0]}>
      <cylinderGeometry args={[0.75, 0.85, 2.0, 32, 8]} />
    </mesh>

    {/* Left Shoulder */}
    <mesh castShadow receiveShadow position={[-0.6, 0.9, 0]} rotation={[0, 0, 0.3]}>
      <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
    </mesh>
    
    {/* ... other parts ... */}
  </group>
);
```

**Important:**
- No `{shirtMaterial}` in JSX
- Just pure geometry definitions
- Material applied programmatically via useEffect

---

## Console Output Example

When you select "Silk Satin", you should see:

```
🎨 Creating fabric texture for: Silk Satin
✅ Texture created with repeat: Vec3(4, 4, 4)
🔧 Creating material instance with: {
  color: "#ffffff",
  roughness: 0.05,
  metalness: 0.2,
  hasTexture: true
}
✅ Material map configured with repeat: Vec3(4, 4, 4)
📦 Applying material to mesh: unnamed
📦 Applying material to mesh: unnamed
📦 Applying material to mesh: unnamed
... (for all 7 mesh parts)
```

---

## Common Issues & Fixes

### Issue 1: Still Plain White

**Check:**
1. Is texture being created? → Look for "🎨 Creating fabric texture" log
2. Does texture have repeat set? → Check "✅ Texture created with repeat" log
3. Is material using texture? → Verify `map: fabricTexture` in constructor

**Fix:**
```javascript
// Ensure texture is passed to material
const material = new THREE.MeshStandardMaterial({
  map: fabricTexture,  // ← Must be here
  // ...
});
```

---

### Issue 2: Texture Stretched/Distorted

**Check:**
1. Are wrap settings applied? → Check `wrapS` and `wrapT`
2. Is repeat value appropriate? → Should be 3-4 for most fabrics

**Fix:**
```javascript
if (material.map) {
  material.map.wrapS = THREE.RepeatWrapping;
  material.map.wrapT = THREE.RepeatWrapping;
  material.map.repeat.set(4, 4);  // ← Add this line
  material.map.needsUpdate = true;
}
```

---

### Issue 3: Only Some Parts Have Texture

**Check:**
1. Are all meshes being traversed? → Check traverse logs
2. Is material applied to all children? → Verify loop completes

**Fix:**
```javascript
groupRef.current.traverse((child) => {
  if (child.isMesh) {
    child.material = shirtMaterial;  // ← Replace entirely
  }
});
```

---

### Issue 4: Performance Lag When Changing Materials

**Check:**
1. Is texture regenerating unnecessarily? → Check useMemo dependencies
2. Are old materials being disposed? → Add cleanup

**Fix:**
```javascript
useEffect(() => {
  return () => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.material !== shirtMaterial) {
            child.material.dispose();  // ← Clean up old materials
          }
        }
      });
    }
  };
}, [shirtMaterial]);
```

---

### Issue 5: Texture Not Tiling/Repeating

**Check:**
1. Is canvas pattern seamless? → Check createFabricTexture function
2. Are UV coordinates correct? → Verify geometry has proper UVs

**Fix for Procedural Geometry:**
```javascript
// Cylinder already has good UVs by default
<cylinderGeometry args={[0.75, 0.85, 2.0, 32, 8]} />

// For custom geometry, may need to adjust UV mapping
```

**Fix for GLTF Models:**
```javascript
// Model should come with UVs already mapped
// If not, may need to unwrap in Blender
```

---

## Testing Checklist

Open browser console and test:

- [ ] Select "Pure Cotton" → See logs showing texture creation
- [ ] Select "Silk Satin" → See different roughness/metalness values
- [ ] Rotate shirt → Texture should tile seamlessly
- [ ] Zoom in → Pattern should be sharp, not stretched
- [ ] Change color → Fabric texture remains visible
- [ ] Click multiple materials rapidly → Each updates correctly

---

## File Structure Reference

```
ShirtModel.jsx
├── createFabricTexture(materialName)
│   └── Generates 2048x2048 CanvasTexture
├── FallbackShirt (procedural model)
│   ├── Creates fabricTexture
│   ├── Creates shirtMaterial (THREE.MeshStandardMaterial)
│   └── Applies via useEffect to all meshes
└── ActiveModel (GLTF model)
    ├── Creates fabricTexture
    ├── Creates shirtMaterial
    └── Applies via useEffect to scene meshes
```

---

## Quick Reference Code

### Minimal Working Example

```javascript
import * as THREE from 'three';
import { useMemo, useEffect, useRef } from 'react';

const MyComponent = ({ materialType }) => {
  const groupRef = useRef();
  
  // 1. Create texture
  const fabricTexture = useMemo(() => {
    return createFabricTexture(materialType);
  }, [materialType]);
  
  // 2. Create material
  const shirtMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.5,
      metalness: 0,
      map: fabricTexture,
    });
  }, [fabricTexture]);
  
  // 3. Apply to meshes
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = shirtMaterial;
        }
      });
    }
  }, [shirtMaterial]);
  
  // 4. Render geometry only
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </group>
  );
};
```

---

## Next Steps After Fixing

1. **Test all 14 materials** - Verify each creates visible texture
2. **Check performance** - Ensure no lag when switching
3. **Verify lighting** - Texture shouldn't be washed out
4. **Test on mobile** - May need lower resolution textures
5. **Add normal maps** - For deeper fabric detail (optional)

---

## Success Criteria

✅ Console shows texture creation logs  
✅ Material instance created with map property  
✅ All meshes receive the material  
✅ Visible fabric pattern on entire shirt  
✅ Patterns tile seamlessly  
✅ No logos or circular overlays  
✅ Smooth transitions between materials  

If all criteria met → Implementation is correct! 🎉
