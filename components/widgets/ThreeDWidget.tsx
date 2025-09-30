"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import WidgetCard from "@/components/widgets/WidgetCard";

type Span = { cols?: 1 | 2 | 3; rows?: 1 | 2 | 3 | 4 };
function spanToClasses(span?: Span): string {
  if (!span) return "";
  const cls: string[] = [];
  if (span.cols === 1) cls.push("col-span-1");
  if (span.cols === 2) cls.push("col-span-2");
  if (span.cols === 3) cls.push("col-span-3");
  if (span.rows === 1) cls.push("row-span-1");
  if (span.rows === 2) cls.push("row-span-2");
  if (span.rows === 3) cls.push("row-span-3");
  if (span.rows === 4) cls.push("row-span-4");
  return cls.join(" ");
}

// Minecraft Character Model Component
function MinecraftCharacterModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { scene } = useGLTF('/minecraft_-_steve/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);

  // Look towards mouse position
  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = Math.atan2(mousePosition.x, mousePosition.y);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={[2, 2, 2]} position={[0, -1, 0]} />
    </group>
  );
}

// Scene component with lighting
function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4A90E2" />
      <MinecraftCharacterModel mousePosition={mousePosition} />
    </>
  );
}

export default function ThreeDWidget({ span }: { span?: Span }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [modelError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // Always track mouse position for look-towards behavior
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -((event.clientY / window.innerHeight) * 2 - 1);
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (modelError) {
  return (
      <WidgetCard
        title="3D Model"
        className={`${spanToClasses(span)} bg-red-500/20 border-red-500/50`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-red-400 text-4xl mb-2">⚠️</div>
            <div className="text-red-300 text-sm">Model failed to load</div>
          </div>
        </div>
      </WidgetCard>
    );
  }

  return (
    <WidgetCard
      title="3D Model"
      className={`${spanToClasses(span)} ${isHovered ? 'scale-105' : ''} transition-transform duration-300`}
    >
      <div 
        className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
              <div className="text-blue-300 text-sm">Loading 3D Model...</div>
            </div>
          </div>
        ) : (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: 'transparent' }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <Scene mousePosition={mousePosition} />
          <OrbitControls 
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
          />
        </Canvas>
        )}
        
        {/* Interactive overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 text-xs text-gray-400">
            Move mouse to look around
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}