"use client";

import { useKeyboardControls } from "@react-three/drei";
import useGame from "@/stores/useGame";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const forward = useKeyboardControls(state => state.forward);
  const backward = useKeyboardControls(state => state.backward);
  const leftward = useKeyboardControls(state => state.leftward);
  const rightward = useKeyboardControls(state => state.rightward);
  const jump = useKeyboardControls(state => state.jump);
  const { restart, phase, startTime, endTime } = useGame(state => state);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeTime = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = (Date.now() - state.startTime);
      } else if (state.phase === "ended") {
        elapsedTime = (state.endTime - state.startTime);
      }

      if (timeRef.current) {
        timeRef.current.textContent = (elapsedTime / 1000).toFixed(2);
      }
    });

    return () => {
      unsubscribeTime();
    }
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      { /* Timer */ }
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 uppercase font-bold text-black text-4xl"
        ref={timeRef}
      >
        0.00
      </div>

      { /* Restart Button */ }
      {
        phase === "ended" && (<div
        className="absolute top-1/2 uppercase font-bold text-white text-7xl bg-black/10 w-full flex items-center justify-center py-8 pointer-events-auto cursor-pointer"
        onClick={restart}
      >
        Restart
      </div>)
      }

      { /* Controls */ }
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 uppercase font-bold text-white text-2xl flex flex-col items-center justify-center gap-4">
        <div className={forward ? "arrow-key active-key" : "arrow-key"} />
        <div className="flex gap-4">
          <div className={leftward ? "arrow-key active-key" : "arrow-key"} />
          <div className={backward ? "arrow-key active-key" : "arrow-key"} />
          <div className={rightward ? "arrow-key active-key" : "arrow-key"} />
        </div>
        <div className={jump ? "spacebar-key active-key" : "spacebar-key"} />
      </div>
    </div>
  );
}