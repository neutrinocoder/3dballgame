import { useAppStore, useGameStore } from './store';
import { PlayScreen } from './components/PlayScreen';
import { Home } from './components/Home';
import { LevelEditor } from './components/LevelEditor';

export default function App() {
  const view = useAppStore((s) => s.view);

  return (
    <div className="w-full h-screen bg-slate-900 relative font-sans overflow-hidden">
      {view === 'home' && <Home />}
      {view === 'play' && <PlayScreen />}
      {view === 'editor' && <LevelEditor />}
    </div>
  );
}
