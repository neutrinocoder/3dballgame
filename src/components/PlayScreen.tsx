import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Level } from './Level';
import { Player } from './Player';
import { UI } from './UI';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'back', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
];

export function PlayScreen() {
  return (
    <>
      <UI />
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[10, 20, 10]}
            intensity={1.5}
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />

          <Physics timeStep="vary">
            <Level />
            <Player />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  );
}
