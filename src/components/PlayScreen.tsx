import { KeyboardControls, Stars, Sparkles, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
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
          <color attach="background" args={['#0f0728']} />
          <fog attach="fog" args={['#0f0728', 10, 150]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
          />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={200} scale={100} size={2} speed={0.4} opacity={0.3} color="#a855f7" />
          <Environment preset="night" />

          <Suspense fallback={null}>
            <Physics gravity={[0, -20 * gravityDir, 0]}>
              <Level />
              <Player />
            </Physics>
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  );
}
