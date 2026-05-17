import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier, RapierRigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../store';

export function Player() {
  const body = useRef<RapierRigidBody>(null);
  const [, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const lastJumpTime = useRef(0);
  
  // Camera state
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isPointerLocked = useRef(false);
  const iceContacts = useRef(0);

  const status = useGameStore((s) => s.status);
  const addDeath = useGameStore((s) => s.addDeath);

  useEffect(() => {
    const handleClick = () => {
      if (status === 'playing' && !isPointerLocked.current) {
        document.body.requestPointerLock();
      }
    };

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === document.body;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isPointerLocked.current) {
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;
        
        euler.current.y -= movementX * 0.002;
        euler.current.x -= movementY * 0.002;
        
        // Clamp pitch to avoid flipping
        euler.current.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, euler.current.x));
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
    };
  }, [status]);

  // Reset position when status is 'playing' again after death
  useEffect(() => {
    if (status === 'playing' && body.current) {
      body.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      euler.current.set(0, 0, 0); // reset camera angles
    } else {
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
    }
  }, [status]);

  useFrame((state) => {
    if (!body.current || status !== 'playing') return;

    const { forward, back, left, right, jump } = getKeys();
    const translation = body.current.translation();
    const linvel = body.current.linvel();

    // Death by falling out of bounds
    if (translation.y < -15) {
      addDeath();
      return;
    }

    // Input vector relative to camera
    const inputVector = new THREE.Vector3(0, 0, 0);
    if (forward) inputVector.z -= 1;
    if (back) inputVector.z += 1;
    if (left) inputVector.x -= 1;
    if (right) inputVector.x += 1;

    if (inputVector.lengthSq() > 0) {
      inputVector.normalize();
    }

    // Movement direction according to camera's Y rotation
    const direction = inputVector.clone().applyEuler(new THREE.Euler(0, euler.current.y, 0));

    const speed = 7;
    const targetVelocity = direction.multiplyScalar(speed);

    const lerpFactor = iceContacts.current > 0 ? 0.01 : 0.2;

    body.current.setLinvel({
      x: THREE.MathUtils.lerp(linvel.x, targetVelocity.x, lerpFactor),
      y: linvel.y,
      z: THREE.MathUtils.lerp(linvel.z, targetVelocity.z, lerpFactor)
    }, true);

    // Jump Raycast Implementation
    const rayOrigin = new THREE.Vector3(translation.x, translation.y - 0.51, translation.z);
    const rayDir = new THREE.Vector3(0, -1, 0);
    const ray = new rapier.Ray(rayOrigin, rayDir);
    const hit = world.castRay(ray, 0.2, true);

    const isGrounded = hit !== null;

    if (jump && isGrounded && state.clock.elapsedTime - lastJumpTime.current > 0.3) {
      body.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
      lastJumpTime.current = state.clock.elapsedTime;
    }

    // Update Camera Position and Rotation
    // Third-person camera approach: camera orbits around the player
    const cameraDistance = 8;
    
    // Calculate the camera's desired position offset based on Euler angles
    const offset = new THREE.Vector3(0, 0, cameraDistance);
    offset.applyEuler(euler.current);
    
    const cameraPos = new THREE.Vector3(translation.x, translation.y + 1, translation.z).add(offset);
    
    // Lerp camera for smooth floating feeling
    state.camera.position.lerp(cameraPos, 0.2);
    
    // Make the camera look at the player with an offset in height (so player isn't exactly center screen)
    const lookAtPos = new THREE.Vector3(translation.x, translation.y + 1, translation.z);
    
    // Provide a small lag to the lookAt as well for cinematic feel, or just snap
    state.camera.lookAt(lookAtPos);
  });

  return (
    <RigidBody 
      ref={body} 
      colliders="ball" 
      position={[0, 1, 0]} 
      type="dynamic" 
      mass={1} 
      lockRotations 
      friction={0} 
      restitution={0}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.userData?.isIce) iceContacts.current++;
      }}
      onCollisionExit={({ other }) => {
        if (other.rigidBodyObject?.userData?.isIce) iceContacts.current = Math.max(0, iceContacts.current - 1);
      }}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </RigidBody>
  );
}
