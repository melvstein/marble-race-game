"use client";

import LevelProps from "@/types/LevelProps";
import BlockAxe from "./BlockAxe";
import BlockEnd from "./BlockEnd";
import BlockLimbo from "./BlockLimbo";
import BlockSpinner from "./BlockSpinner";
import BlockStart from "./BlockStart";
import { useMemo } from "react";
import Bounds from "./Bounds";

export default function Level({ count = 8, types = [BlockSpinner, BlockLimbo, BlockAxe], seed = 0 } : LevelProps) {
  const blocks = useMemo(() => {
    const blocksArray = [];
    
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const BlockType = types[Math.floor(random(seed + i) * types.length)];
      blocksArray.push(BlockType);
    }
    return blocksArray;
  }, [count, types, seed]);
  
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

