import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
import { Level } from './Level';
import { Player } from './Player';
import { UI } from './UI';
import { useGameStore } from '../store';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'back', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
];

export function PlayScreen() {
  const gravityDir = useGameStore(s => s.gravityDirection);

  return (
    <>
      <UI />
      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
          />

          <Suspense fallback={null}>
            <Physics gravity={[0, -20 * gravityDir, 0]}>
              <Level />
              <Player />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  );
}
