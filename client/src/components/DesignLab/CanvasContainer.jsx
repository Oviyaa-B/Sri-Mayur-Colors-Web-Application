import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Center, OrbitControls, Environment, ContactShadows,
  AccumulativeShadows, RandomizedLight
} from '@react-three/drei';
import ShirtModel from './ShirtModel';

const CanvasContainer = () => {
  return (
    <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        shadows="soft"
        camera={{ position: [0, 0.1, 4.6], fov: 37 }}
        gl={{ preserveDrawingBuffer: true, antialias: true, toneMapping: 2 /* ACESFilmic */ }}
      >
        {/* ── 3-POINT STUDIO LIGHTING ─────────────────────── */}
        {/* Key Light (warm, upper-right) */}
        <directionalLight
          position={[4, 9, 7]}
          intensity={1.5}
          castShadow
          shadow-mapSize={2048}
          shadow-camera-far={16}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          color="#fff6ea"
        />
        {/* Fill Light (cool, left) */}
        <directionalLight position={[-5, 4, 4]} intensity={0.5} color="#d8e8ff" />
        {/* Rim / Hair Light (back-top, edge definition) */}
        <directionalLight position={[0, 8, -7]} intensity={0.4} color="#ffffff" />
        {/* Soft ambient */}
        <ambientLight intensity={0.4} color="#f4f4f8" />
        {/* Ground bounce */}
        <pointLight position={[0, -4, 2]} intensity={0.3} color="#ffffff" />

        <Suspense fallback={null}>
          <Center>
            <ShirtModel />
          </Center>

          {/* Studio HDR env for PBR reflections */}
          <Environment preset="studio" />

          {/* Accumulative soft shadows on floor */}
          <AccumulativeShadows
            position={[0, -2.05, 0]}
            frames={60}
            alphaTest={0.85}
            scale={12}
            opacity={0.6}
          >
            <RandomizedLight
              amount={8}
              radius={3}
              intensity={0.55}
              ambient={0.25}
              position={[4, 8, 5]}
            />
          </AccumulativeShadows>

          {/* Soft contact shadow for crisp under-shirt shadow */}
          <ContactShadows
            position={[0, -2.05, 0]}
            opacity={0.28}
            scale={24}
            blur={5}
            far={14}
            resolution={1024}
            color="#10102a"
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={7}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 5}
          autoRotate={true}
          autoRotateSpeed={0.7}
        />
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-gray-500 shadow-sm border border-white/50">
          Drag to Rotate
        </div>
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-gray-500 shadow-sm border border-white/50">
          Scroll to Zoom
        </div>
      </div>
    </div>
  );
};

export default CanvasContainer;
