"use client";

import {
  Environment,
  OrbitControls,
} from "@react-three/drei";
import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import useGame from "@/stores/useGame";

export default function Experience() {
  const { blocksCount, blockSeed } = useGame();

  return (
    <>
      <color args={["skyblue"]} attach="background" />
      {/* <OrbitControls makeDefault /> */}
      <Environment preset="sunset" />
      
      <Physics
        debug={false}
      >
        <Lights />
        <Level count={blocksCount} seed={blockSeed} />
        <Player />
      </Physics>
    </>
  );
}