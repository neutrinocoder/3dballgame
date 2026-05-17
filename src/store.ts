import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BlockType = 'platform' | 'lava' | 'win' | 'ice';

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
  deaths: number;
  addDeath: () => void;
  startTime: number;
  finishTime: number | null;
  startTimer: () => void;
  stopTimer: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  status: 'playing',
  setStatus: (status) => set({ status }),
  deaths: 0,
  addDeath: () => set((state) => ({ deaths: state.deaths + 1, status: 'dead' })),
  startTime: Date.now(),
  finishTime: null,
  startTimer: () => set({ startTime: Date.now(), finishTime: null }),
  stopTimer: () => set({ finishTime: Date.now() }),
  resetGame: () => set({ status: 'playing', finishTime: null, startTime: Date.now() })
}));

