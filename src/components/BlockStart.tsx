import BlockProps from "@/types/BlockProps";
import { Box, Sphere } from "@react-three/drei";

export default function BlockStart({ position = [0, 0, 0] } : BlockProps) {
  return (
    <>
      <group
        position={position}
      >
        <Sphere>
          <meshStandardMaterial color="royalblue" />
        </Sphere>
        
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