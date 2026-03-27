# 3D T-Shirt Model Implementation Guide

## Overview
This document describes the implementation of a realistic 3D T-shirt customization tool with interactive fabric material selection.

## Features Implemented

### 1. Realistic 3D T-Shirt Model
**Location:** `client/src/components/DesignLab/ShirtModel.jsx`

The T-shirt is constructed using multiple geometric components:
- **Main Torso**: Tapered cylinder (0.75 to 0.85 radius, 2.0 height) for realistic body shape
- **Shoulders**: Two sphere caps positioned at [-0.6, 0.9, 0] and [0.6, 0.9, 0]
- **Sleeves**: Cylinders angled downward at ±60° (Math.PI / 3)
- **Collar**: Torus geometry creating a realistic neck ring
- **Upper Chest**: Subtle sphere cap for chest definition

All components share the same material instance for consistent fabric appearance.

### 2. Procedural Fabric Texture Generation
**Function:** `createFabricTexture(materialName)`

Generates 2048x2048 canvas textures based on material weave type:

#### Supported Weave Patterns:
1. **Plain Weave** (Cotton, Organic Cotton, Bamboo, etc.)
   - Grid pattern with subtle fiber noise
   - Natural color tones based on material category
   
2. **Oxford Basketweave**
   - 16px basket pattern with interlocking threads
   - Textured appearance for formal shirts

3. **Satin Weave** (Silk Satin)
   - Smooth gradient finish
   - Horizontal sheen lines for luxury appearance
   - High smoothness value (0.95)

4. **Twill Diagonal** 
   - Diagonal rib pattern
   - Durable workwear appearance

5. **Pique Honeycomb**
   - Hexagonal cell pattern
   - Polo shirt texture

#### Fiber Noise System:
```javascript
addFiberNoise(ctx, smoothness)
```
- Applies per-pixel noise based on material smoothness
- Rougher materials (smoothness: 0.2-0.5) get more noise
- Smoother materials (smoothness: 0.8-0.95) get minimal noise

### 3. Material Properties from Database
**Source:** `client/src/config/designLabOptions.js`

Each material has unique properties:
- **Smoothness**: Controls surface roughness (0.0-1.0)
- **Category**: Determines metalness (Natural=0, Luxury/Synthetic=0.2)
- **Weave Type**: Selects appropriate texture generator
- **GSM**: Fabric weight (informational)
- **Fiber**: Material composition (informational)

#### Example Materials:
```javascript
'Pure Cotton': {
  smoothness: 0.6,
  roughness: 0.4, // calculated as 1.0 - smoothness
  metalness: 0,
  weave: 'Plain Weave'
}

'Silk Satin': {
  smoothness: 0.95,
  roughness: 0.05,
  metalness: 0.2,
  weave: 'Satin Weave'
}
```

### 4. Real-time Material Switching
When user selects a material from the left panel:
1. Zustand store updates `material` state
2. `FallbackShirt` component receives new `materialType` prop
3. `useMemo` regenerates fabric texture for new material
4. Texture applied to all mesh components
5. Roughness/metalness updated in real-time
6. Smooth color transitions via `easing.dampC`

### 5. Studio Lighting Setup
**Location:** `client/src/components/DesignLab/CanvasContainer.jsx`

Four-point lighting system:
- **Key Light**: Directional light at [5, 8, 8], intensity 1.2
  - Casts shadows (2048 shadow map)
  - Main illumination source
  
- **Fill Light**: Directional at [-5, 5, 5], intensity 0.6
  - Softens shadows on opposite side
  
- **Rim Light**: Directional at [0, 5, -5], intensity 0.4
  - Creates edge definition and separation
  
- **Ambient Light**: Base illumination, intensity 0.5
  - Warm white color (#f0f0f0)
  
- **Fill Light (Bottom)**: Point light at [0, -3, 3]
  - Subtle under-lighting

### 6. Environment Mapping
```jsx
<Environment preset="studio" />
```
- Provides realistic reflections on fabric surfaces
- Studio HDRI for professional lighting
- Enhances material appearance (especially silk/satin)

### 7. Contact Shadows
```jsx
<ContactShadows 
  position={[0, -1.8, 0]} 
  opacity={0.4} 
  scale={30} 
  blur={3} 
  far={12} 
  resolution={1024} 
/>
```
- Soft ground shadows for depth perception
- High-resolution shadow map (1024)
- Smooth blur for natural appearance

### 8. Interactive Controls
```jsx
<OrbitControls 
  enablePan={false}
  enableZoom={true}
  minDistance={1.5}
  maxDistance={5}
  maxPolarAngle={Math.PI / 1.7}
  minPolarAngle={Math.PI / 4}
/>
```
- **Left Click + Drag**: Rotate around shirt
- **Scroll**: Zoom in/out (1.5 to 5 units)
- **Vertical Angle限制**: Prevents viewing from extreme angles

### 9. GLTF Model Support
The system supports loading external GLTF/GLB models:
- Checks for `/models/tshirt.glb` existence
- Falls back to procedural model if not found
- Applies same fabric textures to loaded model
- Automatic UV mapping from model file

## File Structure

```
client/src/
├── components/DesignLab/
│   ├── ShirtModel.jsx          # Main 3D model component
│   ├── CanvasContainer.jsx     # Three.js canvas & lighting
│   ├── MaterialSelector.jsx    # Left panel UI
│   └── DesignLab.jsx           # Page container
├── store/
│   └── designStore.js          # State management
└── config/
    └── designLabOptions.js     # Material database
```

## Usage Flow

1. User opens Design Lab page
2. Default white T-shirt displays (Pure Cotton material)
3. User clicks material from left panel (e.g., "Silk Satin")
4. Store updates material state
5. ShirtModel regenerates texture with satin weave pattern
6. Roughness decreases to 0.05 (smooth)
7. Metalness increases to 0.2 (slight shine)
8. Texture wraps around shirt with UV mapping
9. Real-time preview updates instantly

## Performance Optimizations

- **Texture Caching**: `useMemo` prevents regenerating textures unnecessarily
- **Efficient Updates**: Only material properties change, geometry stays static
- **Shadow Optimization**: 2048 shadow map balances quality/performance
- **Geometry Segments**: 32 radial segments for smooth curves without excess vertices
- **Anisotropic Filtering**: 16x anisotropy for sharp textures at oblique angles

## Customization Guide

### Adding New Materials

1. Add entry to `CLOTH_DATABASE` in `designLabOptions.js`:
```javascript
'New Fabric': {
  category: 'Natural',
  fiber: '100% Custom',
  gsm: 200,
  weave: 'Custom Weave',
  smoothness: 0.7,
  // ... other properties
}
```

2. Create weave pattern function in `ShirtModel.jsx`:
```javascript
const createCustomWeave = (ctx, material) => {
  // Custom pattern logic
}
```

3. Add case to switch statement in `createFabricTexture`

### Adjusting Material Appearance

Modify properties in database:
- **Lower smoothness** → Rougher appearance (0.1-0.4)
- **Higher smoothness** → Smoother/shinier (0.7-0.95)
- **Luxury/Synthetic category** → Adds slight metalness (0.2)
- **Natural/Organic** → No metalness (0.0)

### Changing T-Shirt Color

Use the color picker on the right side - applies tint to fabric texture while preserving weave pattern.

## Technical Specifications

### Geometry
- **Torso**: CylinderGeometry(0.75, 0.85, 2.0, 32, 8)
- **Shoulders**: SphereGeometry(0.35, 32, 16, 0, 2π, 0, π/2)
- **Sleeves**: CylinderGeometry(0.28, 0.25, 0.9, 32)
- **Collar**: TorusGeometry(0.35, 0.08, 16, 32)
- **Chest**: SphereGeometry(1, 32, 16, 0, 2π, 0, π/2)

### Textures
- **Resolution**: 2048x2048 pixels
- **Format**: CanvasTexture
- **Wrapping**: RepeatWrapping (S&T)
- **Repeat**: 4x across surface
- **Anisotropy**: 16x

### Materials
- **Type**: MeshStandardMaterial
- **Color**: White base (#ffffff) with tinting
- **Roughness**: 0.05 - 0.9 (based on material)
- **Metalness**: 0.0 - 0.2 (based on category)

### Lighting
- **Total Lights**: 5 (4 directional + 1 point)
- **Shadow Map**: 2048x2048
- **Environment**: Studio HDRI
- **Contact Shadows**: 1024x1024

## Browser Compatibility

Tested on:
- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires WebGL 2.0 support.

## Future Enhancements

Potential improvements:
1. Normal maps for deeper fabric texture
2. Displacement maps for weave depth
3. AO maps for ambient occlusion
4. Decal graphics/logos overlay
5. Animated fabric movement (wind simulation)
6. Wrinkle/bump maps for worn-in look
7. Multiple color zones (collar, sleeves different colors)

## Troubleshooting

### Texture Not Appearing
- Check browser console for errors
- Verify material name matches database
- Clear cache and reload

### Performance Issues
- Reduce texture resolution to 1024x1024
- Lower shadow map size
- Reduce geometry segments

### Lighting Too Dark
- Increase ambient light intensity
- Add more directional lights
- Adjust Environment preset

## Credits

Built with:
- React Three Fiber (3D renderer)
- Drei (3D helpers)
- Three.js (3D engine)
- Maath (Interpolation utilities)
- Zustand (State management)
