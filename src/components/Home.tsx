import { useAppStore, useGameStore } from '../store';
import { officialLevels } from '../officialLevels';

export function Home() {
  const setView = useAppStore(s => s.setView);
  const setCurrentLevelId = useAppStore(s => s.setCurrentLevelId);
  const customLevels = useAppStore(s => s.customLevels);
  const deleteCustomLevel = useAppStore(s => s.deleteCustomLevel);
  const resetGame = useGameStore(s => s.resetGame);

  const playLevel = (id: string | null) => {
    setCurrentLevelId(id);
    resetGame();
    setView('play');
  };

  const editLevel = (id?: string) => {
    setCurrentLevelId(id || null);
    setView('editor');
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 overflow-y-auto">
      <div className="max-w-2xl w-full p-8 space-y-8 my-auto">
        <h1 className="text-6xl font-black font-mono text-center text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600 tracking-tight">
          OBBY MAKER
        </h1>
        
        <div className="grid gap-4">
          <button 
            onClick={() => editLevel()}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-6 rounded-2xl text-xl shadow-lg transition-transform active:scale-95 border border-slate-600"
          >
            CREATE NEW LEVEL
          </button>
        </div>

        {officialLevels.length > 0 && (
          <div className="mt-12 space-y-4">
            <h2 className="text-2xl font-bold font-mono text-slate-300">OFFICIAL LEVELS ({officialLevels.length})</h2>
            <div className="grid gap-3">
              {officialLevels.map(level => (
                <div key={level.id} className="bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700">
                  <div>
                    <h3 className="text-xl font-bold text-white">{level.name}</h3>
                    <p className="text-sm text-slate-400">{level.blocks.length} blocks</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => playLevel(level.id)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold"
                    >
                      PLAY
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {customLevels.length > 0 && (
          <div className="mt-12 space-y-4">
            <h2 className="text-2xl font-bold font-mono text-slate-300">YOUR LEVELS ({customLevels.length})</h2>
            <div className="grid gap-3">
              {customLevels.map(level => (
                <div key={level.id} className="bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700">
                  <div>
                    <h3 className="text-xl font-bold text-white">{level.name}</h3>
                    <p className="text-sm text-slate-400">{level.blocks.length} blocks</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => playLevel(level.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded font-bold"
                    >
                      PLAY
                    </button>
                    <button 
                      onClick={() => editLevel(level.id)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-bold"
                    >
                      EDIT
                    </button>
                    <button 
                      onClick={() => deleteCustomLevel(level.id)}
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-bold"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
