"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
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

// Adam Head Model Component
function AdamHeadModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { scene, animations } = useGLTF('/adamHead/adamHead.gltf');
  const { actions, mixer } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);

  // Load textures
  const [textures, setTextures] = useState<{[key: string]: THREE.Texture}>({});

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    // Load textures with proper encoding
    const loadTexture = (path: string, isAlbedo = false) => {
      return loader.loadAsync(path).then(texture => {
        if (isAlbedo) {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.needsUpdate = true;
        }
        return texture;
      });
    };

    const texturePromises = [
      // Head textures (albedo needs sRGB encoding)
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Adam_Head_a.jpg', true),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Adam_Head_n.jpg'),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Adam_Head_o.jpg'),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Adam_Head_sg.png'),
      // Torso textures (albedo needs sRGB encoding)
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Adam_Torso_a.jpg', true),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Adam_Torso_n.jpg'),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Adam_Torso_o.jpg'),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Adam_Torso_sg.png'),
      // Monitor texture (albedo needs sRGB encoding)
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/AdamMonitor.jpg', true),
      // Mask textures (albedo needs sRGB encoding)
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Mask/Adam_mask_intact_a.jpg', true),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Mask/Adam_mask_intact_n.jpg'),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Mask/Adam_mask_intact_o.jpg'),
      loadTexture('/adamHead/Assets/Models/PBR/Adam/Textures/Mask/Adam_mask_intact_sg.png')
    ];

    Promise.all(texturePromises).then((loadedTextures) => {
      console.log('All textures loaded successfully:', loadedTextures);
      setTextures({
        headAlbedo: loadedTextures[0],
        headNormal: loadedTextures[1],
        headOcclusion: loadedTextures[2],
        headSpecular: loadedTextures[3],
        torsoAlbedo: loadedTextures[4],
        torsoNormal: loadedTextures[5],
        torsoOcclusion: loadedTextures[6],
        torsoSpecular: loadedTextures[7],
        monitor: loadedTextures[8],
        maskAlbedo: loadedTextures[9],
        maskNormal: loadedTextures[10],
        maskOcclusion: loadedTextures[11],
        maskSpecular: loadedTextures[12]
      });
    }).catch((error) => {
      console.error('Texture loading failed:', error);
    });
  }, []);

  // Apply textures to model
  useEffect(() => {
    if (scene && Object.keys(textures).length > 0) {
      console.log('Applying textures to model...');
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          console.log('Found mesh:', mesh.name); // Debug mesh names
          
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            const meshName = mesh.name.toLowerCase();
            
            // Apply textures based on mesh name with more flexible matching
            if (meshName.includes('head') || meshName.includes('face') || meshName.includes('skull') || meshName.includes('adam_head')) {
              console.log('Applying head textures to:', mesh.name);
              material.map = textures.headAlbedo;
              material.normalMap = textures.headNormal;
              material.aoMap = textures.headOcclusion;
              material.roughnessMap = textures.headSpecular;
            } else if (meshName.includes('torso') || meshName.includes('body') || meshName.includes('chest') || meshName.includes('adam_torso')) {
              console.log('Applying torso textures to:', mesh.name);
              material.map = textures.torsoAlbedo;
              material.normalMap = textures.torsoNormal;
              material.aoMap = textures.torsoOcclusion;
              material.roughnessMap = textures.torsoSpecular;
            } else if (meshName.includes('mask') || meshName.includes('helmet') || meshName.includes('adam_mask')) {
              console.log('Applying mask textures to:', mesh.name);
              material.map = textures.maskAlbedo;
              material.normalMap = textures.maskNormal;
              material.aoMap = textures.maskOcclusion;
              material.roughnessMap = textures.maskSpecular;
            } else if (meshName.includes('monitor') || meshName.includes('screen') || meshName.includes('display')) {
              console.log('Applying monitor texture to:', mesh.name);
              material.map = textures.monitor;
            } else {
              // Fallback: apply head textures to any unnamed or unmatched meshes
              console.log('Applying fallback head textures to:', mesh.name);
              material.map = textures.headAlbedo;
              material.normalMap = textures.headNormal;
              material.aoMap = textures.headOcclusion;
              material.roughnessMap = textures.headSpecular;
            }
            
            // Ensure proper encoding for albedo maps
            if (material.map) {
              material.map.colorSpace = THREE.SRGBColorSpace;
              material.map.needsUpdate = true;
            }
            
            // Enable PBR properties
            material.metalness = 0.1;
            material.roughness = 0.8;
            material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, textures]);

  // Play animations
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.play();
        }
      });
    }
  }, [actions]);

  // Mouse interaction and animation
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Look towards mouse position - correct direction mapping
      const targetRotationY = Math.atan2(mousePosition.x, 1) * 0.8; // Look left/right towards mouse
      const targetRotationX = Math.atan2(-mousePosition.y, 1) * 0.4; // Look up/down towards mouse
      const targetRotationZ = mousePosition.x * mousePosition.y * 0.1; // Subtle Z rotation
      
      const targetPositionY = mousePosition.y * 0.2; // Slight vertical movement
      const targetPositionX = mousePosition.x * 0.15; // Slight horizontal movement
      
      const targetScale = 1.2 + mousePosition.y * 0.2 + Math.abs(mousePosition.x) * 0.1; // Subtle scaling
      
      // More exact interpolation with different speeds for X and Y
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.2);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.06); // Much slower Y
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.1);
      
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPositionY, 0.06); // Much slower Y
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPositionX, 0.18);
      
      const currentScale = groupRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, Math.max(0.8, targetScale), 0.1);
      groupRef.current.scale.setScalar(newScale);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={[1.2, 1.2, 1.2]} position={[0, -1, 0]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

// Fallback Dancing Robot
function DancingRobot({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Much more dramatic base rotation and mouse interaction
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.4 + mousePosition.x * 1.2;
      groupRef.current.rotation.x = mousePosition.y * 0.6;
      groupRef.current.rotation.z = mousePosition.x * mousePosition.y * 0.4;
      groupRef.current.position.y = Math.sin(time * 3) * 0.15 + mousePosition.y * 0.2;
      groupRef.current.position.x = mousePosition.x * 0.15;
    }

    // Much more dramatic head movements
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 1.5) * 0.4 + mousePosition.x * 1.0;
      headRef.current.rotation.x = Math.sin(time * 1.2) * 0.2 + mousePosition.y * 0.8;
      headRef.current.rotation.z = mousePosition.x * 0.3;
    }

    // More dramatic torso movement
    if (torsoRef.current) {
      torsoRef.current.rotation.z = Math.sin(time * 2) * 0.15 + mousePosition.y * 0.4;
      torsoRef.current.rotation.y = Math.sin(time * 1.5) * 0.1 + mousePosition.x * 0.6;
      torsoRef.current.rotation.x = mousePosition.y * 0.2;
    }

    // Much more dramatic arm movements
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 2.5) * 0.8 + 0.5 + mousePosition.x * 0.8;
      leftArmRef.current.rotation.x = Math.sin(time * 1.8) * 0.4 + mousePosition.y * 0.6;
      leftArmRef.current.rotation.y = mousePosition.x * 0.4;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(time * 2.5) * 0.8 - 0.5 - mousePosition.x * 0.8;
      rightArmRef.current.rotation.x = -Math.sin(time * 1.8) * 0.4 - mousePosition.y * 0.6;
      rightArmRef.current.rotation.y = -mousePosition.x * 0.4;
    }

    // More dramatic leg movements
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * 3) * 0.3 + mousePosition.y * 0.4;
      leftLegRef.current.rotation.y = mousePosition.x * 0.3;
      leftLegRef.current.position.y = Math.abs(Math.sin(time * 3)) * 0.1 + mousePosition.y * 0.1;
    }

    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = -Math.sin(time * 3) * 0.3 - mousePosition.y * 0.4;
      rightLegRef.current.rotation.y = -mousePosition.x * 0.3;
      rightLegRef.current.position.y = Math.abs(Math.sin(time * 3 + Math.PI)) * 0.1 - mousePosition.y * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#4a90e2"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Torso */}
      <mesh ref={torsoRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshStandardMaterial
          color="#50c878"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.6, 0.8, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#ff7f50" metalness={0.5} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.6, 0.8, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#ff7f50" metalness={0.5} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.25, -0.2, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
          <meshStandardMaterial color="#9370db" metalness={0.4} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.25, -0.2, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
          <meshStandardMaterial color="#9370db" metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// Camera Controller
function CameraController({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { camera } = useThree();
  
  useFrame(() => {
    // Camera follows mouse direction
    const targetX = mousePosition.x * 1.5; // Camera moves with mouse X
    const targetY = mousePosition.y * 0.6; // Camera moves with mouse Y
    const targetZ = 5.5 + mousePosition.y * 0.3; // Camera distance changes with mouse Y
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.18);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08); // Slower Y interpolation
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.15);
    
    // Always look at the center (front of model)
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function ThreeDWidget({ span }: { span?: Span }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [useAdamModel, setUseAdamModel] = useState(true);
  const [modelError, setModelError] = useState(false);

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
    setMousePosition({ x: 0, y: 0 });
  }, []);

  const handleModelError = useCallback(() => {
    setModelError(true);
    setUseAdamModel(false);
  }, []);

  // Global mouse listener for look-towards behavior when Adam model is active
  useEffect(() => {
    if (!useAdamModel) return;

    const handleGlobalMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [useAdamModel]);

  return (
    <WidgetCard 
      title="Adam" 
      headerExtra={
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setUseAdamModel(!useAdamModel)}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            title="Toggle between Adam Head and dancing robot"
          >
            {useAdamModel ? 'Adam' : 'Robot'}
          </button>
          <span className="text-xs text-zinc-400">
            {isHovered ? 'Looking at mouse!' : 'Move mouse to look'}
          </span>
          <div className={`w-2 h-2 rounded-full transition-colors ${
            isHovered ? 'bg-pink-400 animate-pulse' : 'bg-zinc-600'
          }`} />
        </div>
      }
      className={spanToClasses(span)}
    >
        <div 
          className="h-full w-full cursor-default"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          {/* Dynamic Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={0.6}
            castShadow
          />
          {/* Mouse-following spotlight - stronger and bigger */}
          <spotLight
            position={[mousePosition.x * 4, 5 + mousePosition.y * 3, 4 + mousePosition.x * 3]}
            target-position={[mousePosition.x * 3, mousePosition.y * 2, 0]}
            angle={0.6}
            penumbra={0.3}
            intensity={2.5}
            color="#f8f8f0"
            castShadow
          />
          {/* Dynamic colored lights - stronger */}
          <pointLight 
            position={[mousePosition.x * 5, 3 + mousePosition.y * 4, -3 + mousePosition.x * 3]} 
            intensity={1.2}
            color="#ff1493"
            distance={12}
          />
          <pointLight 
            position={[-mousePosition.x * 5, 4 + mousePosition.y * 3, 3 - mousePosition.x * 3]} 
            intensity={1.2}
            color="#00ffff"
            distance={12}
          />
          
          {/* Model or Robot */}
          {useAdamModel && !modelError ? (
            <AdamHeadModel mousePosition={mousePosition} />
          ) : (
            <DancingRobot mousePosition={mousePosition} />
          )}
          
          {/* Camera controller */}
          <CameraController mousePosition={mousePosition} />
          
          {/* Orbit controls */}
          <OrbitControls 
            enabled={false}
          />
        </Canvas>
      </div>
    </WidgetCard>
  );
}