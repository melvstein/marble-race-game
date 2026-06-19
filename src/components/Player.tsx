"use client";

import useGame from "@/stores/useGame";
import { Icosahedron, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef } from "react";

export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const body = useRef<RapierRigidBody | null>(null);
  const { rapier, world } = useRapier();
  const { blocksCount, start, restart, end } = useGame((state) => state);

  const jumpAction = () => {
    const origin = body.current?.translation();
    if (!origin) return;
    origin.y -= 0.31; // Move the origin down to the bottom of the ball
    const direction = { x: 0, y: -1, z: 0 }; // Downward direction
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true); // Cast the ray with a max distance of 10 units
    
    if ((hit?.timeOfImpact ?? Infinity) < 0.15) { // If the ray hit something within 0.15 units, we are on the ground
      body.current?.applyImpulse({ x: 0, y: 0.5, z: 0 }, true); // Apply an upward impulse to jump
    }
  }

  const reset = () => {
  if (!body.current) return;
      body.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }

  useEffect(() => {
    const unsubscribeKeys = subscribeKeys(
      (state) => {
        if (state.jump) {
          jumpAction();
        }
        
        start();
      }
    );

    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          reset();
        }
      }
    );

    return () => {
      unsubscribeKeys();
      unsubscribeReset();
    };
  }, [])

  useFrame((state, delta) => {
  if (!body.current) return;
    // controls
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    body.current.applyImpulse(impulse, true);
    body.current.applyTorqueImpulse(torque, true);

    // camera
    const bodyPosition = body.current.translation() as { x: number; y: number; z: number };
    const cameraPosition = [bodyPosition.x, bodyPosition.y + 0.5, bodyPosition.z + 2];

    state.camera.position.lerp(
      { x: cameraPosition[0], y: cameraPosition[1], z: cameraPosition[2] },
      5 * delta
    );

    if (bodyPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }

    if (bodyPosition.y < -4) {
      restart();
    }
  })

  return (
    <>
      <RigidBody
        ref={body}
        colliders="ball"
        position={[0, 1, 0]}
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        canSleep={false}
      >
        <Icosahedron
          castShadow
          args={[0.3, 1]}
        >
          <meshStandardMaterial
            color="royalblue"
            flatShading
          />
        </Icosahedron>
      </RigidBody>
    </>
  )
}