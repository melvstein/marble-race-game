import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface GameState {
  blocksCount: number;
  blockSeed: number;
  startTime: number;
  endTime: number;
  phase: "ready" | "playing" | "ended" | "restart";
  start: () => void;
  restart: () => void;
  end: () => void;
}

export default create<GameState>()(subscribeWithSelector((set) => {
  return {
    blocksCount: 10,
    blockSeed: 0,
    startTime: 0,
    endTime: 0,
    phase: "ready",
    start: () => {
      set((state) => {
        if (state.phase === "ready") {
          return { phase: "playing", startTime: Date.now(), endTime: 0 };
        }

        return {};
      })
    },
    restart: () => {
      set((state) => {
        if (state.phase === "playing" || state.phase === "ended") {
          return { blockSeed: Math.random(), phase: "ready", startTime: 0, endTime: 0 };
        }

        return {};
      })
    },
    end: () => {
      set((state) => {
        if (state.phase === "playing") {
          return { phase: "ended", endTime: Date.now() };
        }

        return {};
      })
    }
  };
}));