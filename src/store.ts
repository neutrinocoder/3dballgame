import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BlockType = 'platform' | 'lava' | 'win' | 'ice' | 'mud' | 'ship-portal' | 'sphere-portal' | 'wall' | 'checkpoint' | 'gravity-up-portal' | 'gravity-down-portal';

export interface LevelBlock {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  type: BlockType;
  color: string;
}

export interface CustomLevel {
  id: string;
  name: string;
  blocks: LevelBlock[];
}

interface AppState {
  view: 'home' | 'play' | 'editor';
  setView: (view: 'home' | 'play' | 'editor') => void;
  currentLevelId: string | null;
  setCurrentLevelId: (id: string | null) => void;
  customLevels: CustomLevel[];
  saveCustomLevel: (level: CustomLevel) => void;
  deleteCustomLevel: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      view: 'home',
      setView: (view) => set({ view }),
      currentLevelId: null,
      setCurrentLevelId: (id) => set({ currentLevelId: id }),
      customLevels: [],
      saveCustomLevel: (level) => set((state) => {
        const index = state.customLevels.findIndex((l) => l.id === level.id);
        if (index >= 0) {
          const newLevels = [...state.customLevels];
          newLevels[index] = level;
          return { customLevels: newLevels };
        }
        return { customLevels: [...state.customLevels, level] };
      }),
      deleteCustomLevel: (id) => set((state) => ({ customLevels: state.customLevels.filter(l => l.id !== id) }))
    }),
    {
      name: 'obby-custom-levels',
    }
  )
);

interface GameState {
  status: 'playing' | 'dead' | 'won';
  setStatus: (status: 'playing' | 'dead' | 'won') => void;
  playerShape: 'sphere' | 'ship';
  setPlayerShape: (shape: 'sphere' | 'ship') => void;
  deaths: number;
  addDeath: () => void;
  startTime: number;
  finishTime: number | null;
  gravityDirection: 1 | -1;
  setGravityDirection: (dir: 1 | -1) => void;
  currentCheckpoint: { position: [number, number, number], gravity: 1 | -1 };
  setCheckpoint: (position: [number, number, number], gravity: 1 | -1) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetGame: () => void;
  fullResetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  status: 'playing',
  setStatus: (status) => set({ status }),
  playerShape: 'sphere',
  setPlayerShape: (shape) => set({ playerShape: shape }),
  deaths: 0,
  addDeath: () => set((state) => ({ deaths: state.deaths + 1, status: 'dead', playerShape: 'sphere' })),
  startTime: Date.now(),
  finishTime: null,
  gravityDirection: 1,
  setGravityDirection: (dir) => set({ gravityDirection: dir }),
  currentCheckpoint: { position: [0, 1, 0], gravity: 1 },
  setCheckpoint: (position, gravity) => set({ currentCheckpoint: { position, gravity } }),
  startTimer: () => set({ startTime: Date.now(), finishTime: null, deaths: 0 }),
  stopTimer: () => set({ finishTime: Date.now() }),
  // Respawn at checkpoint
  resetGame: () => set((state) => ({ 
    status: 'playing', 
    playerShape: 'sphere',
    gravityDirection: state.currentCheckpoint.gravity 
  })),
  // Completely restart level
  fullResetGame: () => set({ 
    status: 'playing', 
    finishTime: null, 
    startTime: Date.now(), 
    playerShape: 'sphere', 
    deaths: 0,
    gravityDirection: 1,
    currentCheckpoint: { position: [0, 1, 0], gravity: 1 }
  })
}));

