"use client";

import BlockProps from "@/types/BlockProps";
import { Box, Float, Text } from "@react-three/drei";

export default function BlockStart({ position = [0, 0, 0] } : BlockProps) {
  return (
    <>
      <group
        position={position}
      >
        <Float
          floatIntensity={0.25}
          rotationIntensity={0.25}
        >
          <Text
            scale={0.5}
            position={[0, 1, 0]}
            rotation-x={-0.25}
          >
            Marble Race
            <meshStandardMaterial color="black" />
          </Text>
        </Float>
        <Box
          receiveShadow
          scale={[4, 0.2, 4]}
          position={[0, -0.1, 0]}
        >
          <meshStandardMaterial color="deepskyblue" />
        </Box>
      </group>
    </>
  )
}