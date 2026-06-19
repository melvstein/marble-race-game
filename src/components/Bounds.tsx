"use client";

import BoundProps from "@/types/BoundProps";
import { Box } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Bounds({ length = 5}: BoundProps) {
  return (
    <>
      <RigidBody
        type="fixed"
        restitution={0.2}
        friction={0}
      >
        <Box
          castShadow
          receiveShadow
          scale={[0.3, 1.5, length * 4]}
          position={[-2.15, 0.75, - (length * 2) + 2]}
        >
          <meshStandardMaterial color="slategray" />
        </Box>

        <Box
          castShadow
          receiveShadow
          scale={[0.3, 1.5, length * 4]}
          position={[2.15, 0.75, - (length * 2) + 2]}
        >
          <meshStandardMaterial color="slategray" />
        </Box>


        <Box
          castShadow
          receiveShadow
          scale={[4, 1.5, 0.3]}
          position={[0, 0.75, - (length * 4) + 2]}
        >
          <meshStandardMaterial color="slategray" />
        </Box>

        <CuboidCollider
          args={[2, 0.1, length * 2]}
          position={[0, -0.1, - (length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  )
}