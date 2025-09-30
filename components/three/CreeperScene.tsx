"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Centered creeper model that subtly follows the mouse
function Creeper({ mouse, modelPath }: { mouse: { x: number; y: number }; modelPath: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Normalize model scale and orientation if needed
  const model = useMemo(() => {
    const g = new THREE.Group();
    const clone = scene.clone(true);
    // Compute bounds pre-scale
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    // Center to origin first (pre-scale)
    clone.position.sub(center);
    // Recompute size after centering
    box.setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const target = 2.6; // target size in scene units for nicer presence
    const scale = target / maxDim;
    clone.scale.setScalar(scale);
    // Face camera by default
    clone.rotation.y = Math.PI;
    g.add(clone);
    return g;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Mouse influence
    const targetRotY = mouse.x * 0.6; // yaw left/right
    const targetRotX = -mouse.y * 0.35; // pitch up/down
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.08);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.06);

    // Subtle bob
    const t = clock.getElapsedTime();
    const targetY = Math.sin(t * 1.8) * 0.1;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.08);
  });

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

export default function CreeperScene({ mouse, modelPath = "/minecraft_-_creeper/scene.gltf" }: { mouse: { x: number; y: number }; modelPath?: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 3.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* lights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -4]} intensity={0.5} />

      <Creeper mouse={mouse} modelPath={modelPath} />

      {/* soft ground shadow for grounding */}
      <ContactShadows position={[0, -1.1, 0]} opacity={0.4} width={10} height={10} blur={2.5} far={4} />
    </Canvas>
  );
}

useGLTF.preload("/minecraft_-_creeper/scene.gltf");
useGLTF.preload("/mech_drone/scene.gltf");
