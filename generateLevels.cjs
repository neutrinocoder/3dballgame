const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function b(type, pos, size, color, texture) {
  const block = { id: uuidv4(), position: pos, size: size, type: type, color: color };
  if (texture) block.texture = texture;
  return block;
}

const levels = [];

// LEVEL 1: Sunny Jumps (Grass/Dirt)
levels.push({
  id: 'level-1',
  name: 'Level 1: Basic Boot Camp',
  backgroundTheme: 'sunny',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'grass'),
    b('platform', [0, 0, -12], [8, 1, 8], '#cbd5e1', 'grass'),
    b('mud', [0, 0, -22], [8, 1, 8], '#78350f', 'dirt'),
    b('platform', [0, 0, -32], [6, 1, 6], '#cbd5e1', 'grass'),
    b('mud', [0, 0, -42], [4, 1, 4], '#78350f', 'dirt'),
    b('platform', [0, 0, -52], [4, 1, 4], '#cbd5e1', 'grass'),
    b('win', [0, 0, -62], [8, 1, 8], '#10b981', 'grass')
  ]
});

// LEVEL 2: Slippery Slopes (Ice)
levels.push({
  id: 'level-2',
  name: 'Level 2: Frictionless',
  backgroundTheme: 'dark',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'stone_tile'),
    b('ice', [0, -2, -15], [8, 1, 15], '#67e8f9', 'ice'),
    b('platform', [0, -4, -30], [6, 1, 6], '#cbd5e1', 'stone_tile'),
    b('ice', [0, -6, -42], [6, 1, 12], '#67e8f9', 'ice'),
    b('ice', [5, -8, -55], [6, 1, 10], '#67e8f9', 'ice'),
    b('ice', [-5, -10, -68], [6, 1, 10], '#67e8f9', 'ice'),
    b('win', [0, -12, -80], [8, 1, 8], '#10b981', 'neon_grid')
  ]
});

// LEVEL 3: The Floor is Lava (Lava)
levels.push({
  id: 'level-3',
  name: 'Level 3: Heatwave',
  backgroundTheme: 'glow',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'rusty_iron'),
    b('lava', [0, -2, -12], [20, 2, 8], '#ef4444', 'lava'),
    b('platform', [0, 0, -20], [6, 1, 6], '#cbd5e1', 'rusty_iron'),
    b('lava', [0, -2, -32], [20, 2, 12], '#ef4444', 'lava'),
    b('platform', [0, 0, -42], [4, 1, 4], '#cbd5e1', 'rusty_iron'),
    b('lava', [0, -2, -54], [20, 2, 16], '#ef4444', 'lava'),
    b('win', [0, 0, -66], [8, 1, 8], '#10b981', 'neon_grid')
  ]
});

// LEVEL 4: Gravity Flip (Neon)
levels.push({
  id: 'level-4',
  name: 'Level 4: Inversion',
  backgroundTheme: 'neon',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'neon_grid'),
    b('gravity-up-portal', [0, 3, -10], [8, 8, 2], '#eab308'),
    b('platform', [0, 10, -18], [8, 1, 8], '#cbd5e1', 'neon_grid'),
    b('lava', [0, 8, -28], [12, 1, 8], '#ef4444', 'lava'),
    b('platform', [0, 10, -38], [6, 1, 6], '#cbd5e1', 'neon_grid'),
    b('gravity-down-portal', [0, 5, -48], [8, 8, 2], '#22c55e'),
    b('platform', [0, -2, -56], [8, 1, 8], '#cbd5e1', 'neon_grid'),
    b('win', [0, -2, -68], [8, 1, 8], '#10b981', 'neon_grid')
  ]
});

// LEVEL 5: UFO Cave (Dark)
levels.push({
  id: 'level-5',
  name: 'Level 5: Claustrophobia',
  backgroundTheme: 'dark',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'stone_tile'),
    b('ufo-portal', [0, 3, -10], [8, 8, 2], '#f97316'),
    // Cave walls
    b('lava', [0, -5, -35], [20, 2, 40], '#ef4444', 'lava'), // floor
    b('wall', [0, 15, -35], [20, 2, 40], '#94a3b8', 'stone_tile'), // ceiling
    // Obstacles
    b('wall', [0, 10, -20], [20, 10, 2], '#94a3b8', 'stone_tile'), // high pipe
    b('wall', [0, -2, -30], [20, 10, 2], '#94a3b8', 'stone_tile'), // low pipe
    b('wall', [0, 10, -40], [20, 10, 2], '#94a3b8', 'stone_tile'), // high pipe
    b('sphere-portal', [0, 5, -50], [8, 8, 2], '#3b82f6'),
    b('platform', [0, 0, -60], [10, 1, 10], '#cbd5e1', 'stone_tile'),
    b('win', [0, 0, -72], [8, 1, 8], '#10b981', 'neon_grid')
  ]
});

// LEVEL 6: Ship Run (Space)
levels.push({
  id: 'level-6',
  name: 'Level 6: Trench Run',
  backgroundTheme: 'space',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'sci_fi_metal'),
    b('ship-portal', [0, 3, -10], [8, 8, 2], '#a855f7'),
    b('lava', [0, -15, -50], [30, 2, 80], '#ef4444', 'lava'),
    
    // Narrow gaps
    b('wall', [-10, 0, -30], [15, 30, 2], '#93c5fd', 'glass'),
    b('wall', [15, 0, -30], [25, 30, 2], '#93c5fd', 'glass'), // gap at x=2
    
    b('wall', [10, 0, -50], [15, 30, 2], '#93c5fd', 'glass'),
    b('wall', [-15, 0, -50], [25, 30, 2], '#93c5fd', 'glass'), // gap at x=-2
    
    b('wall', [0, 10, -70], [30, 20, 2], '#93c5fd', 'glass'),
    b('wall', [0, -10, -70], [30, 15, 2], '#93c5fd', 'glass'), // gap in vertical middle
    
    b('sphere-portal', [0, 0, -85], [8, 8, 2], '#3b82f6'),
    b('platform', [0, -3, -95], [10, 1, 10], '#cbd5e1', 'sci_fi_metal'),
    b('win', [0, -3, -107], [8, 1, 8], '#10b981', 'neon_grid')
  ]
});

// LEVEL 7: The Swamp (Sunny)
levels.push({
  id: 'level-7',
  name: 'Level 7: Sinking Sand',
  backgroundTheme: 'sunny',
  blocks: [
    b('mud', [0, 0, 0], [10, 1, 10], '#78350f', 'dirt'),
    b('mud', [0, 0, -8], [6, 1, 6], '#78350f', 'dirt'),
    b('mud', [0, 0, -15], [4, 1, 4], '#78350f', 'dirt'),
    b('mud', [3, 0, -21], [3, 1, 3], '#78350f', 'dirt'),
    b('mud', [-3, 0, -27], [3, 1, 3], '#78350f', 'dirt'),
    b('mud', [0, 0, -33], [2, 1, 2], '#78350f', 'dirt'),
    b('win', [0, 0, -41], [8, 1, 8], '#10b981', 'grass')
  ]
});

// LEVEL 8: Mixed Modes (Neon)
levels.push({
  id: 'level-8',
  name: 'Level 8: Shape Shifter',
  backgroundTheme: 'neon',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'neon_grid'),
    b('ufo-portal', [0, 3, -10], [8, 8, 2], '#f97316'),
    b('lava', [0, -10, -35], [20, 2, 50], '#ef4444', 'lava'),
    b('wall', [0, 10, -25], [20, 10, 2], '#94a3b8', 'glass'), // Jump over lava as ufo
    b('ship-portal', [0, 5, -35], [8, 8, 2], '#a855f7'), // Convert to ship mid air
    b('wall', [-10, 5, -45], [15, 20, 2], '#94a3b8', 'glass'), 
    b('wall', [15, 5, -45], [25, 20, 2], '#94a3b8', 'glass'), // Ship gap
    b('sphere-portal', [2, 5, -55], [8, 8, 2], '#3b82f6'), // Convert to sphere
    b('platform', [2, 2, -65], [6, 1, 6], '#cbd5e1', 'neon_grid'),
    b('win', [2, 2, -75], [8, 1, 8], '#10b981', 'neon_grid')
  ]
});

// LEVEL 9: The Upside Down (Space)
levels.push({
  id: 'level-9',
  name: 'Level 9: Ceiling Walk',
  backgroundTheme: 'space',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'sci_fi_metal'),
    b('gravity-up-portal', [0, 3, -10], [8, 8, 2], '#eab308'),
    b('ice', [0, 10, -20], [8, 1, 15], '#67e8f9', 'ice'),
    b('lava', [0, 8, -35], [20, 2, 10], '#ef4444', 'lava'), // Lava on ceiling
    b('platform', [0, 10, -45], [6, 1, 6], '#cbd5e1', 'sci_fi_metal'),
    b('lava', [0, -2, -55], [20, 2, 10], '#ef4444', 'lava'), // Lava on floor
    b('gravity-down-portal', [0, 5, -55], [8, 8, 2], '#22c55e'), // Flip down over lava
    b('platform', [0, 0, -65], [8, 1, 8], '#cbd5e1', 'sci_fi_metal'),
    b('win', [0, 0, -75], [8, 1, 8], '#10b981', 'neon_grid')
  ]
});

// LEVEL 10: The Ultimate Gauntlet (Glow)
levels.push({
  id: 'level-10',
  name: 'Level 10: The Gauntlet',
  backgroundTheme: 'glow',
  blocks: [
    b('platform', [0, 0, 0], [10, 1, 10], '#cbd5e1', 'stone_tile'),
    b('mud', [0, 0, -10], [6, 1, 6], '#78350f', 'dirt'),
    b('ice', [0, -2, -22], [8, 1, 12], '#67e8f9', 'ice'), // Slide from mud to ice
    b('gravity-up-portal', [0, 0, -35], [8, 8, 2], '#eab308'), // Launch off ice into portal
    b('platform', [0, 10, -45], [8, 1, 8], '#cbd5e1', 'stone_tile'),
    b('ufo-portal', [0, 6, -55], [8, 8, 2], '#f97316'), // Drop from ceiling into UFO
    b('lava', [0, -10, -75], [20, 2, 40], '#ef4444', 'lava'),
    b('wall', [0, 10, -65], [20, 20, 2], '#94a3b8', 'glass'), // UFO pipe
    b('wall', [0, -2, -75], [20, 15, 2], '#94a3b8', 'glass'), // UFO pipe
    b('ship-portal', [0, 5, -85], [8, 8, 2], '#a855f7'), // Quick switch to ship
    b('wall', [-12, 5, -100], [20, 20, 2], '#94a3b8', 'glass'), // Ship gap right
    b('sphere-portal', [8, 5, -115], [8, 8, 2], '#3b82f6'),
    b('platform', [8, 2, -125], [10, 1, 10], '#cbd5e1', 'stone_tile'),
    b('win', [8, 2, -137], [8, 1, 8], '#10b981', 'neon_grid')
  ]
});

// Write to officialLevels.ts
const fsContent = fs.readFileSync('./src/officialLevels.ts', 'utf8');
const match = fsContent.match(/export const officialLevels: CustomLevel\[\] = \[([\s\S]+?)\];/);

if (match) {
  let existingContent = match[1];
  let jsonString = JSON.stringify(levels, null, 2);
  jsonString = jsonString.slice(1, -1); // remove [ and ]
  const newContent = fsContent.replace(match[0], `export const officialLevels: CustomLevel[] = [${existingContent},${jsonString}];`);
  fs.writeFileSync('./src/officialLevels.ts', newContent);
  console.log("Successfully added 10 levels!");
} else {
  console.error("Could not parse officialLevels.ts");
}
