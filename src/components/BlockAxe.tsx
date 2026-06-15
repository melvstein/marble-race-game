import BlockProps from "@/types/BlockProps";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei/core/shapes";


export default function BlockAxe({ position = [0, 0, 0] } : BlockProps) {
  const obstacleRef = useRef<RapierRigidBody>(null!);
  const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2); // Random time offset between 0 and 2π

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacleRef.current.setNextKinematicTranslation({x: position[0] + x, y: position[1] + 0.75, z: position[2]});
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
            scale={[1.5, 1.5, 0.3]}
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