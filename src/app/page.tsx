"use client";

import Experience from "@/components/Experience";
import Interface from "@/components/Interface";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
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
        <Interface />
      </KeyboardControls>
    </>
  );
}
