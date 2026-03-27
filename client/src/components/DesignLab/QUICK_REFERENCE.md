# Quick Reference: Material Application Guide

## At a Glance

### ❌ OLD WAY (Logo/Decal Application)
```javascript
// Applied texture as small circular patch
{decalTexture && (
  <Decal position={[0, 0.2, 0.7]} scale={[0.8, 0.8, 1]}>
    <meshStandardMaterial map={decalTexture} />
  </Decal>
)}
// Result: Small logo on chest
```

### ✅ NEW WAY (Full Surface Coverage)
```javascript
// Apply texture to entire mesh
const shirtMaterial = (
  <meshStandardMaterial 
    color={color}
    roughness={roughness}
    metalness={metalness}
    map={fabricTexture}  // Covers everything
  />
);

<mesh>{shirtMaterial}</mesh>
// Result: Entire shirt has fabric texture
```

---

## Key Changes Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Application Method** | Decal overlay | Base material |
| **Coverage** | Small circle (~30% of chest) | 100% of all surfaces |
| **UV Mapping** | Not used | Proper wrapping |
| **Texture Repeat** | N/A | 4×4 (natural), 3×3 (luxury) |
| **Components Affected** | Chest only | Torso, sleeves, shoulders, collar |
| **Material Instance** | Separate decal material | Shared across all parts |

---

## Material Behavior Examples

### Pure Cotton
```javascript
{
  smoothness: 0.6,
  roughness: 0.4,      // Matte finish
  metalness: 0,        // No shine
  weave: 'Plain Weave'
}
```
**Visual:** Fine grid pattern, soft matte appearance

### Silk Satin
```javascript
{
  smoothness: 0.95,
  roughness: 0.05,     // Very smooth
  metalness: 0.2,      // Slight sheen
  weave: 'Satin Weave'
}
```
**Visual:** Smooth gradient with subtle shine

### Oxford Weave
```javascript
{
  smoothness: 0.65,
  roughness: 0.35,     // Textured feel
  metalness: 0,        // Natural fiber
  weave: 'Oxford (Basketweave)'
}
```
**Visual:** Visible basketweave pattern

---

## Code Pattern for Full Coverage

### Step 1: Generate Texture
```javascript
const fabricTexture = useMemo(() => {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  
  // Draw pattern...
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}, [materialType]);
```

### Step 2: Create Material
```javascript
const currentMaterial = CLOTH_DATABASE[materialType];
const roughness = Math.max(0.1, 1.0 - currentMaterial.smoothness);
const metalness = currentMaterial.category === 'Luxury' ? 0.2 : 0;

const shirtMaterial = (
  <meshStandardMaterial 
    color={color}
    roughness={roughness}
    metalness={metalness}
    map={fabricTexture}
  />
);
```

### Step 3: Apply to All Meshes
```javascript
return (
  <group>
    <mesh>{shirtMaterial}</mesh>      {/* Torso */}
    <mesh>{shirtMaterial}</mesh>      {/* Left Shoulder */}
    <mesh>{shirtMaterial}</mesh>      {/* Right Shoulder */}
    <mesh>{shirtMaterial}</mesh>      {/* Left Sleeve */}
    <mesh>{shirtMaterial}</mesh>      {/* Right Sleeve */}
    <mesh>{shirtMaterial}</mesh>      {/* Collar */}
    <mesh>{shirtMaterial}</mesh>      {/* Chest */}
  </group>
);
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Using Decal for Materials
```javascript
// WRONG: This creates a logo patch
<Decal map={fabricTexture} />
```

### ✅ Correct: Use Base Material
```javascript
// RIGHT: Apply to entire mesh
<meshStandardMaterial map={fabricTexture} />
```

---

### ❌ Mistake 2: Not Setting Wrap Mode
```javascript
// WRONG: Texture stretches
const texture = new THREE.CanvasTexture(canvas);
// Missing wrap settings
```

### ✅ Correct: Enable Tiling
```javascript
// RIGHT: Seamless repetition
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);
```

---

### ❌ Mistake 3: Different Materials Per Part
```javascript
// WRONG: Inconsistent appearance
<torsoMesh><materialA /></torsoMesh>
<sleeveMesh><materialB /></sleeveMesh>
```

### ✅ Correct: Shared Material
```javascript
// RIGHT: Uniform fabric
const sharedMaterial = <meshStandardMaterial map={texture} />;
<torsoMesh>{sharedMaterial}</torsoMesh>
<sleeveMesh>{sharedMaterial}</sleeveMesh>
```

---

## Troubleshooting

### Issue: Texture Still Looks Like Logo
**Check:** Are you still using `<Decal>` component?
**Fix:** Remove Decal, apply texture directly to `meshStandardMaterial.map`

### Issue: Pattern is Stretched
**Check:** Did you set wrap mode?
**Fix:** Add `texture.wrapS = THREE.RepeatWrapping`

### Issue: Pattern Too Large/Small
**Check:** Is repeat value appropriate?
**Fix:** Adjust `texture.repeat.set(4, 4)` to desired scale

### Issue: Different Colors on Parts
**Check:** Using same material instance?
**Fix:** Create one material, share across all meshes

---

## Testing Checklist

When implementing material changes:

- [ ] Select "Pure Cotton" → Should see fine grid pattern everywhere
- [ ] Select "Silk Satin" → Should see smooth, shiny surface
- [ ] Select "Oxford Weave" → Should see basketweave texture
- [ ] Rotate shirt → Pattern should continue on all sides
- [ ] Zoom in → Pattern should be sharp (no stretching)
- [ ] Change color → Fabric texture should remain visible
- [ ] No circular overlays or patches visible

---

## Performance Tips

1. **Cache Textures:** Use `useMemo` to prevent regeneration
   ```javascript
   const fabricTexture = useMemo(() => createFabricTexture(materialType), [materialType]);
   ```

2. **Share Materials:** One material instance for all parts
   ```javascript
   const shirtMaterial = <meshStandardMaterial map={fabricTexture} />;
   // Use same instance everywhere
   ```

3. **Optimize Resolution:** 2048×2048 for desktop, consider 1024×1024 for mobile
   ```javascript
   canvas.width = window.innerWidth < 768 ? 1024 : 2048;
   canvas.height = window.innerWidth < 768 ? 1024 : 2048;
   ```

---

## Visual Comparison

### Before (Decal Method):
```
┌─────────────────┐
│   T-Shirt       │
│                 │
│    ┌─────┐      │
│    │LOGO │ ← Patch │
│    └─────┘      │
│                 │
└─────────────────┘
```

### After (Full Coverage):
```
┌─────────────────┐
│  ╔═══════════╗  │
│  ║ FABRIC    ║  │
│  ║ TEXTURE   ║  │ ← Entire surface
│  ║ EVERYWHERE║  │
│  ╚═══════════╝  │
└─────────────────┘
```

---

## Next Steps

1. Test all 14 materials in your application
2. Verify textures appear correctly on all shirt parts
3. Adjust repeat values if needed for specific fabrics
4. Consider adding normal maps for deeper texture
5. Test on mobile devices for performance
