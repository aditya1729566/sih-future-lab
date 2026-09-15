"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, PerspectiveCamera } from "@react-three/drei";
import { MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";

interface SceneProps {
  progress: MutableRefObject<number>;
  activeTheme: number;
  reducedMotion: boolean;
}

function CameraRig({ progress, reducedMotion }: Pick<SceneProps, "progress" | "reducedMotion">) {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const { pointer } = useThree();
  useFrame((_, delta) => {
    if (!camera.current) return;
    const p = reducedMotion ? 0 : progress.current;
    const px = reducedMotion ? 0 : pointer.x * 0.28;
    const py = reducedMotion ? 0 : pointer.y * 0.18;
    camera.current.position.x = THREE.MathUtils.damp(camera.current.position.x, px + Math.sin(p * Math.PI * 2) * 0.5, 3, delta);
    camera.current.position.y = THREE.MathUtils.damp(camera.current.position.y, py + Math.sin(p * Math.PI) * 0.25, 3, delta);
    camera.current.position.z = THREE.MathUtils.damp(camera.current.position.z, 7.2 - Math.sin(p * Math.PI) * 1.2, 3, delta);
    camera.current.lookAt(0, 0, 0);
  });
  return <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 7.2]} fov={38} />;
}

function Core({ progress, activeTheme, reducedMotion }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);
  const moduleCount = 24;
  const modules = useMemo(
    () => Array.from({ length: moduleCount }, (_, index) => ({
      angle: (index / moduleCount) * Math.PI * 2,
      z: Math.sin(index * 2.43) * 0.32,
      scale: index % 3 === 0 ? 1.2 : 0.78,
    })),
    [],
  );
  const network = useMemo(
    () => modules.map((module) => new THREE.Vector3(Math.cos(module.angle) * 2.05, Math.sin(module.angle) * 2.05, module.z)),
    [modules],
  );

  useFrame((state, delta) => {
    if (!group.current || !halo.current) return;
    const p = reducedMotion ? 0 : progress.current;
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -p * 1.7, 2.6, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, state.pointer.y * 0.11 + p * 0.18, 3, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.14, 3, delta);
    const targetScale = p > 0.76 ? 0.78 : 1 + Math.sin(p * Math.PI) * 0.22;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 3, delta));
    halo.current.rotation.z -= reducedMotion ? 0 : delta * 0.06;
  });

  return (
    <group ref={group}>
      <group ref={halo}>
        <mesh>
          <torusGeometry args={[2.35, 0.018, 8, 160]} />
          <meshBasicMaterial color="#54d8ff" transparent opacity={0.36} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.54, 0.035, 10, 128]} />
          <meshStandardMaterial color="#e8e6dd" metalness={0.82} roughness={0.28} />
        </mesh>
      </group>

      <Float speed={reducedMotion ? 0 : 1.1} rotationIntensity={0.1} floatIntensity={0.12}>
        <mesh>
          <icosahedronGeometry args={[0.72, 2]} />
          <meshPhysicalMaterial color="#111719" metalness={0.86} roughness={0.18} clearcoat={1} emissive="#10272d" emissiveIntensity={0.55} />
        </mesh>
        <mesh scale={0.73}>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshBasicMaterial color="#ff7417" wireframe transparent opacity={0.58} />
        </mesh>
      </Float>

      {modules.map((module, index) => {
        const selected = index % 8 === activeTheme;
        return (
          <group key={index} position={network[index]} rotation={[0, 0, module.angle]}>
            <mesh scale={selected ? module.scale * 1.7 : module.scale}>
              <boxGeometry args={[0.12, 0.32, 0.12]} />
              <meshStandardMaterial
                color={selected ? "#ff7417" : index % 4 === 0 ? "#54d8ff" : "#7e8b8e"}
                emissive={selected ? "#ff3d00" : "#0a1517"}
                emissiveIntensity={selected ? 1.4 : 0.2}
                metalness={0.72}
                roughness={0.32}
              />
            </mesh>
          </group>
        );
      })}

      {network.filter((_, index) => index % 2 === 0).map((point, index) => (
        <Line key={index} points={[new THREE.Vector3(0, 0, 0), point]} color={index % 3 === 0 ? "#ff7417" : "#31565e"} lineWidth={0.55} transparent opacity={0.58} />
      ))}
    </group>
  );
}

export default function HeroScene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute("role", "img");
        gl.domElement.setAttribute("aria-label", "Interactive innovation core made from radial engineering modules.");
      }}
    >
      <ambientLight intensity={0.52} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#d9f7ff" />
      <pointLight position={[-3, -2, 4]} intensity={20} color="#ff7417" distance={8} />
      <Core {...props} />
      <CameraRig progress={props.progress} reducedMotion={props.reducedMotion} />
    </Canvas>
  );
}
