import { CustomLevel } from './store';
import { v4 as uuidv4 } from 'uuid';

export const officialLevels: CustomLevel[] = [
  {
    id: 'showcase-level',
    name: 'The Ultimate Showcase',
    blocks: [
      // 1. START AREA
      { id: uuidv4(), position: [0, -1, 0], size: [10, 1, 10], type: 'platform', color: '#ffffff' },
      
      // 2. BASIC JUMPS (Gravity Jump force increased to 5.5, max gap is ~6-7 units flat)
      { id: uuidv4(), position: [0, -1, -12], size: [8, 1, 8], type: 'platform', color: '#ffffff' }, // Gap = 3
      { id: uuidv4(), position: [0, -3, -25], size: [6, 1, 6], type: 'platform', color: '#ffffff' }, // Drop 2 units, Gap = 6

      // CHECKPOINT 1
      { id: uuidv4(), position: [0, -2.5, -25], size: [6, 0.5, 6], type: 'checkpoint', color: '#00ff88' },

      // 3. MUD SECTION
      { id: uuidv4(), position: [0, -5, -35], size: [8, 1, 8], type: 'mud', color: '#8b4513' },
      { id: uuidv4(), position: [0, -5, -43], size: [4, 1, 4], type: 'mud', color: '#8b4513' }, // Mud gap 2
      { id: uuidv4(), position: [0, -5, -50], size: [6, 1, 6], type: 'platform', color: '#ffffff' }, // Mud to platform gap 3

      // CHECKPOINT 2
      { id: uuidv4(), position: [0, -4.5, -50], size: [6, 0.5, 6], type: 'checkpoint', color: '#00ff88' },

      // 4. ICE SLIDE & LAVA JUMP
      { id: uuidv4(), position: [0, -7, -65], size: [8, 1, 14], type: 'ice', color: '#00ffff' },
      // Lava trap on the ice slide. You must jump a 5 unit gap over the lava!
      { id: uuidv4(), position: [0, -7, -75], size: [8, 1, 4], type: 'lava', color: '#ff0000' },
      { id: uuidv4(), position: [0, -7, -81], size: [8, 1, 8], type: 'platform', color: '#ffffff' },

      // 5. SHIP FLIGHT SEQUENCE
      { id: uuidv4(), position: [0, -5, -89], size: [8, 8, 2], type: 'ship-portal', color: '#ff00ff' },
      { id: uuidv4(), position: [0, -20, -125], size: [100, 2, 100], type: 'lava', color: '#ff0000' },
      
      // MASSIVE BOUNDARY BOX
      { id: uuidv4(), position: [-25, 5, -125], size: [2, 50, 100], type: 'wall', color: '#ffffff' }, // Left Boundary
      { id: uuidv4(), position: [25, 5, -125], size: [2, 50, 100], type: 'wall', color: '#ffffff' },  // Right Boundary
      { id: uuidv4(), position: [0, 30, -125], size: [50, 2, 100], type: 'wall', color: '#ffffff' },  // Ceiling Boundary
      
      // Obstacle Wall 1
      { id: uuidv4(), position: [-15, 0, -105], size: [20, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [15, 0, -105], size: [20, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, 10, -105], size: [10, 10, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, -10, -105], size: [10, 10, 2], type: 'wall', color: '#ffffff' },
      
      // Obstacle Wall 2
      { id: uuidv4(), position: [-20, 5, -125], size: [30, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [20, 5, -125], size: [10, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, 15, -125], size: [10, 10, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, -5, -125], size: [10, 10, 2], type: 'wall', color: '#ffffff' },

      // Obstacle Wall 3
      { id: uuidv4(), position: [-15, -5, -145], size: [20, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [15, -5, -145], size: [20, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, 5, -145], size: [10, 10, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, -15, -145], size: [10, 10, 2], type: 'wall', color: '#ffffff' },

      // 6. SPHERE PORTAL
      { id: uuidv4(), position: [0, -5, -165], size: [8, 8, 2], type: 'sphere-portal', color: '#0000ff' },
      { id: uuidv4(), position: [0, -7, -170], size: [10, 1, 10], type: 'platform', color: '#ffffff' },

      // CHECKPOINT 3
      { id: uuidv4(), position: [0, -6.5, -170], size: [10, 0.5, 10], type: 'checkpoint', color: '#00ff88' },

      // 7. ANTI-GRAVITY SECTION
      // Go upside down!
      { id: uuidv4(), position: [0, -5, -180], size: [8, 8, 2], type: 'gravity-up-portal', color: '#ffff00' },
      
      // Upside down ceiling platforms (y = 0 or 2, we must jump UP towards the ceiling)
      // Since gravity pulls UP (y = 20), we fall to a higher Y value.
      { id: uuidv4(), position: [0, 5, -190], size: [8, 1, 8], type: 'platform', color: '#ffffff' },
      
      // Jump along ceiling
      { id: uuidv4(), position: [0, 5, -200], size: [6, 1, 6], type: 'platform', color: '#ffffff' },
      { id: uuidv4(), position: [0, 3, -215], size: [6, 1, 6], type: 'platform', color: '#ffffff' }, // Drop "up" to y=3

      // Return to normal gravity
      { id: uuidv4(), position: [0, 1, -225], size: [8, 8, 2], type: 'gravity-down-portal', color: '#00ff00' },
      
      // Fall down to final platform
      { id: uuidv4(), position: [0, -15, -235], size: [10, 1, 10], type: 'platform', color: '#ffffff' },

      // Final Jump
      { id: uuidv4(), position: [0, -15, -247], size: [8, 1, 8], type: 'win', color: '#ffff00' }
    ]
  }
];
