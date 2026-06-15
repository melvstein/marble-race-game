"use client";

import {
  Environment,
  OrbitControls,
} from "@react-three/drei";
import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Environment preset="sunset" />
      
      <Physics
        debug={true}
      >
        <Lights />
        <Level />
      </Physics>
    </>
  );
}