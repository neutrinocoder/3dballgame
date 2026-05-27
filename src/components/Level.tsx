import { useEffect } from 'react';
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
  isTrampolineYellow?: boolean;
  isTrampolineOrange?: boolean;
  isTrampolineRed?: boolean;
  isShipPortal?: boolean;
  isSpherePortal?: boolean;
  isUfoPortal?: boolean;
  isWavePortal?: boolean;
  isWall?: boolean;
  isGravityUpPortal?: boolean;
  isGravityDownPortal?: boolean;
  texture?: string;
}

export function Platform({ position, size, color = '#ffffff', isLava, isWin, isIce, isMud, isTrampolineYellow, isTrampolineOrange, isTrampolineRed, isShipPortal, isSpherePortal, isUfoPortal, isWavePortal, isWall, isGravityUpPortal, isGravityDownPortal, texture }: PlatformProps) {
  const addDeath = useGameStore((s) => s.addDeath);
  const setStatus = useGameStore((s) => s.setStatus);
  const stopTimer = useGameStore((s) => s.stopTimer);
  const setPlayerShape = useGameStore((s) => s.setPlayerShape);
  const setGravityDirection = useGameStore((s) => s.setGravityDirection);

  const isGravityPortal = isGravityUpPortal || isGravityDownPortal;
  const isShapePortal = isShipPortal || isSpherePortal || isUfoPortal || isWavePortal;
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
      onIntersectionEnter={(payload) => {
        if (isShipPortal) setPlayerShape('ship');
        else if (isSpherePortal) setPlayerShape('sphere');
        else if (isUfoPortal) setPlayerShape('ufo');
        else if (isWavePortal) setPlayerShape('wave');
        else if (isGravityUpPortal || isGravityDownPortal) {
          const rb = payload.other.rigidBody;
          if (rb) {
            const linvel = rb.linvel();
            if (isGravityUpPortal && linvel.y < 0) {
              rb.setLinvel({ x: linvel.x, y: 0, z: linvel.z }, true);
            } else if (isGravityDownPortal && linvel.y > 0) {
              rb.setLinvel({ x: linvel.x, y: 0, z: linvel.z }, true);
            }
          }
          if (isGravityUpPortal) setGravityDirection(-1);
          if (isGravityDownPortal) setGravityDirection(1);
        }
      }}
      onCollisionEnter={(payload) => {
        const currentShape = useGameStore.getState().playerShape;
        if (isWin) {
          setStatus('won');
          stopTimer();
        } else if (isLava) {
          addDeath();
        } else if (!isSensor && currentShape === 'ship') {
          addDeath(); // Ship dies on any solid block
        }
        
        if (isTrampolineYellow || isTrampolineOrange || isTrampolineRed) {
          const rb = payload.other.rigidBody;
          if (rb) {
            const linvel = rb.linvel();
            let bounceY = 22; // Yellow default
            if (isTrampolineOrange) bounceY = 35;
            if (isTrampolineRed) bounceY = 50;
            rb.setLinvel({ x: linvel.x, y: bounceY * useGameStore.getState().gravityDirection, z: linvel.z }, true);
          }
        }
      }}
    >
      <CuboidCollider args={[colliderSize[0] / 2, colliderSize[1] / 2, colliderSize[2] / 2]} sensor={isSensor} />
      <mesh receiveShadow={!isSensor} castShadow={!isSensor}>
        <boxGeometry args={visualSize} />
        {isLava ? (
          <BlockMaterial texture="lava" size={size} color={color} emissive={color} emissiveIntensity={2.5} />
        ) : isIce ? (
          <BlockMaterial texture="ice" size={size} color={color} transparent opacity={0.6} roughness={0.1} />
        ) : isPortal ? (
          <BlockMaterial texture={texture} size={size} color={color} emissive={color} emissiveIntensity={2.5} transparent opacity={0.6} depthWrite={false} side={THREE.DoubleSide} />
        ) : isMud ? (
          <BlockMaterial texture="dirt" size={size} color={color} roughness={1} />
        ) : (isTrampolineYellow || isTrampolineOrange || isTrampolineRed) ? (
          <BlockMaterial texture={texture || "neon_grid"} size={size} color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} />
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
  
  const setLevelEndZ = useGameStore(s => s.setLevelEndZ);
  
  // Find the lowest Z position among all win blocks
  // If no win block, default to -100
  const endZ = blocks
    .filter(b => b.type === 'win')
    .reduce((min, b) => Math.min(min, b.position[2]), 0) || -100;
    
  // We use a ref or effect to set it without looping renders.
  useEffect(() => {
    setLevelEndZ(endZ);
  }, [endZ, setLevelEndZ]);

  return (
    <group>
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
          isWavePortal={block.type === 'wave-portal'}
          isWall={block.type === 'wall'}
          isGravityUpPortal={block.type === 'gravity-up-portal'}
          isGravityDownPortal={block.type === 'gravity-down-portal'}
          isTrampolineYellow={block.type === 'trampoline-yellow'}
          isTrampolineOrange={block.type === 'trampoline-orange'}
          isTrampolineRed={block.type === 'trampoline-red'}
          texture={block.texture}
        />
      ))}
    </group>
  );
}
