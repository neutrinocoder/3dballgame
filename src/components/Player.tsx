import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier, RapierRigidBody, CuboidCollider, BallCollider } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../store';

export function Player() {
  const body = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Group>(null);
  const thrusterRef = useRef<THREE.Mesh>(null);
  const [, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const lastJumpTime = useRef(0);
  
  // Camera state
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isPointerLocked = useRef(false);
  const isClicking = useRef(false);
  const clickBuffer = useRef(false);
  const iceContacts = useRef(0);
  const mudContacts = useRef(0);

  const status = useGameStore((s) => s.status);
  const addDeath = useGameStore((s) => s.addDeath);
  const playerShape = useGameStore((s) => s.playerShape);
  const gravityDir = useGameStore((s) => s.gravityDirection);

  useEffect(() => {
    if (status === 'playing' && body.current) {
      body.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  }, [status]);

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

    const handlePointerDown = (e: MouseEvent) => {
      if (e.button === 0 && isPointerLocked.current) {
        isClicking.current = true;
        clickBuffer.current = true;
      }
    };

    const handlePointerUp = (e: MouseEvent) => {
      if (e.button === 0) isClicking.current = false;
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
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

  useFrame((state, delta) => {
    if (!body.current || status !== 'playing') return;

    const { forward, back, left, right, jump: keyboardJump } = getKeys();
    const jump = keyboardJump || isClicking.current || clickBuffer.current;
    clickBuffer.current = false;
    const translation = body.current.translation();
    const linvel = body.current.linvel();
    
    if (!translation || !linvel || isNaN(translation.y) || isNaN(linvel.y)) return;

    // Death by falling out of bounds
    if (translation.y < -40) {
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

    if (playerShape === 'ufo') {
      // UFO: Constant forward speed, no mouse tracking up/down, relies entirely on clicks and gravity
      body.current.setLinvel({ x: 0, y: linvel.y, z: -8 }, true);
      // Keep mesh oriented forward but still flip if gravity flips
      if (meshRef.current) {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, gravityDir === -1 ? Math.PI : 0, 10 * delta);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 10 * delta);
      }
      
      if (jump && state.clock.elapsedTime - lastJumpTime.current > 0.3) {
         body.current.setLinvel({ x: 0, y: 8 * gravityDir, z: -8 }, true);
         lastJumpTime.current = state.clock.elapsedTime;
      }
    } else if (playerShape === 'ship') {
      let targetY = linvel.y;
      if (jump) {
        // Geometry Dash style ship thrust
        targetY = Math.min(linvel.y + 40 * delta, 12);
      }

      const shipSpeed = 10;
      const targetVelocity = direction.multiplyScalar(shipSpeed);
      
      body.current.setLinvel({
        x: THREE.MathUtils.lerp(linvel.x, targetVelocity.x, Math.min(10 * delta, 1)),
        y: targetY,
        z: THREE.MathUtils.lerp(linvel.z, targetVelocity.z, Math.min(10 * delta, 1))
      }, true);

      // Rotate the ship mesh to face movement direction
      if (meshRef.current) {
        if (inputVector.lengthSq() > 0) {
          const targetAngle = Math.atan2(direction.x, direction.z);
          
          // Simple rotation lerp avoiding quaternions to prevent flipping/shaking
          let diff = targetAngle - (meshRef.current.rotation.y % (Math.PI * 2));
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          
          meshRef.current.rotation.y += diff * Math.min(10 * delta, 1);
        }
        
        // Tilt the ship based on vertical velocity
        const pitchAngle = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, linvel.y * gravityDir * 0.15));
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pitchAngle, Math.min(10 * delta, 1));
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, gravityDir === -1 ? Math.PI : 0, Math.min(10 * delta, 1));
      }

      // Thruster Animation
      if (thrusterRef.current) {
        const targetScale = jump ? 1 + Math.random() * 0.4 : 0;
        thrusterRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), Math.min(20 * delta, 1));
        thrusterRef.current.rotation.y += 20 * delta; // flicker effect
      }
    } else {
      // Jump Raycast Implementation (Moved up to use for air momentum)
      const rayOrigin = new THREE.Vector3(translation.x, translation.y - (0.51 * gravityDir), translation.z);
      const rayDir = new THREE.Vector3(0, -gravityDir, 0);
      const ray = new rapier.Ray(rayOrigin, rayDir);
      const hit = world.castRay(ray, 0.2, true);
      const isGrounded = hit !== null;

      // SPHERE PHYSICS
      let currentSpeed = 12;
      
      // Add momentum: slower acceleration on ground, and very limited air-control to preserve jump arcs
      let lerpFactor = isGrounded ? Math.min(5 * delta, 1) : Math.min(2 * delta, 1); 
      let jumpForce = 5.5 * gravityDir;

      if (mudContacts.current > 0) {
        currentSpeed = 4; // slow movement
        lerpFactor = Math.min(15 * delta, 1); // high friction in mud, stops quickly
        jumpForce = 1.2 * gravityDir; // hard to jump
        linvel.y = gravityDir === 1 ? Math.min(linvel.y, 0) : Math.max(linvel.y, 0); // kill bounce
      } else if (iceContacts.current > 0) {
        lerpFactor = Math.min(1 * delta, 1); // low friction, slide easily with lots of momentum
      }

      const targetVelocity = direction.multiplyScalar(currentSpeed);

      body.current.setLinvel({
        x: THREE.MathUtils.lerp(linvel.x, targetVelocity.x, lerpFactor),
        y: linvel.y,
        z: THREE.MathUtils.lerp(linvel.z, targetVelocity.z, lerpFactor)
      }, true);

      if (jump && isGrounded && state.clock.elapsedTime - lastJumpTime.current > 0.05) {
        body.current.applyImpulse({ x: 0, y: jumpForce, z: 0 }, true);
        lastJumpTime.current = state.clock.elapsedTime;
      }
      
      if (meshRef.current) {
        // Reset rotation if switching back to sphere, but keep Z flipped if upside down
        meshRef.current.rotation.set(0, 0, gravityDir === -1 ? Math.PI : 0);
      }
    }

    // Update Camera Position and Rotation
    const cameraDistance = playerShape === 'ship' ? 10 : 8;
    
    // Calculate the camera's desired position offset based on Euler angles
    const offset = new THREE.Vector3(0, 0, cameraDistance);
    offset.applyEuler(euler.current);
    
    // Get the smoothed, interpolated position of the visual mesh to eliminate camera shaking
    const smoothTranslation = new THREE.Vector3();
    if (meshRef.current) {
      meshRef.current.getWorldPosition(smoothTranslation);
    } else {
      smoothTranslation.copy(translation);
    }

    const cameraPos = new THREE.Vector3(smoothTranslation.x, smoothTranslation.y + 1, smoothTranslation.z).add(offset);
    
    // Lock camera directly to eliminate shaking
    state.camera.position.copy(cameraPos);
    
    // Make the camera look at the player with an offset in height
    const lookAtPos = new THREE.Vector3(smoothTranslation.x, smoothTranslation.y + 1, smoothTranslation.z);
    state.camera.lookAt(lookAtPos);
  });

  return (
    <RigidBody 
      ref={body} 
      colliders={false} 
      position={[0, 1, 0]} 
      type="dynamic" 
      mass={1} 
      lockRotations 
      friction={0} 
      restitution={0.6}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.userData?.isIce) iceContacts.current++;
        if (other.rigidBodyObject?.userData?.isMud) mudContacts.current++;
      }}
      onCollisionExit={({ other }) => {
        if (other.rigidBodyObject?.userData?.isIce) iceContacts.current = Math.max(0, iceContacts.current - 1);
        if (other.rigidBodyObject?.userData?.isMud) mudContacts.current = Math.max(0, mudContacts.current - 1);
      }}
    >
      {playerShape === 'ship' || playerShape === 'ufo' ? (
        <CuboidCollider args={[0.4, 0.4, 0.4]} />
      ) : (
        <BallCollider args={[0.5]} />
      )}
      <group ref={meshRef}>
        {playerShape === 'ship' ? (
          // Simple 3D Ship built from basic geometries
          <group>
            {/* Main Body */}
            <mesh castShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.6, 2, 4]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            {/* Cockpit */}
            <mesh castShadow position={[0, 0.4, 0.2]}>
              <boxGeometry args={[0.4, 0.4, 0.8]} />
              <meshStandardMaterial color="#3b82f6" />
            </mesh>
            {/* Wings */}
            <mesh castShadow position={[0, 0, -0.2]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.1, 2.5, 0.8]} />
              <meshStandardMaterial color="#cbd5e1" />
            </mesh>
            {/* Thruster Flame */}
            <mesh ref={thrusterRef} position={[0, 0, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.3, 1, 8]} />
              <meshStandardMaterial color="#fb923c" emissive="#ea580c" emissiveIntensity={2} transparent opacity={0.8} />
            </mesh>
          </group>
        ) : playerShape === 'ufo' ? (
          <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.5, 1.5, 16]} />
            <meshStandardMaterial color="#f97316" metalness={0.8} roughness={0.2} />
          </mesh>
        ) : (
          <mesh castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        )}
      </group>
    </RigidBody>
  );
}
