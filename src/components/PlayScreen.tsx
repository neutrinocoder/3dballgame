import { Suspense } from 'react';
import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Level } from './Level';
import { Player } from './Player';
import { UI } from './UI';
import { useGameStore, useAppStore, BackgroundTheme } from '../store';
import { Background } from './Background';
import { officialLevels } from '../officialLevels';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'back', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
];

export function PlayScreen() {
  const gravityDir = useGameStore(s => s.gravityDirection);
  const currentLevelId = useAppStore(s => s.currentLevelId);
  const customLevels = useAppStore(s => s.customLevels);

  let theme: BackgroundTheme | undefined;
  if (currentLevelId) {
    const custom = customLevels.find(l => l.id === currentLevelId);
    if (custom) theme = custom.backgroundTheme;
    else {
       const official = officialLevels.find(l => l.id === currentLevelId);
       if (official) theme = official.backgroundTheme;
    }
  }

  return (
    <>
      <UI />
      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <Background theme={theme} />
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
