import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BlockType = 'platform' | 'lava' | 'win' | 'ice' | 'mud' | 'trampoline-yellow' | 'trampoline-orange' | 'trampoline-red' | 'ship-portal' | 'sphere-portal' | 'ufo-portal' | 'wave-portal' | 'wall' | 'gravity-up-portal' | 'gravity-down-portal';

export type BackgroundTheme = 'sunny' | 'neon' | 'dark' | 'glow' | 'space';

export interface LevelBlock {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  type: BlockType;
  color: string;
  texture?: string;
}

export interface CustomLevel {
  id: string;
  name: string;
  backgroundTheme?: BackgroundTheme;
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
  playerShape: 'sphere' | 'ship' | 'ufo' | 'wave';
  setPlayerShape: (shape: 'sphere' | 'ship' | 'ufo' | 'wave') => void;
  deaths: number;
  addDeath: () => void;
  startTime: number;
  finishTime: number | null;
  gravityDirection: 1 | -1;
  setGravityDirection: (dir: 1 | -1) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetGame: () => void;
  fullResetGame: () => void;
  levelEndZ: number;
  setLevelEndZ: (z: number) => void;
  
  isPracticeMode: boolean;
  togglePracticeMode: () => void;
  checkpoints: Array<{ position: [number, number, number], shape: 'sphere' | 'ship' | 'ufo' | 'wave', gravity: 1 | -1, euler: [number, number, number] }>;
  addCheckpoint: (cp: { position: [number, number, number], shape: 'sphere' | 'ship' | 'ufo' | 'wave', gravity: 1 | -1, euler: [number, number, number] }) => void;
  removeLastCheckpoint: () => void;
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
  startTimer: () => set({ startTime: Date.now(), finishTime: null, deaths: 0 }),
  stopTimer: () => set({ finishTime: Date.now() }),
  resetGame: () => set((state) => {
    if (state.isPracticeMode && state.checkpoints.length > 0) {
      const lastCp = state.checkpoints[state.checkpoints.length - 1];
      return {
        status: 'playing',
        playerShape: lastCp.shape,
        gravityDirection: lastCp.gravity,
      };
    }
    return { 
      status: 'playing', 
      playerShape: 'sphere',
      gravityDirection: 1,
      finishTime: null,
      startTime: Date.now()
    };
  }),
  fullResetGame: () => set({ 
    status: 'playing', 
    finishTime: null, 
    startTime: Date.now(), 
    playerShape: 'sphere', 
    deaths: 0,
    gravityDirection: 1,
    isPracticeMode: false,
    checkpoints: []
  }),
  levelEndZ: 0,
  setLevelEndZ: (z) => set({ levelEndZ: z }),
  
  isPracticeMode: false,
  togglePracticeMode: () => set((state) => ({ 
    isPracticeMode: !state.isPracticeMode, 
    checkpoints: [] 
  })),
  checkpoints: [],
  addCheckpoint: (cp) => set((state) => ({ checkpoints: [...state.checkpoints, cp] })),
  removeLastCheckpoint: () => set((state) => ({ checkpoints: state.checkpoints.slice(0, -1) }))
}));

