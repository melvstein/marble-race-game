import BlockProps from "@/types/BlockProps";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei/core/shapes";
import * as THREE from "three";


export default function BlockSpinner({ position = [0, 0, 0] } : BlockProps) {
  const obstacleRef = useRef<RapierRigidBody>(null!);
  const [ speed ] = useState(() => Math.random() + 0.2 * (Math.random() < 0.5 ? -1 : 1)); // Random speed between -0.2 and 0.2

  useFrame((state, delta) => {
    const rotationSpeed = 1; // Radians per second
    const time = state.clock.getElapsedTime() * rotationSpeed;
    const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacleRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <>
      <group
        position={position}
      >

        {/* Rotating obstacle */}
        <RigidBody
          ref={obstacleRef}
          type="kinematicPosition"
          position={[0, 0.3, 0]}
          restitution={0.2}
          friction={0}
        >
          <Box
            castShadow
            receiveShadow
            scale={[3.5, 0.3, 0.3]}
          >
            <meshStandardMaterial color="crimson" />
          </Box>
        </RigidBody>

        {/* Floor */}
        <Box
          receiveShadow
          scale={[4, 0.2, 4]}
          position={[0, -0.1, 0]}
        >
          <meshStandardMaterial color="skyblue" />
        </Box>
      </group>
    </>
  )
}