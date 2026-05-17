import { RigidBody } from '@react-three/rapier';
import { useAppStore, useGameStore, LevelBlock } from '../store';
import { Environment, Sky } from '@react-three/drei';

export interface PlatformProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  isLava?: boolean;
  isWin?: boolean;
  isIce?: boolean;
}

export function Platform({ position, size, color = '#ffffff', isLava, isWin, isIce }: PlatformProps) {
  const addDeath = useGameStore((s) => s.addDeath);
  const setStatus = useGameStore((s) => s.setStatus);
  const stopTimer = useGameStore((s) => s.stopTimer);

  return (
    <RigidBody
      type="fixed"
      position={position}
      userData={{ isIce }}
      onCollisionEnter={() => {
        if (isLava) {
          addDeath();
        } else if (isWin) {
          setStatus('won');
          stopTimer();
        }
      }}
    >
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        {isLava ? (
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        ) : isIce ? (
          <meshStandardMaterial color={color} transmission={0.9} transparent opacity={0.8} roughness={0.1} />
        ) : (
          <meshStandardMaterial color={color} />
        )}
      </mesh>
    </RigidBody>
  );
}

const DEFAULT_LEVEL_BLOCKS: LevelBlock[] = [
  { id: '1', position: [0, -1, 0], size: [8, 1, 8], type: 'platform', color: '#94a3b8' },
  { id: '2', position: [0, -1, -8], size: [4, 1, 4], type: 'platform', color: '#cbd5e1' },
  { id: '3', position: [0, -0.5, -15], size: [3, 1, 3], type: 'platform', color: '#cbd5e1' },
  { id: '4', position: [-6, 0, -15], size: [3, 1, 3], type: 'platform', color: '#cbd5e1' },
  { id: '5', position: [-13, 1, -15], size: [6, 1, 1], type: 'platform', color: '#f59e0b' },
  { id: '6', position: [-18, 2, -15], size: [2, 1, 2], type: 'platform', color: '#cbd5e1' },
  { id: '7', position: [-18, 3.5, -21], size: [2, 1, 2], type: 'platform', color: '#cbd5e1' },
  { id: '8', position: [-18, 2.5, -28], size: [6, 1, 6], type: 'platform', color: '#334155' },
  { id: '9', position: [-18, 2.0, -36], size: [12, 1, 14], type: 'lava', color: '#ef4444' },
  { id: '10', position: [-18, 4.5, -34], size: [2, 1, 2], type: 'platform', color: '#f59e0b' },
  { id: '11', position: [-8, 5.0, -34], size: [3, 1, 3], type: 'platform', color: '#cbd5e1' },
  { id: '12', position: [0, 4.5, -34], size: [8, 1, 8], type: 'win', color: '#10b981' },
];

export function Level() {
  const currentLevelId = useAppStore(s => s.currentLevelId);
  const customLevels = useAppStore(s => s.customLevels);
  
  const blocks = currentLevelId 
    ? (customLevels.find(l => l.id === currentLevelId)?.blocks || DEFAULT_LEVEL_BLOCKS)
    : DEFAULT_LEVEL_BLOCKS;

  return (
    <group>
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="city" />
      
      {blocks.map((block) => (
        <Platform 
          key={block.id}
          position={block.position} 
          size={block.size} 
          color={block.color} 
          isLava={block.type === 'lava'}
          isWin={block.type === 'win'}
          isIce={block.type === 'ice'}
        />
      ))}
    </group>
  );
}

