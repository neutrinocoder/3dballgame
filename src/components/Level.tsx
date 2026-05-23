import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useAppStore, LevelBlock } from '../store';
import { useGameStore } from '../store';
import { BlockMaterial } from './BlockMaterial';
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
  isUfoPortal?: boolean;
  isWall?: boolean;
  isGravityUpPortal?: boolean;
  isGravityDownPortal?: boolean;
  texture?: string;
}

export function Platform({ position, size, color = '#ffffff', isLava, isWin, isIce, isMud, isShipPortal, isSpherePortal, isUfoPortal, isWall, isGravityUpPortal, isGravityDownPortal, texture }: PlatformProps) {
  const addDeath = useGameStore((s) => s.addDeath);
  const setStatus = useGameStore((s) => s.setStatus);
  const stopTimer = useGameStore((s) => s.stopTimer);
  const setPlayerShape = useGameStore((s) => s.setPlayerShape);
  const setGravityDirection = useGameStore((s) => s.setGravityDirection);

  const isGravityPortal = isGravityUpPortal || isGravityDownPortal;
  const isShapePortal = isShipPortal || isSpherePortal || isUfoPortal;
  const isPortal = isShapePortal || isGravityPortal;
  const isSensor = isPortal;
  const colliderSize = isShapePortal ? [400, 400, size[2]] : size;
  const visualSize = size;

  return (
    <RigidBody
      type="fixed"
      colliders={false}
      position={position}
      userData={{ isIce, isMud }}
      onIntersectionEnter={() => {
        if (isShipPortal) setPlayerShape('ship');
        else if (isSpherePortal) setPlayerShape('sphere');
        else if (isUfoPortal) setPlayerShape('ufo');
        else if (isGravityUpPortal) setGravityDirection(-1);
        else if (isGravityDownPortal) setGravityDirection(1);
      }}
      onCollisionEnter={() => {
        const currentShape = useGameStore.getState().playerShape;
        if (isWin) {
          setStatus('won');
          stopTimer();
        } else if (isLava) {
          addDeath();
        } else if (!isSensor && currentShape === 'ship') {
          addDeath(); // Ship dies on any solid block
        }
      }}
    >
      <CuboidCollider args={[colliderSize[0] / 2, colliderSize[1] / 2, colliderSize[2] / 2]} sensor={isSensor} />
      <mesh receiveShadow={!isSensor} castShadow={!isSensor}>
        <boxGeometry args={visualSize} />
        {isLava ? (
          <BlockMaterial texture="lava" size={size} color={color} emissive={color} emissiveIntensity={0.5} />
        ) : isIce ? (
          <BlockMaterial texture="ice" size={size} color={color} transparent opacity={0.6} roughness={0.1} />
        ) : isPortal ? (
          <BlockMaterial texture={texture} size={size} color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} depthWrite={false} side={THREE.DoubleSide} />
        ) : isMud ? (
          <BlockMaterial texture="mud" size={size} color={color} roughness={1} />
        ) : isWall ? (
          <BlockMaterial texture={texture} size={size} color={color} transparent={texture === 'glass'} opacity={texture === 'glass' ? 0.4 : 1} roughness={texture === 'glass' ? 0.1 : 1} />
        ) : (
          <BlockMaterial texture={texture} size={size} color={color} transparent={texture === 'glass'} opacity={texture === 'glass' ? 0.4 : 1} roughness={texture === 'glass' ? 0.1 : 1} />
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
          isUfoPortal={block.type === 'ufo-portal'}
          isWall={block.type === 'wall'}
          isGravityUpPortal={block.type === 'gravity-up-portal'}
          isGravityDownPortal={block.type === 'gravity-down-portal'}
          texture={block.texture}
        />
      ))}
    </group>
  );
}
