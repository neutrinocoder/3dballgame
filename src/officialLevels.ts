import { CustomLevel } from './store';
import { v4 as uuidv4 } from 'uuid';

export const officialLevels: CustomLevel[] = [
  {
    id: 'showcase-level',
    name: 'The Ultimate Showcase',
    blocks: [
      // 1. START AREA
      { id: uuidv4(), position: [0, -1, 0], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' },
      
      // 2. BASIC JUMPS (Gravity Jump force is 5.5)
      { id: uuidv4(), position: [0, -1, -12], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, -3, -25], size: [6, 1, 6], type: 'platform', color: '#cbd5e1' },

      // 3. MUD SECTION
      { id: uuidv4(), position: [0, -5, -35], size: [8, 1, 8], type: 'mud', color: '#78350f' },
      { id: uuidv4(), position: [0, -5, -43], size: [4, 1, 4], type: 'mud', color: '#78350f' },
      { id: uuidv4(), position: [0, -5, -50], size: [6, 1, 6], type: 'platform', color: '#cbd5e1' },

      // 4. ICE SLIDE & LAVA JUMP
      { id: uuidv4(), position: [0, -7, -65], size: [8, 1, 14], type: 'ice', color: '#67e8f9' },
      // Lava trap on the ice slide
      { id: uuidv4(), position: [0, -7, -75], size: [8, 1, 4], type: 'lava', color: '#ef4444' },
      { id: uuidv4(), position: [0, -7, -81], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' },

      // 5. SHIP FLIGHT SEQUENCE
      { id: uuidv4(), position: [0, -5, -89], size: [8, 8, 2], type: 'ship-portal', color: '#a855f7' },
      { id: uuidv4(), position: [0, -20, -125], size: [100, 2, 100], type: 'lava', color: '#ef4444' },
      
      // MASSIVE BOUNDARY BOX
      { id: uuidv4(), position: [-25, 5, -125], size: [2, 50, 100], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [25, 5, -125], size: [2, 50, 100], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, 30, -125], size: [50, 2, 100], type: 'wall', color: '#94a3b8' },
      
      // Obstacle Wall 1
      { id: uuidv4(), position: [-15, 0, -105], size: [20, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [15, 0, -105], size: [20, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, 10, -105], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, -10, -105], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      
      // Obstacle Wall 2
      { id: uuidv4(), position: [-20, 5, -125], size: [30, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [20, 5, -125], size: [10, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, 15, -125], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, -5, -125], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },

      // Obstacle Wall 3
      { id: uuidv4(), position: [-15, -5, -145], size: [20, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [15, -5, -145], size: [20, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, 5, -145], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, -15, -145], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },

      // 6. SPHERE PORTAL
      { id: uuidv4(), position: [0, -5, -165], size: [8, 8, 2], type: 'sphere-portal', color: '#3b82f6' },
      { id: uuidv4(), position: [0, -7, -170], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' },

      // 7. ANTI-GRAVITY SECTION
      // Go upside down!
      { id: uuidv4(), position: [0, -5, -180], size: [8, 8, 2], type: 'gravity-up-portal', color: '#eab308' },
      
      // Upside down ceiling platforms (y = 5, gravity pulls UP so we land on bottom of platform)
      { id: uuidv4(), position: [0, 5, -185], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' },
      
      // Jump along ceiling (gap of 3 units, jump towards y=0)
      { id: uuidv4(), position: [0, 5, -196], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' },
      
      // Walk off edge and "drop" up to y=12
      { id: uuidv4(), position: [0, 12, -206], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' }, 

      // Return to normal gravity
      { id: uuidv4(), position: [0, 10, -216], size: [8, 8, 2], type: 'gravity-down-portal', color: '#22c55e' },
      
      // Fall down to final platform
      { id: uuidv4(), position: [0, -5, -226], size: [10, 1, 15], type: 'platform', color: '#cbd5e1' },

      // Final Jump
      { id: uuidv4(), position: [0, -5, -238], size: [8, 1, 8], type: 'win', color: '#10b981' }
    ]
  }
];
