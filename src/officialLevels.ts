import { CustomLevel } from './store';
import { v4 as uuidv4 } from 'uuid';

export const officialLevels: CustomLevel[] = [
  {
    id: 'showcase-level',
    name: 'The Ultimate Showcase',
    blocks: [
      // 1. START AREA
      { id: uuidv4(), position: [0, -1, 0], size: [10, 1, 10], type: 'platform', color: '#94a3b8' },
      
      // 2. BASIC JUMPS
      // Heavy gravity limits flat jumps to ~5.4 units!
      { id: uuidv4(), position: [0, -1, -12], size: [8, 1, 8], type: 'platform', color: '#94a3b8' }, // 3 unit gap
      
      // Jumping DOWN allows for more horizontal distance
      { id: uuidv4(), position: [0, -3, -25], size: [6, 1, 6], type: 'platform', color: '#94a3b8' }, // Drop 2 units, 6 unit gap

      // 3. MUD SECTION
      // Mud kills momentum. Max flat jump is now ~1 unit!
      { id: uuidv4(), position: [0, -5, -35], size: [8, 1, 8], type: 'mud', color: '#78350f' },
      { id: uuidv4(), position: [0, -5, -42], size: [4, 1, 4], type: 'mud', color: '#78350f' }, // 1 unit gap
      { id: uuidv4(), position: [0, -5, -47], size: [4, 1, 4], type: 'platform', color: '#94a3b8' }, // 1 unit gap to escape

      // 4. ICE SLIDE & LAVA JUMP
      { id: uuidv4(), position: [0, -7, -60], size: [8, 1, 14], type: 'ice', color: '#bae6fd' },
      
      // Lava trap on the ice slide. You must jump a 5 unit gap over the lava!
      { id: uuidv4(), position: [0, -7, -70], size: [8, 1, 4], type: 'lava', color: '#ef4444' },
      { id: uuidv4(), position: [0, -7, -76], size: [8, 1, 8], type: 'platform', color: '#94a3b8' },

      // 5. SHIP FLIGHT SEQUENCE
      { id: uuidv4(), position: [0, -5, -84], size: [8, 8, 2], type: 'ship-portal', color: '#a855f7' },
      { id: uuidv4(), position: [0, -20, -120], size: [100, 2, 100], type: 'lava', color: '#ef4444' },

      // MASSIVE BOUNDARY BOX (Prevents flying around the obstacle course)
      { id: uuidv4(), position: [-25, 5, -120], size: [2, 50, 100], type: 'wall', color: '#ffffff' }, // Left Boundary
      { id: uuidv4(), position: [25, 5, -120], size: [2, 50, 100], type: 'wall', color: '#ffffff' },  // Right Boundary
      { id: uuidv4(), position: [0, 30, -120], size: [50, 2, 100], type: 'wall', color: '#ffffff' },  // Ceiling Boundary
      
      // Obstacle Wall 1
      { id: uuidv4(), position: [-15, 0, -100], size: [20, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [15, 0, -100], size: [20, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, 10, -100], size: [10, 10, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, -10, -100], size: [10, 10, 2], type: 'wall', color: '#ffffff' },
      
      // Obstacle Wall 2
      { id: uuidv4(), position: [-20, 5, -120], size: [30, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [20, 5, -120], size: [10, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, 15, -120], size: [10, 10, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, -5, -120], size: [10, 10, 2], type: 'wall', color: '#ffffff' },

      // Obstacle Wall 3
      { id: uuidv4(), position: [-15, -5, -140], size: [20, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [15, -5, -140], size: [20, 30, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, 5, -140], size: [10, 10, 2], type: 'wall', color: '#ffffff' },
      { id: uuidv4(), position: [0, -15, -140], size: [10, 10, 2], type: 'wall', color: '#ffffff' },

      // 6. SPHERE PORTAL & FINISH
      { id: uuidv4(), position: [0, -5, -160], size: [8, 8, 2], type: 'sphere-portal', color: '#3b82f6' },
      { id: uuidv4(), position: [0, -7, -165], size: [10, 1, 10], type: 'platform', color: '#94a3b8' },
      
      // Final Jump
      { id: uuidv4(), position: [0, -7, -177], size: [8, 1, 8], type: 'win', color: '#fbbf24' }
    ]
  }
];
