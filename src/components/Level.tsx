import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useAppStore, useGameStore, LevelBlock } from '../store';
import { Environment, Sky } from '@react-three/drei';
import { officialLevels } from '../officialLevels';
import * as THREE from 'three';

export interface PlatformProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  isLava?: boolean;
  isWin?: boolean;
  isIce?: boolean;
  isMud?: boolean;
  isShipPortal?: boolean;
  isSpherePortal?: boolean;
  isWall?: boolean;
}

export function Platform({ position, size, color = '#ffffff', isLava, isWin, isIce, isMud, isShipPortal, isSpherePortal, isWall }: PlatformProps) {
  const addDeath = useGameStore((s) => s.addDeath);
  const setStatus = useGameStore((s) => s.setStatus);
  const stopTimer = useGameStore((s) => s.stopTimer);
  const setPlayerShape = useGameStore((s) => s.setPlayerShape);
  const playerShape = useGameStore((s) => s.playerShape);

  const isPortal = isShipPortal || isSpherePortal;
  const actualSize = isPortal ? [400, 400, size[2]] : size;

  return (
    <RigidBody
      type="fixed"
      colliders={false}
      position={position}
      userData={{ isIce, isMud }}
      onIntersectionEnter={() => {
        if (isShipPortal) setPlayerShape('ship');
        else if (isSpherePortal) setPlayerShape('sphere');
      }}
      onCollisionEnter={() => {
        if (isWin) {
          setStatus('won');
          stopTimer();
        } else if (isLava) {
          addDeath();
        } else if (!isPortal && playerShape === 'ship') {
          addDeath(); // Ship dies on any solid block
        }
      }}
    >
      <CuboidCollider args={[actualSize[0] / 2, actualSize[1] / 2, actualSize[2] / 2]} sensor={isPortal} />
      <mesh receiveShadow={!isPortal} castShadow={!isPortal}>
        <boxGeometry args={actualSize} />
        {isLava ? (
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        ) : isIce ? (
          <meshStandardMaterial color={color} transparent opacity={0.6} roughness={0.1} />
        ) : isPortal ? (
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.2} depthWrite={false} side={THREE.DoubleSide} />
        ) : isMud ? (
          <meshStandardMaterial color={color} roughness={1} />
        ) : isWall ? (
          <meshStandardMaterial color={color} transparent opacity={0.2} roughness={0.1} metalness={0.5} />
        ) : (
          <meshStandardMaterial color={color} />
        )}
      </mesh>
    </RigidBody>
  );
}

export function Level() {
  const currentLevelId = useAppStore(s => s.currentLevelId);
  const customLevels = useAppStore(s => s.customLevels);
  
  let blocks: LevelBlock[] = officialLevels.length > 0 ? officialLevels[0].blocks : [];
  if (currentLevelId) {
    const custom = customLevels.find(l => l.id === currentLevelId);
    const official = officialLevels.find(l => l.id === currentLevelId);
    blocks = custom?.blocks || official?.blocks || blocks;
  }

  return (
    <group>
      <Sky sunPosition={[100, 20, 100]} />
      
      {blocks.map((block) => (
        <Platform 
          key={block.id}
          position={block.position} 
          size={block.size} 
          color={block.color} 
          isLava={block.type === 'lava'}
          isWin={block.type === 'win'}
          isIce={block.type === 'ice'}
          isMud={block.type === 'mud'}
          isShipPortal={block.type === 'ship-portal'}
          isSpherePortal={block.type === 'sphere-portal'}
          isWall={block.type === 'wall'}
        />
      ))}
    </group>
  );
}

