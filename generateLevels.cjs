const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const levels = [];

// --- SHOWCASE LEVEL ---
levels.push({
  id: 'showcase-level',
  name: 'The Ultimate Showcase',
  blocks: [
      { id: uuidv4(), position: [0, -1, 0], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, -1, -12], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, -3, -25], size: [6, 1, 6], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, -5, -35], size: [8, 1, 8], type: 'mud', color: '#78350f' },
      { id: uuidv4(), position: [0, -5, -43], size: [4, 1, 4], type: 'mud', color: '#78350f' },
      { id: uuidv4(), position: [0, -5, -50], size: [6, 1, 6], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, -7, -65], size: [8, 1, 14], type: 'ice', color: '#67e8f9' },
      { id: uuidv4(), position: [0, -7, -75], size: [8, 1, 4], type: 'lava', color: '#ef4444' },
      { id: uuidv4(), position: [0, -7, -81], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, -5, -89], size: [8, 8, 2], type: 'ship-portal', color: '#a855f7' },
      { id: uuidv4(), position: [0, -20, -125], size: [100, 2, 100], type: 'lava', color: '#ef4444' },
      { id: uuidv4(), position: [-25, 5, -125], size: [2, 50, 100], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [25, 5, -125], size: [2, 50, 100], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, 30, -125], size: [50, 2, 100], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [-15, 0, -105], size: [20, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [15, 0, -105], size: [20, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, 10, -105], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, -10, -105], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [-20, 5, -125], size: [30, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [20, 5, -125], size: [10, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, 15, -125], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, -5, -125], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [-15, -5, -145], size: [20, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [15, -5, -145], size: [20, 30, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, 5, -145], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, -15, -145], size: [10, 10, 2], type: 'wall', color: '#94a3b8' },
      { id: uuidv4(), position: [0, -5, -165], size: [8, 8, 2], type: 'sphere-portal', color: '#3b82f6' },
      { id: uuidv4(), position: [0, -7, -170], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, -5, -180], size: [8, 8, 2], type: 'gravity-up-portal', color: '#eab308' },
      { id: uuidv4(), position: [0, 5, -185], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, 5, -196], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, 12, -206], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' }, 
      { id: uuidv4(), position: [0, 10, -216], size: [8, 8, 2], type: 'gravity-down-portal', color: '#22c55e' },
      { id: uuidv4(), position: [0, -5, -226], size: [10, 1, 15], type: 'platform', color: '#cbd5e1' },
      { id: uuidv4(), position: [0, -5, -238], size: [8, 1, 8], type: 'win', color: '#10b981' }
  ]
});

// --- GENERATOR LOGIC ---
const PRNG = (seed) => {
  let s = seed;
  return () => {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
};

for (let i = 1; i <= 20; i++) {
  const blocks = [];
  let z = 0;
  let y = -1;
  const rand = PRNG(i * 12345);
  
  // Difficulty goes from 0.0 to 1.0
  const difficulty = (i - 1) / 19;
  
  // Start pad
  blocks.push({ id: uuidv4(), position: [0, y, z], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' });
  z -= 10;

  const numChallenges = 2 + Math.floor(difficulty * 6);
  
  for (let c = 0; c < numChallenges; c++) {
    const available = ['gap'];
    if (i >= 4) available.push('mud');
    if (i >= 7) available.push('ice');
    if (i >= 10) available.push('lava');
    if (i >= 13) available.push('ship');
    if (i >= 16) available.push('gravity');
    
    const type = available[Math.floor(rand() * available.length)];
    
    if (type === 'gap') {
      const gap = 3 + difficulty * 2.5; // Max 5.5
      z -= gap + 4;
      if (rand() > 0.5) y -= (1 + difficulty * 2); // Drop down
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' });
      z -= 4;
    } 
    else if (type === 'mud') {
      const mudGap = 1.5 + difficulty * 0.8; // Max 2.3
      z -= 4;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 8], type: 'mud', color: '#78350f' });
      z -= 4 + mudGap;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' });
      z -= 4;
    }
    else if (type === 'ice') {
      z -= 6;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 12], type: 'ice', color: '#67e8f9' });
      z -= 6;
      const iceGap = 4 + difficulty * 2; // Max 6
      z -= iceGap + 4;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' });
      z -= 4;
    }
    else if (type === 'lava') {
      z -= 4;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 4], type: 'lava', color: '#ef4444' });
      const lavaGap = 2 + difficulty * 3; // Max 5
      z -= lavaGap + 4;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' });
      z -= 4;
    }
    else if (type === 'ship') {
      z -= 4;
      y += 2;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 8, 2], type: 'ship-portal', color: '#a855f7' });
      z -= 4;
      
      const corridorLength = 40 + difficulty * 40;
      
      // Lava floor
      blocks.push({ id: uuidv4(), position: [0, y - 10, z - corridorLength/2], size: [60, 2, corridorLength], type: 'lava', color: '#ef4444' });
      
      // Add random walls
      for(let w = 0; w < 2 + difficulty * 4; w++) {
         const wz = z - 10 - rand() * (corridorLength - 20);
         const wy = y - 5 + rand() * 10;
         const wx = -10 + rand() * 20;
         blocks.push({ id: uuidv4(), position: [wx, wy, wz], size: [10, 10, 2], type: 'wall', color: '#94a3b8' });
      }
      
      z -= corridorLength;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 8, 2], type: 'sphere-portal', color: '#3b82f6' });
      z -= 4;
      y -= 2;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' });
      z -= 5;
    }
    else if (type === 'gravity') {
      z -= 4;
      y += 2;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 8, 2], type: 'gravity-up-portal', color: '#eab308' });
      z -= 4;
      
      // Ceiling platforms
      y += 10;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' });
      z -= 4;
      
      const gravGap = 2 + difficulty * 2.5; // Max 4.5
      z -= gravGap + 4;
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 8], type: 'platform', color: '#cbd5e1' });
      z -= 4;
      
      // Return to normal
      y -= 5; // Portal in middle
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 8, 2], type: 'gravity-down-portal', color: '#22c55e' });
      z -= 4;
      y -= 5; // Back to floor
      blocks.push({ id: uuidv4(), position: [0, y, z], size: [10, 1, 10], type: 'platform', color: '#cbd5e1' });
      z -= 5;
    }
  }

  // Win pad
  const finalGap = 4 + difficulty * 2;
  z -= finalGap + 4;
  blocks.push({ id: uuidv4(), position: [0, y, z], size: [8, 1, 8], type: 'win', color: '#10b981' });

  levels.push({
    id: `level-${i}`,
    name: `Level ${i}`,
    blocks
  });
}

const fileContent = `import { CustomLevel } from './store';

export const officialLevels: CustomLevel[] = ${JSON.stringify(levels, null, 2)};
`;

fs.writeFileSync('src/officialLevels.ts', fileContent);
console.log('Successfully generated 20 levels!');
