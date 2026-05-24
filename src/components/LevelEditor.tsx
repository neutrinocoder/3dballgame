import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, Grid, TransformControls, Line, Stars, Sparkles } from '@react-three/drei';
import { useState, useEffect, Suspense } from 'react';
import { CustomLevel, LevelBlock, useAppStore } from '../store';
import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { BlockMaterial } from './BlockMaterial';

function JumpIndicator({ block }: { block: LevelBlock }) {
  if (block.type !== 'platform' && block.type !== 'ice' && block.type !== 'mud') return null;

  const isMud = block.type === 'mud';
  const vx = isMud ? 4 : 12;
  const vy = isMud ? 3 : 5.5;
  const g = 20;
  const ballRadius = 0.5;

  // Calculate time to fall 15 units below the platform surface
  const a = 0.5 * g;
  const c = -15;

  const bJump = -vy;
  const tTotalJump = (-bJump + Math.sqrt(bJump * bJump - 4 * a * c)) / (2 * a);
  
  const bDrop = 0; // Dropping without jumping
  const tTotalDrop = (-bDrop + Math.sqrt(bDrop * bDrop - 4 * a * c)) / (2 * a);
  
  const jumpPoints: [number, number, number][] = [];
  const dropPoints: [number, number, number][] = [];
  const segments = 40; 
  for (let i = 0; i <= segments; i++) {
    const tJump = (i / segments) * tTotalJump;
    const xJump = (vx * tJump) + ballRadius; 
    const yJump = (vy * tJump) - (0.5 * g * tJump * tJump);
    jumpPoints.push([xJump, yJump, 0]);

    const tDrop = (i / segments) * tTotalDrop;
    const xDrop = (vx * tDrop) + ballRadius; 
    const yDrop = (0 * tDrop) - (0.5 * g * tDrop * tDrop);
    dropPoints.push([xDrop, yDrop, 0]);
  }

  const w = block.size[0] / 2;
  const h = block.size[1] / 2;
  const d = block.size[2] / 2;

  const color = isMud ? '#f59e0b' : block.type === 'ice' ? '#2dd4bf' : '#fb7185';
  const dropColor = isMud ? '#b45309' : block.type === 'ice' ? '#0f766e' : '#be123c';

  return (
    <group position={[block.position[0], block.position[1] + h, block.position[2]]}>
      <group position={[w, 0, 0]}>
        <Line points={jumpPoints} color={color} dashed dashScale={1} dashSize={0.5} gapSize={0.2} lineWidth={2} />
        <Line points={dropPoints} color={dropColor} dashed dashScale={1} dashSize={0.3} gapSize={0.4} lineWidth={1} />
      </group>
      <group position={[-w, 0, 0]} rotation={[0, Math.PI, 0]}>
        <Line points={jumpPoints} color={color} dashed dashScale={1} dashSize={0.5} gapSize={0.2} lineWidth={2} />
        <Line points={dropPoints} color={dropColor} dashed dashScale={1} dashSize={0.3} gapSize={0.4} lineWidth={1} />
      </group>
      <group position={[0, 0, d]} rotation={[0, -Math.PI / 2, 0]}>
        <Line points={jumpPoints} color={color} dashed dashScale={1} dashSize={0.5} gapSize={0.2} lineWidth={2} />
        <Line points={dropPoints} color={dropColor} dashed dashScale={1} dashSize={0.3} gapSize={0.4} lineWidth={1} />
      </group>
      <group position={[0, 0, -d]} rotation={[0, Math.PI / 2, 0]}>
        <Line points={jumpPoints} color={color} dashed dashScale={1} dashSize={0.5} gapSize={0.2} lineWidth={2} />
        <Line points={dropPoints} color={dropColor} dashed dashScale={1} dashSize={0.3} gapSize={0.4} lineWidth={1} />
      </group>
    </group>
  );
}

export function LevelEditor() {
  const currentLevelId = useAppStore(s => s.currentLevelId);
  const customLevels = useAppStore(s => s.customLevels);
  const saveCustomLevel = useAppStore(s => s.saveCustomLevel);
  const setView = useAppStore(s => s.setView);
  const setCurrentLevelId = useAppStore(s => s.setCurrentLevelId);

  const [level, setLevel] = useState<CustomLevel>({
    id: uuidv4(),
    name: 'My New Level',
    blocks: [
      { id: uuidv4(), position: [0, -1, 0], size: [8, 1, 8], type: 'platform', color: '#94a3b8' }
    ]
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  useEffect(() => {
    if (currentLevelId) {
      const existing = customLevels.find(l => l.id === currentLevelId);
      if (existing) setLevel(existing);
    }
  }, [currentLevelId, customLevels]);

  const updateBlock = (id: string, updates: Partial<LevelBlock>) => {
    setLevel(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
    }));
  };

  const addBlock = (type: LevelBlock['type']) => {
    const defaultColor = type === 'lava' ? '#ef4444' : type === 'win' ? '#10b981' : type === 'ice' ? '#67e8f9' : type === 'mud' ? '#78350f' : type === 'ship-portal' ? '#a855f7' : type === 'sphere-portal' ? '#3b82f6' : type === 'ufo-portal' ? '#f97316' : type === 'wall' ? '#94a3b8' : type === 'gravity-up-portal' ? '#eab308' : type === 'gravity-down-portal' ? '#22c55e' : '#cbd5e1';
    const newBlock: LevelBlock = {
      id: uuidv4(),
      position: [0, 0, 0],
      size: [4, 1, 4],
      type,
      color: defaultColor
    };
    setLevel(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
    setSelectedBlockId(newBlock.id);
  };

  const cloneBlock = (id: string) => {
    const block = level.blocks.find(b => b.id === id);
    if (!block) return;
    const newBlock = { ...block, id: uuidv4(), position: [block.position[0] + 5, block.position[1], block.position[2]] as [number,number,number] };
    setLevel(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (id: string) => {
    setLevel(prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== id) }));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const saveAndExit = () => {
    saveCustomLevel(level);
    setView('home');
  };

  const saveAndPlay = () => {
    saveCustomLevel(level);
    setCurrentLevelId(level.id);
    setView('play');
  };

  const exportOfficial = () => {
    const jsonStr = JSON.stringify(level, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      alert("Level JSON copied to clipboard! Paste it into src/officialLevels.ts");
    }).catch(() => {
      alert("Failed to copy clipboard. See console.");
      console.log(jsonStr);
    });
  };

  const selectedBlock = level.blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="flex w-full h-screen bg-slate-900 overflow-hidden text-sm">
      {/* 3D Canvas View */}
      <div className="flex-1 relative bg-[#0f0728]">
        <Canvas camera={{ position: [0, 15, 25], fov: 60 }}>
          <color attach="background" args={['#0f0728']} />
          <fog attach="fog" args={['#0f0728', 20, 150]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={200} scale={100} size={2} speed={0.4} opacity={0.3} color="#a855f7" />
          <Environment preset="night" />
          <Suspense fallback={null}>
            <Grid infiniteGrid fadeDistance={50} sectionColor="#475569" cellColor="#334155" />
          {level.blocks.map((block) => {
            const isSelected = selectedBlockId === block.id;
            const isPortal = block.type === 'ship-portal' || block.type === 'sphere-portal' || block.type === 'gravity-up-portal' || block.type === 'gravity-down-portal';
            const meshNode = (
              <mesh 
                position={isSelected ? [0, 0, 0] : block.position} 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBlockId(block.id);
                }}
              >
                <boxGeometry args={block.size} />
                {block.type === 'ice' ? (
                  <BlockMaterial 
                    texture="ice"
                    size={block.size}
                    color={block.color} 
                    transparent 
                    opacity={isSelected ? 0.4 : 0.6} 
                    roughness={0.1} 
                    wireframe={isSelected}
                  />
                ) : block.type === 'mud' ? (
                  <BlockMaterial 
                    texture="dirt"
                    size={block.size}
                    color={block.color} 
                    roughness={1}
                    wireframe={isSelected}
                  />
                ) : block.type === 'lava' ? (
                  <BlockMaterial 
                    texture="lava"
                    size={block.size}
                    color={block.color} 
                    emissive={block.color}
                    emissiveIntensity={0.5}
                    wireframe={isSelected}
                  />
                ) : (
                  <BlockMaterial 
                    texture={block.texture}
                    size={block.size}
                    color={block.color} 
                    emissive={isPortal ? block.color : '#000000'}
                    emissiveIntensity={isPortal ? 0.8 : 0}
                    wireframe={isSelected}
                    transparent={isSelected || isPortal || block.texture === 'glass'}
                    opacity={isSelected ? 0.8 : isPortal ? 0.6 : block.texture === 'glass' ? 0.4 : 1}
                    roughness={block.texture === 'glass' ? 0.1 : 1}
                  />
                )}
                {isPortal && (
                  <mesh raycast={() => null}>
                    <boxGeometry args={[400, 400, block.size[2]]} />
                    <meshStandardMaterial color={block.color} emissive={block.color} emissiveIntensity={0.8} transparent opacity={0.1} depthWrite={false} side={THREE.DoubleSide} />
                  </mesh>
                )}
              </mesh>
            );

            if (isSelected) {
              return (
                <group key={block.id}>
                  <TransformControls
                    position={block.position}
                    mode="translate"
                    onMouseUp={(e) => {
                      if (e && e.target && e.target.object) {
                        const p = e.target.object.position;
                        updateBlock(block.id, { 
                          position: [Math.round(p.x * 2) / 2, Math.round(p.y * 2) / 2, Math.round(p.z * 2) / 2] 
                        });
                      }
                    }}
                  >
                    {meshNode}
                  </TransformControls>
                  <JumpIndicator block={block} />
                </group>
              );
            }

            return <group key={block.id}>{meshNode}</group>;
          })}
          <OrbitControls makeDefault />
          </Suspense>
        </Canvas>
        
        {/* Editor Controls Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button onClick={saveAndExit} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded shadow border border-slate-600 font-bold">
            ← BACK
          </button>
          <button onClick={saveAndPlay} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded shadow font-bold">
            ▶ TEST LEVEL
          </button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={exportOfficial} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded shadow font-bold">
            EXPORT TO OFFICIAL
          </button>
        </div>
      </div>

      {/* Right Sidebar UI */}
      <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col h-full text-slate-200">
        <div className="p-4 border-b border-slate-700">
          <label className="block text-xs text-slate-400 mb-1">LEVEL NAME</label>
          <input 
            type="text" 
            value={level.name}
            onChange={(e) => setLevel(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="p-4 border-b border-slate-700 grid grid-cols-2 gap-2">
          <button onClick={() => addBlock('platform')} className="bg-slate-700 hover:bg-slate-600 px-2 py-2 rounded text-xs font-bold">+ PLATFORM</button>
          <button onClick={() => addBlock('ice')} className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 px-2 py-2 rounded text-xs font-bold">+ ICE</button>
          <button onClick={() => addBlock('mud')} className="bg-amber-900 hover:bg-amber-800 text-amber-100 px-2 py-2 rounded text-xs font-bold">+ MUD</button>
          <button onClick={() => addBlock('lava')} className="bg-red-900 hover:bg-red-800 text-red-100 px-2 py-2 rounded text-xs font-bold">+ LAVA</button>
          <button onClick={() => addBlock('ship-portal')} className="bg-purple-900 hover:bg-purple-800 text-purple-100 px-2 py-2 rounded text-xs font-bold">+ SHIP</button>
          <button onClick={() => addBlock('sphere-portal')} className="bg-blue-900 hover:bg-blue-800 text-blue-100 px-2 py-2 rounded text-xs font-bold">+ SPHERE</button>
          <button onClick={() => addBlock('ufo-portal')} className="bg-orange-700 hover:bg-orange-600 text-orange-100 px-2 py-2 rounded text-xs font-bold">+ UFO</button>
          <button onClick={() => addBlock('wall')} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-2 rounded text-xs font-bold">+ WALL</button>
          <button onClick={() => addBlock('win')} className="bg-emerald-900 hover:bg-emerald-800 text-emerald-100 px-2 py-2 rounded text-xs font-bold">+ WIN PAD</button>
          <button onClick={() => addBlock('gravity-up-portal')} className="bg-yellow-500 hover:bg-yellow-400 text-black px-2 py-2 rounded text-xs font-bold">+ GRAV UP</button>
          <button onClick={() => addBlock('gravity-down-portal')} className="bg-green-500 hover:bg-green-400 text-black px-2 py-2 rounded text-xs font-bold">+ GRAV DOWN</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {selectedBlock ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-white mb-2 uppercase tracking-wide flex justify-between items-center">
                  <span>Edit {selectedBlock.type}</span>
                  <div className="flex gap-1">
                    <button onClick={() => cloneBlock(selectedBlock.id)} className="bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-xs">Clone</button>
                    <button onClick={() => deleteBlock(selectedBlock.id)} className="bg-red-900 hover:bg-red-800 text-red-100 px-2 py-1 rounded text-xs">Del</button>
                  </div>
                </h3>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400">POSITION (X, Y, Z)</label>
                <div className="grid grid-cols-3 gap-2">
                  <input type="number" step="0.5" value={selectedBlock.position[0]} onChange={(e) => updateBlock(selectedBlock.id, { position: [parseFloat(e.target.value) || 0, selectedBlock.position[1], selectedBlock.position[2]] })} className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono" />
                  <input type="number" step="0.5" value={selectedBlock.position[1]} onChange={(e) => updateBlock(selectedBlock.id, { position: [selectedBlock.position[0], parseFloat(e.target.value) || 0, selectedBlock.position[2]] })} className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono" />
                  <input type="number" step="0.5" value={selectedBlock.position[2]} onChange={(e) => updateBlock(selectedBlock.id, { position: [selectedBlock.position[0], selectedBlock.position[1], parseFloat(e.target.value) || 0] })} className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400">SIZE (W, H, D)</label>
                <div className="grid grid-cols-3 gap-2">
                  <input type="number" min="0.1" step="0.5" value={selectedBlock.size[0]} onChange={(e) => updateBlock(selectedBlock.id, { size: [Math.max(0.1, parseFloat(e.target.value) || 1), selectedBlock.size[1], selectedBlock.size[2]] })} className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono" />
                  <input type="number" min="0.1" step="0.5" value={selectedBlock.size[1]} onChange={(e) => updateBlock(selectedBlock.id, { size: [selectedBlock.size[0], Math.max(0.1, parseFloat(e.target.value) || 1), selectedBlock.size[2]] })} className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono" />
                  <input type="number" min="0.1" step="0.5" value={selectedBlock.size[2]} onChange={(e) => updateBlock(selectedBlock.id, { size: [selectedBlock.size[0], selectedBlock.size[1], Math.max(0.1, parseFloat(e.target.value) || 1)] })} className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400">COLOR</label>
                <input 
                  type="color" 
                  value={selectedBlock.color} 
                  onChange={(e) => updateBlock(selectedBlock.id, { color: e.target.value })}
                  className="w-full h-10 rounded cursor-pointer bg-slate-900 border border-slate-600 p-1"
                />
              </div>

              {selectedBlock.type !== 'ice' && selectedBlock.type !== 'mud' && selectedBlock.type !== 'lava' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400">TEXTURE</label>
                  <select
                    value={selectedBlock.texture || 'none'}
                    onChange={(e) => updateBlock(selectedBlock.id, { texture: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white outline-none focus:border-blue-500"
                  >
                    <option value="none">None (Solid Color)</option>
                    <option value="sci_fi_metal">Sci-Fi Metal</option>
                    <option value="rusty_iron">Rusty Iron</option>
                    <option value="wooden_crate">Wooden Crate</option>
                    <option value="neon_grid">Neon Grid</option>
                    <option value="stone_tile">Stone Tile</option>
                    <option value="grass">Grass</option>
                    <option value="dirt">Dirt</option>
                    <option value="glass">Glass</option>
                  </select>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-center">
              <div>
                <p>No block selected.</p>
                <p className="text-xs mt-2">Click a block in the 3D view to edit it.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
