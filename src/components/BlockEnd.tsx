import BlockProps from "@/types/BlockProps";
import { Box, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

export default function BlockEnd({ position = [0, 0, 0] } : BlockProps) {
  const hamburgerModel = useGLTF("/models/hamburger.glb");

  hamburgerModel.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
    }
  });

  return (
    <>
      <group
        position={position}
      >

        <RigidBody
          type="fixed"
          colliders="hull"
          restitution={0.2}
          friction={0}
          position={[0, 0.25, 0]}
        >
          <primitive
            object={hamburgerModel.scene}
            scale={0.2}
            position={[0, 0.75, 0]}
          />
        </RigidBody>

         {/* Floor */}
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