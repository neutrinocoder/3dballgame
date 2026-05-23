import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useLayoutEffect } from 'react';

interface BlockMaterialProps {
  texture?: string;
  color: string;
  size: [number, number, number];
  emissive?: string;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
  roughness?: number;
  metalness?: number;
  depthWrite?: boolean;
  side?: THREE.Side;
  wireframe?: boolean;
}

export function BlockMaterial({ 
  texture, 
  color, 
  size, 
  emissive, 
  emissiveIntensity, 
  transparent, 
  opacity, 
  roughness, 
  metalness,
  depthWrite,
  side,
  wireframe
}: BlockMaterialProps) {
  const isTextureValid = texture && texture !== 'none';
  const mapPath = isTextureValid ? `/textures/${texture}.png` : undefined;
  
  // Conditionally call useTexture. We must always call it if this component renders, 
  // but we can pass an empty path or a default 1x1 pixel texture to avoid errors if it's dynamic.
  // Actually, three-drei useTexture does not allow dynamic undefined.
  // Instead, we will load a 1x1 white pixel if no texture is provided, or better yet, split the component.
  
  if (!isTextureValid) {
    return (
      <meshStandardMaterial 
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        transparent={transparent}
        opacity={opacity}
        roughness={roughness}
        metalness={metalness}
        depthWrite={depthWrite}
        side={side}
        wireframe={wireframe}
      />
    );
  }

  return <TexturedMaterial 
    mapPath={mapPath!} 
    size={size} 
    color={color} 
    emissive={emissive}
    emissiveIntensity={emissiveIntensity}
    transparent={transparent}
    opacity={opacity}
    roughness={roughness}
    metalness={metalness}
    depthWrite={depthWrite}
    side={side}
    wireframe={wireframe}
  />;
}

function TexturedMaterial({ mapPath, size, color, ...props }: any) {
  const map = useTexture(mapPath);
  
  useLayoutEffect(() => {
    if (map) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      // Repeat based on block size (e.g. 1 tile per 4 units)
      map.repeat.set(size[0] / 4, Math.max(size[1], size[2]) / 4);
      map.needsUpdate = true;
    }
  }, [map, size]);

  return (
    <meshStandardMaterial 
      map={map}
      color="#ffffff" // We set color to white so the texture renders naturally without tint
      {...props}
    />
  );
}
