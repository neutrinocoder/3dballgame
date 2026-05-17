import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, Grid } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { CustomLevel, LevelBlock, useAppStore } from '../store';
import { v4 as uuidv4 } from 'uuid';

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
    const defaultColor = type === 'lava' ? '#ef4444' : type === 'win' ? '#10b981' : type === 'ice' ? '#67e8f9' : '#cbd5e1';
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

  const selectedBlock = level.blocks.find(b => b.id === selectedBlockId);

  return (
    <div className="flex w-full h-screen bg-slate-900 overflow-hidden text-sm">
      {/* 3D Canvas View */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
          <Sky sunPosition={[100, 20, 100]} />
          <Environment preset="city" />
          <Grid infiniteGrid fadeDistance={50} sectionColor="#475569" cellColor="#334155" />
          <ambientLight intensity={0.8} />

          {level.blocks.map((block) => (
            <mesh 
              key={block.id} 
              position={block.position} 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBlockId(block.id);
              }}
            >
              <boxGeometry args={block.size} />
              <meshStandardMaterial 
                color={block.color} 
                emissive={block.type === 'lava' ? block.color : '#000000'}
                emissiveIntensity={block.type === 'lava' ? 0.5 : 0}
                wireframe={selectedBlockId === block.id}
                transparent={selectedBlockId === block.id || block.type === 'ice'}
                opacity={selectedBlockId === block.id ? 0.8 : block.type === 'ice' ? 0.8 : 1}
                transmission={block.type === 'ice' ? 0.9 : 0}
                roughness={block.type === 'ice' ? 0.1 : 1}
              />
            </mesh>
          ))}
          <OrbitControls makeDefault />
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
          <button onClick={() => addBlock('lava')} className="bg-red-900 hover:bg-red-800 text-red-100 px-2 py-2 rounded text-xs font-bold col-span-1">+ LAVA</button>
          <button onClick={() => addBlock('win')} className="bg-emerald-900 hover:bg-emerald-800 text-emerald-100 px-2 py-2 rounded text-xs font-bold col-span-1">+ WIN PAD</button>
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
