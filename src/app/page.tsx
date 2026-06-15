"use client";

import Experience from "@/components/Experience";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <>
      <Canvas
        shadows
        camera={{
        position: [0, 2, 7],
        fov: 100,
        near: 0.1,
        far: 200,
        zoom: 1,
        }}
      >
        <color attach="background" args={["#ffffff"]} />
        <Experience />
      </Canvas>
    </>
  );
}
