import LevelProps from "@/types/LevelProps";
import BlockAxe from "./BlockAxe";
import BlockEnd from "./BlockEnd";
import BlockLimbo from "./BlockLimbo";
import BlockSpinner from "./BlockSpinner";
import BlockStart from "./BlockStart";
import { useState } from "react";
import Bounds from "./Bounds";

export default function Level({ count = 8, types = [BlockSpinner, BlockLimbo, BlockAxe] } : LevelProps) {
  const [ blocks ] = useState(() => {
    const blocksArray = [];
    for (let i = 0; i < count; i++) {
      const BlockType = types[Math.floor(Math.random() * types.length)];
      blocksArray.push(BlockType);
    }
    return blocksArray;
  });
  
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, - (index + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, - (count + 1) * 4]} />

      <Bounds length={count + 2} />
    </>
  );
}

