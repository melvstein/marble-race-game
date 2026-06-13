"use client";

import { Box, ContactShadows, Environment, OrbitControls, Plane, Sphere } from "@react-three/drei";
import { PerfHeadless } from "r3f-perf";

export default function Experience() {
  return (
    <>
      <PerfHeadless />
      <OrbitControls />
      <Environment preset="city" />
      <ContactShadows position={[0, -0.99, 0]} opacity={0.75} scale={10} blur={1} />

      <Box position={[2, 1, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>

      <Sphere position={[-2, 1, 0]}>
        <meshStandardMaterial color="mediumpurple" />
      </Sphere>

      <Plane
        receiveShadow
        args={[10, 10]}
        rotation-x={-Math.PI * 0.5}
        position={[0, -1, 0]} 
      >
        <meshStandardMaterial color="greenyellow" />
      </Plane>
    </>
  );
}