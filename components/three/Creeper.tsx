"use client";

import React, { Suspense, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { ThreeElements } from "@react-three/fiber";

// Shared Creeper model loader
export const CreeperModel = forwardRef<Group, ThreeElements["group"]>(function CreeperModel(props, ref) {
  const gltf = useGLTF("/minecraft_-_creeper/scene.gltf");
  return (
    <group ref={ref} {...props}>
      {/* Scene may be large; wrap in Suspense at call sites if needed */}
      <primitive object={gltf.scene} />
    </group>
  );
});

// Optional convenience wrapper with simple lights
export function CreeperScene({ scale = 0.12 }: { scale?: number }) {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.9} />
      <directionalLight intensity={1.0} position={[2, 3, 2]} />
      <hemisphereLight intensity={0.5} args={[0xffffff, 0x444444]} />
      <CreeperModel scale={scale} position={[0, -0.6, 0]} />
    </Suspense>
  );
}

// Preload the model to reduce first-use hiccup
useGLTF.preload("/minecraft_-_creeper/scene.gltf");