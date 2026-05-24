import { Environment, Sky, Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BackgroundTheme } from '../store';

interface BackgroundProps {
  theme?: BackgroundTheme;
}

export function Background({ theme = 'glow' }: BackgroundProps) {
  if (theme === 'sunny') {
    return (
      <>
        <color attach="background" args={['#87CEEB']} />
        <fog attach="fog" args={['#87CEEB', 20, 150]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />
        <Sky sunPosition={[100, 20, 100]} />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={2.0} mipmapBlur intensity={0.5} />
        </EffectComposer>
      </>
    );
  }

  if (theme === 'neon') {
    return (
      <>
        <color attach="background" args={['#1a0033']} />
        <fog attach="fog" args={['#2d004d', 10, 100]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 20, 10]} intensity={0.8} color="#ff00ff" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
        <Sparkles count={300} scale={100} size={3} speed={0.8} opacity={0.5} color="#00ffff" />
        <Environment preset="night" />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.8} mipmapBlur intensity={2.0} />
        </EffectComposer>
      </>
    );
  }

  if (theme === 'dark') {
    return (
      <>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 80]} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 10, 5]} intensity={0.3} color="#ffffff" />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1.5} mipmapBlur intensity={0.5} />
        </EffectComposer>
      </>
    );
  }

  if (theme === 'space') {
    return (
      <>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 20, 200]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.0} />
        <Stars radius={100} depth={50} count={10000} factor={3} saturation={0} fade speed={0.5} />
        <Environment preset="night" />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1.0} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </>
    );
  }

  // Default 'glow' theme
  return (
    <>
      <color attach="background" args={['#0f0728']} />
      <fog attach="fog" args={['#0f0728', 10, 150]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={100} size={2} speed={0.4} opacity={0.3} color="#a855f7" />
      <Environment preset="night" />
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1.0} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </>
  );
}
