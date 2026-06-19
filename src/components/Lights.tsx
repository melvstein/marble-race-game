"use client";

import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

export default function Lights() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  const directionalLightSettings = useControls("Directional Light", {
    showHelper: false,
    position: {
      value: [2, 4, 3],
      step: 0.1,
    }
  }, { collapsed: true });

  useHelper(
    directionalLightSettings.showHelper ? directionalLightRef : null,
    THREE.DirectionalLightHelper, 0.5, "blue"
  );

  useFrame((state) => {
    directionalLightRef.current.position.z = state.camera.position.z + 1 - 4;
    directionalLightRef.current.target.position.z = state.camera.position.z - 4;
    directionalLightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        castShadow
        ref={directionalLightRef}
        position={directionalLightSettings.position}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <ambientLight intensity={0.5} />
    </>
  );
}