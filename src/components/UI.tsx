import { useAppStore, useGameStore } from '../store';
import { useEffect } from 'react';

export function UI() {
  const status = useGameStore((s) => s.status);
  const deaths = useGameStore((s) => s.deaths);
  const resetGame = useGameStore((s) => s.resetGame);
  const startTime = useGameStore((s) => s.startTime);
  const finishTime = useGameStore((s) => s.finishTime);
  const isPracticeMode = useGameStore((s) => s.isPracticeMode);
  const togglePracticeMode = useGameStore((s) => s.togglePracticeMode);
  const setView = useAppStore((s) => s.setView);

  const timeToDisplay = finishTime ? (finishTime - startTime) / 1000 : 0;

  const handleMenu = () => {
    resetGame();
    setView('home');
  };



  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r') {
        resetGame();
      } else if (e.key.toLowerCase() === 'p') {
        togglePracticeMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetGame, togglePracticeMode]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-10">
      <div className="flex justify-between items-start text-white mix-blend-difference drop-shadow-md">
        <div>
          <h1 className="text-3xl font-bold font-mono tracking-wider">OBBY RUN</h1>
          <p className="font-mono text-sm mt-1 opacity-80 uppercase tracking-widest">
            WASD: Move / Space: Jump / R: Restart / P: Practice
          </p>
          {isPracticeMode && (
            <div className="mt-2 inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 rounded text-xs font-bold tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.3)] animate-pulse">
              PRACTICE MODE (Z: Place CP, X: Remove CP)
            </div>
          )}
          <button 
            onClick={handleMenu}
            className="mt-4 pointer-events-auto px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white rounded text-sm tracking-widest"
          >
            ← MENU
          </button>
        </div>
        <div className="text-right">
          <p className="text-xl font-mono opacity-90 uppercase tracking-wider">
            DEATHS: <span className="font-bold">{deaths}</span>
          </p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-3 bg-black/40 backdrop-blur rounded-full overflow-hidden border border-white/20 shadow-lg">
        <div id="progress-bar-fill" className="h-full bg-emerald-400 w-0 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
      </div>

      {status === 'dead' && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/40 backdrop-blur-sm pointer-events-auto transition-all animate-in fade-in duration-300">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700/50 text-center shadow-2xl min-w-[300px]">
             <h2 className="text-4xl justify-center tracking-tight font-bold text-red-500 mb-6 drop-shadow-lg">
               YOU FELL!
             </h2>
             <button
               onClick={resetGame}
               className="w-full px-6 py-4 bg-white text-slate-900 text-lg font-bold rounded-xl hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-slate-400 mb-4"
             >
               RESPAWN
             </button>
             <button onClick={handleMenu} className="w-full px-4 py-2 text-slate-400 hover:text-white transition-colors">
               RETURN TO MENU
             </button>
          </div>
        </div>
      )}

      {status === 'won' && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-900/40 backdrop-blur-sm pointer-events-auto transition-all animate-in fade-in zoom-in duration-500">
          <div className="bg-slate-900 p-10 rounded-3xl border border-slate-700/50 text-center shadow-2xl min-w-[350px]">
            <h2 className="text-4xl font-bold text-emerald-400 mb-3 drop-shadow-lg tracking-tight">
              COURSE CLEARED!
            </h2>
            <p className="text-slate-300 mb-8 font-mono text-xl">
              Time: {timeToDisplay.toFixed(2)}s
            </p>
            <button
               onClick={resetGame}
               className="w-full px-6 py-4 bg-emerald-500 text-white text-lg font-bold rounded-xl hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-emerald-700 shadow-md shadow-emerald-500/20 mb-4"
             >
               PLAY AGAIN
             </button>
             <button onClick={handleMenu} className="w-full px-4 py-2 text-slate-400 hover:text-white transition-colors">
               RETURN TO MENU
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
