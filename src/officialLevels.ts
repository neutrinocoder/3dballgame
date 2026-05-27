import { CustomLevel } from './store';
import { v4 as uuidv4 } from 'uuid';

export const officialLevels: CustomLevel[] = [
  {
    id: 'showcase-level',
    name: 'The Ultimate Showcase',
    backgroundTheme: 'glow',
    blocks: [
      // 1. START AREA
      { id: uuidv4(), position: [0, -1, 0], size: [10, 1, 10], type: 'platform', color: '#cbd5e1', texture: 'wooden_crate' },
      
      // 2. BASIC JUMPS (Gravity Jump force is 5.5)
      { id: uuidv4(), position: [0, -1, -12], size: [8, 1, 8], type: 'platform', color: '#cbd5e1', texture: 'rusty_iron' },
      { id: uuidv4(), position: [0, -3, -25], size: [6, 1, 6], type: 'platform', color: '#cbd5e1', texture: 'wooden_crate' },

      // 3. MUD SECTION
      { id: uuidv4(), position: [0, -5, -35], size: [8, 1, 8], type: 'mud', color: '#78350f', texture: 'dirt' },
      { id: uuidv4(), position: [0, -5, -43], size: [4, 1, 4], type: 'mud', color: '#78350f', texture: 'dirt' },
      { id: uuidv4(), position: [0, -5, -50], size: [6, 1, 6], type: 'platform', color: '#cbd5e1', texture: 'grass' },

      // 4. ICE SLIDE & LAVA JUMP
      { id: uuidv4(), position: [0, -7, -65], size: [8, 1, 14], type: 'ice', color: '#67e8f9', texture: 'ice' },
      // Lava trap on the ice slide
      { id: uuidv4(), position: [0, -7, -75], size: [8, 1, 4], type: 'lava', color: '#ef4444' },
      { id: uuidv4(), position: [0, -7, -81], size: [8, 1, 8], type: 'platform', color: '#cbd5e1', texture: 'stone_tile' },

      // 5. SHIP FLIGHT SEQUENCE
      { id: uuidv4(), position: [0, -5, -89], size: [8, 8, 2], type: 'ship-portal', color: '#a855f7' },
      { id: uuidv4(), position: [0, -20, -125], size: [100, 2, 100], type: 'lava', color: '#ef4444' },
      
      // MASSIVE BOUNDARY BOX
      { id: uuidv4(), position: [-25, 5, -125], size: [2, 50, 100], type: 'wall', color: '#93c5fd', texture: 'glass' },
      { id: uuidv4(), position: [25, 5, -125], size: [2, 50, 100], type: 'wall', color: '#93c5fd', texture: 'glass' },
      { id: uuidv4(), position: [0, 30, -125], size: [50, 2, 100], type: 'wall', color: '#93c5fd', texture: 'glass' },
      
      // Obstacle Wall 1
      { id: uuidv4(), position: [-15, 0, -105], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [15, 0, -105], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [0, 10, -105], size: [10, 10, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [0, -10, -105], size: [10, 10, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      
      // Obstacle Wall 2
      { id: uuidv4(), position: [-20, 5, -125], size: [30, 30, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [20, 5, -125], size: [10, 30, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [0, 15, -125], size: [10, 10, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [0, -5, -125], size: [10, 10, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },

      // Obstacle Wall 3
      { id: uuidv4(), position: [-15, -5, -145], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [15, -5, -145], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [0, 5, -145], size: [10, 10, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },
      { id: uuidv4(), position: [0, -15, -145], size: [10, 10, 2], type: 'wall', color: '#94a3b8', texture: 'stone_tile' },

      // 6. SPHERE PORTAL
      { id: uuidv4(), position: [0, -5, -165], size: [8, 8, 2], type: 'sphere-portal', color: '#3b82f6' },
      { id: uuidv4(), position: [0, -7, -170], size: [10, 1, 10], type: 'platform', color: '#cbd5e1', texture: 'grass' },

      // 7. ANTI-GRAVITY SECTION
      { id: uuidv4(), position: [0, -5, -180], size: [8, 8, 2], type: 'gravity-up-portal', color: '#eab308' },
      { id: uuidv4(), position: [0, 5, -185], size: [10, 1, 10], type: 'platform', color: '#cbd5e1', texture: 'dirt' },
      { id: uuidv4(), position: [0, 5, -196], size: [8, 1, 8], type: 'platform', color: '#cbd5e1', texture: 'grass' },
      { id: uuidv4(), position: [0, 12, -206], size: [8, 1, 8], type: 'platform', color: '#cbd5e1', texture: 'stone_tile' }, 
      { id: uuidv4(), position: [0, 10, -216], size: [8, 8, 2], type: 'gravity-down-portal', color: '#22c55e' },
      { id: uuidv4(), position: [0, -5, -226], size: [10, 1, 15], type: 'platform', color: '#cbd5e1', texture: 'sci_fi_metal' },

      // 8. UFO FLAPPY BIRD SECTION
      { id: uuidv4(), position: [0, -3, -240], size: [8, 8, 2], type: 'ufo-portal', color: '#f97316' },
      
      // Lava floor so they have to fly
      { id: uuidv4(), position: [0, -20, -270], size: [20, 2, 60], type: 'lava', color: '#ef4444' },

      // Flappy bird pipes (walls you have to jump through)
      // Pipe 1 (Gap in middle)
      { id: uuidv4(), position: [0, 10, -255], size: [20, 20, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },
      { id: uuidv4(), position: [0, -20, -255], size: [20, 20, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },

      // Pipe 2 (Gap up high)
      { id: uuidv4(), position: [0, 15, -275], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },
      { id: uuidv4(), position: [0, -15, -275], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },
      
      // Pipe 3 (Gap down low)
      { id: uuidv4(), position: [0, 5, -295], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },
      { id: uuidv4(), position: [0, -25, -295], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },

      // Return to Sphere
      { id: uuidv4(), position: [0, -3, -315], size: [8, 8, 2], type: 'sphere-portal', color: '#3b82f6' },
      
      // 9. TRAMPOLINE JUMP
      { id: uuidv4(), position: [0, -5, -325], size: [10, 1, 10], type: 'platform', color: '#cbd5e1', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, -5, -337], size: [4, 1, 4], type: 'trampoline-red', color: '#84cc16' },
      
      // The trampoline bounces you HIGH up, then you enter a Wave portal mid-air!
      { id: uuidv4(), position: [0, 10, -345], size: [8, 8, 2], type: 'wave-portal', color: '#06b6d4' },
      
      // 10. WAVE CORRIDOR
      { id: uuidv4(), position: [0, -10, -370], size: [100, 2, 60], type: 'lava', color: '#ef4444' }, // Lava floor
      { id: uuidv4(), position: [0, 30, -370], size: [100, 2, 60], type: 'lava', color: '#ef4444' },  // Lava ceiling
      
      // Wave Obstacles
      { id: uuidv4(), position: [0, -5, -355], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 25, -365], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 5, -375], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 15, -385], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      
      // 11. ANTI-GRAVITY WAVE
      { id: uuidv4(), position: [0, 10, -395], size: [8, 8, 2], type: 'gravity-up-portal', color: '#eab308' },
      
      // Upside down wave corridor
      { id: uuidv4(), position: [0, -10, -425], size: [100, 2, 50], type: 'lava', color: '#ef4444' },
      { id: uuidv4(), position: [0, 30, -425], size: [100, 2, 50], type: 'lava', color: '#ef4444' },
      
      { id: uuidv4(), position: [0, 20, -410], size: [20, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 0, -420], size: [20, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 20, -430], size: [20, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 0, -440], size: [20, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },

      // Normal gravity + Ship transition
      { id: uuidv4(), position: [0, 10, -450], size: [8, 8, 2], type: 'gravity-down-portal', color: '#22c55e' },
      { id: uuidv4(), position: [0, 10, -455], size: [8, 8, 2], type: 'ship-portal', color: '#a855f7' },
      
      // 12. SHIP TIGHT PASSAGE
      { id: uuidv4(), position: [0, -10, -490], size: [100, 2, 80], type: 'lava', color: '#ef4444' },
      { id: uuidv4(), position: [0, 30, -490], size: [100, 2, 80], type: 'lava', color: '#ef4444' },
      
      { id: uuidv4(), position: [0, 15, -470], size: [30, 20, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' }, // Top block
      { id: uuidv4(), position: [0, -5, -470], size: [30, 20, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' }, // Bottom block
      
      { id: uuidv4(), position: [0, 25, -485], size: [30, 20, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' }, 
      { id: uuidv4(), position: [0, 0, -485], size: [30, 20, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' }, 

      { id: uuidv4(), position: [0, 10, -500], size: [30, 20, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' }, 
      { id: uuidv4(), position: [0, -10, -500], size: [30, 20, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' }, 

      // 13. SPHERE TRAMPOLINE CHAIN
      { id: uuidv4(), position: [0, 10, -520], size: [8, 8, 2], type: 'sphere-portal', color: '#3b82f6' },
      
      { id: uuidv4(), position: [0, 0, -535], size: [4, 1, 4], type: 'trampoline-red', color: '#84cc16' },
      { id: uuidv4(), position: [0, 20, -555], size: [4, 1, 4], type: 'trampoline-red', color: '#84cc16' },
      { id: uuidv4(), position: [0, 40, -575], size: [4, 1, 4], type: 'trampoline-red', color: '#84cc16' },
      
      // Bottomless pit of lava below the trampolines
      { id: uuidv4(), position: [0, -20, -555], size: [30, 2, 80], type: 'lava', color: '#ef4444' },

      // 14. EXTREME NARROW ICE SLIDE
      { id: uuidv4(), position: [0, 50, -595], size: [10, 1, 10], type: 'platform', color: '#cbd5e1', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 50, -615], size: [4, 1, 30], type: 'ice', color: '#67e8f9', texture: 'ice' },
      { id: uuidv4(), position: [0, 50, -645], size: [4, 1, 30], type: 'ice', color: '#67e8f9', texture: 'ice' },
      
      // Mud patches on the ice
      { id: uuidv4(), position: [-1, 50, -620], size: [2, 1.1, 2], type: 'mud', color: '#78350f', texture: 'dirt' },
      { id: uuidv4(), position: [1, 50, -630], size: [2, 1.1, 2], type: 'mud', color: '#78350f', texture: 'dirt' },
      { id: uuidv4(), position: [-1, 50, -640], size: [2, 1.1, 2], type: 'mud', color: '#78350f', texture: 'dirt' },
      { id: uuidv4(), position: [1, 50, -650], size: [2, 1.1, 2], type: 'mud', color: '#78350f', texture: 'dirt' },

      // 15. DUAL GRAVITY UFO
      { id: uuidv4(), position: [0, 52, -665], size: [8, 8, 2], type: 'ufo-portal', color: '#f97316' },
      
      { id: uuidv4(), position: [0, 60, -680], size: [8, 8, 2], type: 'gravity-up-portal', color: '#eab308' },
      // Pipe upside down
      { id: uuidv4(), position: [0, 80, -690], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },
      { id: uuidv4(), position: [0, 40, -690], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },

      { id: uuidv4(), position: [0, 50, -700], size: [8, 8, 2], type: 'gravity-down-portal', color: '#22c55e' },
      // Pipe right side up
      { id: uuidv4(), position: [0, 70, -710], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },
      { id: uuidv4(), position: [0, 30, -710], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },

      { id: uuidv4(), position: [0, 60, -720], size: [8, 8, 2], type: 'gravity-up-portal', color: '#eab308' },
      // Pipe upside down
      { id: uuidv4(), position: [0, 80, -730], size: [20, 30, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },
      { id: uuidv4(), position: [0, 40, -730], size: [20, 10, 2], type: 'wall', color: '#94a3b8', texture: 'neon_grid' },

      // 16. FINAL WAVE DESCENT
      { id: uuidv4(), position: [0, 50, -745], size: [8, 8, 2], type: 'gravity-down-portal', color: '#22c55e' },
      { id: uuidv4(), position: [0, 50, -750], size: [8, 8, 2], type: 'wave-portal', color: '#06b6d4' },
      
      { id: uuidv4(), position: [0, 30, -780], size: [100, 2, 60], type: 'lava', color: '#ef4444' }, // floor
      { id: uuidv4(), position: [0, 70, -780], size: [100, 2, 60], type: 'lava', color: '#ef4444' },  // ceiling
      
      { id: uuidv4(), position: [0, 35, -760], size: [30, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 65, -770], size: [30, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 35, -780], size: [30, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 65, -790], size: [30, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 35, -800], size: [30, 15, 2], type: 'wall', color: '#94a3b8', texture: 'sci_fi_metal' },
      
      // 17. FINAL WIN
      { id: uuidv4(), position: [0, 50, -815], size: [8, 8, 2], type: 'sphere-portal', color: '#3b82f6' },
      { id: uuidv4(), position: [0, 48, -825], size: [10, 1, 10], type: 'platform', color: '#cbd5e1', texture: 'sci_fi_metal' },
      { id: uuidv4(), position: [0, 48, -837], size: [8, 1, 8], type: 'win', color: '#10b981', texture: 'neon_grid' }
    ]
  }
,
  {
    "id": "level-1",
    "name": "Level 1: Basic Boot Camp",
    "backgroundTheme": "sunny",
    "blocks": [
      {
        "id": "c5a7a645-8762-43d8-9771-da13533a439e",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "grass"
      },
      {
        "id": "ff1d0735-bbec-4612-a4f7-cefd3bb8be39",
        "position": [
          0,
          0,
          -12
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "grass"
      },
      {
        "id": "f3cf2bb6-74e5-4e29-8db0-e76184ee31cd",
        "position": [
          0,
          0,
          -22
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "fa9fe930-a121-43c7-afa9-f19e268a5faf",
        "position": [
          0,
          0,
          -32
        ],
        "size": [
          6,
          1,
          6
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "grass"
      },
      {
        "id": "471397d7-e2c9-4988-a016-8f14c4dab4a4",
        "position": [
          0,
          0,
          -42
        ],
        "size": [
          4,
          1,
          4
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "d47f3ddb-378b-4389-a5f4-aba28c0a50f9",
        "position": [
          0,
          0,
          -52
        ],
        "size": [
          4,
          1,
          4
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "grass"
      },
      {
        "id": "446243d4-d542-4f9c-b03f-1616d47f5b92",
        "position": [
          0,
          0,
          -62
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "grass"
      }
    ]
  },
  {
    "id": "level-2",
    "name": "Level 2: Frictionless",
    "backgroundTheme": "dark",
    "blocks": [
      {
        "id": "bca11919-1c3d-43bf-9587-ea46791c3580",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "stone_tile"
      },
      {
        "id": "bc8c8a1f-2089-468f-bcf9-b6cab5c86540",
        "position": [
          0,
          -2,
          -15
        ],
        "size": [
          8,
          1,
          15
        ],
        "type": "ice",
        "color": "#67e8f9",
        "texture": "ice"
      },
      {
        "id": "0b994ffd-aa0b-4149-a73a-b689f5eafaad",
        "position": [
          0,
          -4,
          -30
        ],
        "size": [
          6,
          1,
          6
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "stone_tile"
      },
      {
        "id": "70488599-4f5f-4afa-9dcb-25d0602a7821",
        "position": [
          0,
          -6,
          -42
        ],
        "size": [
          6,
          1,
          12
        ],
        "type": "ice",
        "color": "#67e8f9",
        "texture": "ice"
      },
      {
        "id": "3fb1a393-19ff-4226-ba4d-36d863dcf5f6",
        "position": [
          5,
          -8,
          -55
        ],
        "size": [
          6,
          1,
          10
        ],
        "type": "ice",
        "color": "#67e8f9",
        "texture": "ice"
      },
      {
        "id": "c62c0c7f-6211-436b-8746-9b19ce67f6c8",
        "position": [
          -5,
          -10,
          -68
        ],
        "size": [
          6,
          1,
          10
        ],
        "type": "ice",
        "color": "#67e8f9",
        "texture": "ice"
      },
      {
        "id": "f888ba49-d815-453b-9668-f8c6afc22ade",
        "position": [
          0,
          -12,
          -80
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "neon_grid"
      }
    ]
  },
  {
    "id": "level-3",
    "name": "Level 3: Heatwave",
    "backgroundTheme": "glow",
    "blocks": [
      {
        "id": "40f03631-d957-49fe-97a7-f8c07fb4f634",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "rusty_iron"
      },
      {
        "id": "b7435ae9-0bb9-427e-beaa-4f8ad15f38c4",
        "position": [
          0,
          -2,
          -12
        ],
        "size": [
          20,
          2,
          8
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "da3da741-5bda-4da5-b709-44573a482b4e",
        "position": [
          0,
          0,
          -20
        ],
        "size": [
          6,
          1,
          6
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "rusty_iron"
      },
      {
        "id": "6243886a-c67a-4127-87f9-d993b8de6e77",
        "position": [
          0,
          -2,
          -32
        ],
        "size": [
          20,
          2,
          12
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "f2bed2ae-1625-4140-9571-8bb00eff3de3",
        "position": [
          0,
          0,
          -42
        ],
        "size": [
          4,
          1,
          4
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "rusty_iron"
      },
      {
        "id": "2fdf79ca-b32c-4d84-aef2-dfe3bc6981b6",
        "position": [
          0,
          -2,
          -54
        ],
        "size": [
          20,
          2,
          16
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "7dc8ee30-6b6e-46ed-9f42-bd45475cd7c0",
        "position": [
          0,
          0,
          -66
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "neon_grid"
      }
    ]
  },
  {
    "id": "level-4",
    "name": "Level 4: Inversion",
    "backgroundTheme": "neon",
    "blocks": [
      {
        "id": "0189783d-20ac-41cd-a7d5-aec57c2749bd",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "neon_grid"
      },
      {
        "id": "c399f1d6-c7e9-40e5-9bfb-ffe68ff57588",
        "position": [
          0,
          3,
          -10
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "gravity-up-portal",
        "color": "#eab308"
      },
      {
        "id": "96449715-5242-4ce3-8b0e-f7279c289eba",
        "position": [
          0,
          10,
          -18
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "neon_grid"
      },
      {
        "id": "c680d0d4-bf79-4289-8b1a-2421085bc56f",
        "position": [
          0,
          8,
          -28
        ],
        "size": [
          12,
          1,
          8
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "5ec0fc88-c7d0-4986-a427-7f613c95466f",
        "position": [
          0,
          10,
          -38
        ],
        "size": [
          6,
          1,
          6
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "neon_grid"
      },
      {
        "id": "670ec1e6-298e-4697-981f-188ff5f46ce2",
        "position": [
          0,
          5,
          -48
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "gravity-down-portal",
        "color": "#22c55e"
      },
      {
        "id": "ac7b392c-51d7-4252-9cc8-c7a6c0968f0f",
        "position": [
          0,
          -2,
          -56
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "neon_grid"
      },
      {
        "id": "90002569-0fc5-4584-874e-29252660c111",
        "position": [
          0,
          -2,
          -68
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "neon_grid"
      }
    ]
  },
  {
    "id": "level-5",
    "name": "Level 5: Claustrophobia",
    "backgroundTheme": "dark",
    "blocks": [
      {
        "id": "21f82f4f-673f-49b3-a165-ea3c78373ba5",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "stone_tile"
      },
      {
        "id": "12f6ec03-f240-4854-990e-9b61a5fa445a",
        "position": [
          0,
          3,
          -10
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "ufo-portal",
        "color": "#f97316"
      },
      {
        "id": "790eb384-e50c-4f56-801e-ca2c7f49e934",
        "position": [
          0,
          -5,
          -35
        ],
        "size": [
          20,
          2,
          40
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "ec46bd66-5b8e-4abc-bccb-330c28d3b7b3",
        "position": [
          0,
          15,
          -35
        ],
        "size": [
          20,
          2,
          40
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "stone_tile"
      },
      {
        "id": "f61b8634-35c2-42a4-af08-35fdca9e3622",
        "position": [
          0,
          10,
          -20
        ],
        "size": [
          20,
          10,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "stone_tile"
      },
      {
        "id": "538de518-4679-4037-a45b-7ddb9af065c5",
        "position": [
          0,
          -2,
          -30
        ],
        "size": [
          20,
          10,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "stone_tile"
      },
      {
        "id": "89ebb119-3f5f-453e-a02e-e00078121da8",
        "position": [
          0,
          10,
          -40
        ],
        "size": [
          20,
          10,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "stone_tile"
      },
      {
        "id": "4c8f4a0f-d369-409b-a37a-77ecf5c46be1",
        "position": [
          0,
          5,
          -50
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "sphere-portal",
        "color": "#3b82f6"
      },
      {
        "id": "784a601a-7fa0-4f0f-880b-49b292a272d4",
        "position": [
          0,
          0,
          -60
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "stone_tile"
      },
      {
        "id": "6581c032-fbb1-4e1d-acda-c165b1f60717",
        "position": [
          0,
          0,
          -72
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "neon_grid"
      }
    ]
  },
  {
    "id": "level-6",
    "name": "Level 6: Trench Run",
    "backgroundTheme": "space",
    "blocks": [
      {
        "id": "6a5a7302-22bc-4831-a329-b446a07ac9ae",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "sci_fi_metal"
      },
      {
        "id": "08a0d6f7-54ad-479b-aa37-8a5f83384860",
        "position": [
          0,
          3,
          -10
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "ship-portal",
        "color": "#a855f7"
      },
      {
        "id": "00675f2d-9f1c-4e3c-95ac-1f162db8dc37",
        "position": [
          0,
          -15,
          -50
        ],
        "size": [
          30,
          2,
          80
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "e3bc676f-a672-4cd4-8d68-3d441e7ea809",
        "position": [
          -10,
          0,
          -30
        ],
        "size": [
          15,
          30,
          2
        ],
        "type": "wall",
        "color": "#93c5fd",
        "texture": "glass"
      },
      {
        "id": "225cffe9-cdb7-4105-a307-a21c8d1fe6de",
        "position": [
          15,
          0,
          -30
        ],
        "size": [
          25,
          30,
          2
        ],
        "type": "wall",
        "color": "#93c5fd",
        "texture": "glass"
      },
      {
        "id": "03a74ca4-caa1-4aca-aa25-5adade1478e4",
        "position": [
          10,
          0,
          -50
        ],
        "size": [
          15,
          30,
          2
        ],
        "type": "wall",
        "color": "#93c5fd",
        "texture": "glass"
      },
      {
        "id": "d05c83d8-bb51-4bc4-9289-1e72c0f50534",
        "position": [
          -15,
          0,
          -50
        ],
        "size": [
          25,
          30,
          2
        ],
        "type": "wall",
        "color": "#93c5fd",
        "texture": "glass"
      },
      {
        "id": "1aa4eabe-2752-4521-b9aa-cb1352d80c7d",
        "position": [
          0,
          10,
          -70
        ],
        "size": [
          30,
          20,
          2
        ],
        "type": "wall",
        "color": "#93c5fd",
        "texture": "glass"
      },
      {
        "id": "2c5ae7ac-7bee-40f8-8e74-3ab7e69fef1e",
        "position": [
          0,
          -10,
          -70
        ],
        "size": [
          30,
          15,
          2
        ],
        "type": "wall",
        "color": "#93c5fd",
        "texture": "glass"
      },
      {
        "id": "1595c3f6-6499-491a-865a-d9c27a0c8213",
        "position": [
          0,
          0,
          -85
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "sphere-portal",
        "color": "#3b82f6"
      },
      {
        "id": "0572c4e8-9c34-462d-bea4-1061cbcb0afe",
        "position": [
          0,
          -3,
          -95
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "sci_fi_metal"
      },
      {
        "id": "45fa7540-b9df-4103-9ac8-83431100c705",
        "position": [
          0,
          -3,
          -107
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "neon_grid"
      }
    ]
  },
  {
    "id": "level-7",
    "name": "Level 7: Sinking Sand",
    "backgroundTheme": "sunny",
    "blocks": [
      {
        "id": "a4111024-3604-4847-aa6c-cf21c53f4025",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "88565895-ac13-45ec-b425-767635cff663",
        "position": [
          0,
          0,
          -8
        ],
        "size": [
          6,
          1,
          6
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "d3ec129c-f617-4dfc-b554-dbbbecb8e681",
        "position": [
          0,
          0,
          -15
        ],
        "size": [
          4,
          1,
          4
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "f36d0695-af0c-43ca-847b-d59a7676e86d",
        "position": [
          3,
          0,
          -21
        ],
        "size": [
          3,
          1,
          3
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "a75bbfa9-aa6f-41c8-864f-181f16cf448c",
        "position": [
          -3,
          0,
          -27
        ],
        "size": [
          3,
          1,
          3
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "ab09e743-254b-487d-b6eb-9a6a78ccdbbd",
        "position": [
          0,
          0,
          -33
        ],
        "size": [
          2,
          1,
          2
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "e67a00f1-e5f7-414c-92ff-1edb173d1992",
        "position": [
          0,
          0,
          -41
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "grass"
      }
    ]
  },
  {
    "id": "level-8",
    "name": "Level 8: Shape Shifter",
    "backgroundTheme": "neon",
    "blocks": [
      {
        "id": "23221744-bcbf-4e2d-a614-6957a44b5263",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "neon_grid"
      },
      {
        "id": "52f4ad75-7e67-49e0-aba4-b5f3818d3ee7",
        "position": [
          0,
          3,
          -10
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "ufo-portal",
        "color": "#f97316"
      },
      {
        "id": "12a1177d-3c7c-4e12-865d-7681c77ee124",
        "position": [
          0,
          -10,
          -35
        ],
        "size": [
          20,
          2,
          50
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "a75f8f32-b506-42c8-91e5-2c708448a608",
        "position": [
          0,
          10,
          -25
        ],
        "size": [
          20,
          10,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "glass"
      },
      {
        "id": "0e226bb9-d356-48dc-a72f-3c852c5000f5",
        "position": [
          0,
          5,
          -35
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "ship-portal",
        "color": "#a855f7"
      },
      {
        "id": "488f6497-62db-4511-936a-03db41c50f1f",
        "position": [
          -10,
          5,
          -45
        ],
        "size": [
          15,
          20,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "glass"
      },
      {
        "id": "c7f3de06-2488-4131-b026-5e31535b7b80",
        "position": [
          15,
          5,
          -45
        ],
        "size": [
          25,
          20,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "glass"
      },
      {
        "id": "9cbe4209-27ce-4cdf-b047-d632d58e6e4d",
        "position": [
          2,
          5,
          -55
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "sphere-portal",
        "color": "#3b82f6"
      },
      {
        "id": "d538b51c-f2e7-46ce-851d-8c4cc3df839d",
        "position": [
          2,
          2,
          -65
        ],
        "size": [
          6,
          1,
          6
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "neon_grid"
      },
      {
        "id": "a505ab3f-e8c1-4df1-b8c4-6909c8790cdd",
        "position": [
          2,
          2,
          -75
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "neon_grid"
      }
    ]
  },
  {
    "id": "level-9",
    "name": "Level 9: Ceiling Walk",
    "backgroundTheme": "space",
    "blocks": [
      {
        "id": "c34b2599-b61b-4031-8bd3-2170665d4c6b",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "sci_fi_metal"
      },
      {
        "id": "8839c549-bc43-444b-addb-57efc2c02db9",
        "position": [
          0,
          3,
          -10
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "gravity-up-portal",
        "color": "#eab308"
      },
      {
        "id": "53c8935b-c5bd-4ad8-8c38-29d5a62562f1",
        "position": [
          0,
          10,
          -20
        ],
        "size": [
          8,
          1,
          15
        ],
        "type": "ice",
        "color": "#67e8f9",
        "texture": "ice"
      },
      {
        "id": "3cbb1232-9ff6-4624-bf04-3057b6273ea2",
        "position": [
          0,
          8,
          -35
        ],
        "size": [
          20,
          2,
          10
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "3ae33158-f322-4029-9cff-2f9823329245",
        "position": [
          0,
          10,
          -45
        ],
        "size": [
          6,
          1,
          6
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "sci_fi_metal"
      },
      {
        "id": "917be6a6-9e42-4302-a137-3f3b5a86bb81",
        "position": [
          0,
          -2,
          -55
        ],
        "size": [
          20,
          2,
          10
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "e86460ee-c194-449e-8742-5616bdfc2fde",
        "position": [
          0,
          5,
          -55
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "gravity-down-portal",
        "color": "#22c55e"
      },
      {
        "id": "301f7384-89e0-4253-b013-b0f0104019f1",
        "position": [
          0,
          0,
          -65
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "sci_fi_metal"
      },
      {
        "id": "f91155c6-10bb-4322-b2b3-c1d0fc121a81",
        "position": [
          0,
          0,
          -75
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "neon_grid"
      }
    ]
  },
  {
    "id": "level-10",
    "name": "Level 10: The Gauntlet",
    "backgroundTheme": "glow",
    "blocks": [
      {
        "id": "91f9c462-a0b8-4cd1-a89a-82b9e83eaff7",
        "position": [
          0,
          0,
          0
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "stone_tile"
      },
      {
        "id": "9e510401-aeff-4eda-8747-46821cc97a2e",
        "position": [
          0,
          0,
          -10
        ],
        "size": [
          6,
          1,
          6
        ],
        "type": "mud",
        "color": "#78350f",
        "texture": "dirt"
      },
      {
        "id": "085f062c-951d-4c89-96d7-18ccebdcb165",
        "position": [
          0,
          -2,
          -22
        ],
        "size": [
          8,
          1,
          12
        ],
        "type": "ice",
        "color": "#67e8f9",
        "texture": "ice"
      },
      {
        "id": "01e98dee-b56d-4df1-9e37-f41796d3e4a2",
        "position": [
          0,
          0,
          -35
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "gravity-up-portal",
        "color": "#eab308"
      },
      {
        "id": "4bc16716-a152-4e95-b186-9d35df8ca4a9",
        "position": [
          0,
          10,
          -45
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "stone_tile"
      },
      {
        "id": "201dbf60-7f01-4903-bc23-bfe8ed61e250",
        "position": [
          0,
          6,
          -55
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "ufo-portal",
        "color": "#f97316"
      },
      {
        "id": "c89eca0c-f72a-446d-ab1d-7c9034aa1771",
        "position": [
          0,
          -10,
          -75
        ],
        "size": [
          20,
          2,
          40
        ],
        "type": "lava",
        "color": "#ef4444",
        "texture": "lava"
      },
      {
        "id": "45afc1fc-5f18-4d0e-807f-369a3b435b03",
        "position": [
          0,
          10,
          -65
        ],
        "size": [
          20,
          20,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "glass"
      },
      {
        "id": "4e59ef36-a9df-4ae4-9212-fabac0e57ba9",
        "position": [
          0,
          -2,
          -75
        ],
        "size": [
          20,
          15,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "glass"
      },
      {
        "id": "b2d7f786-a725-40e1-ad0b-ec6aafbad183",
        "position": [
          0,
          5,
          -85
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "ship-portal",
        "color": "#a855f7"
      },
      {
        "id": "1f9a5210-11bd-4b13-8450-75b8953fe011",
        "position": [
          -12,
          5,
          -100
        ],
        "size": [
          20,
          20,
          2
        ],
        "type": "wall",
        "color": "#94a3b8",
        "texture": "glass"
      },
      {
        "id": "4519d9ba-8790-45c1-a9fc-2929fe70f5b2",
        "position": [
          8,
          5,
          -115
        ],
        "size": [
          8,
          8,
          2
        ],
        "type": "sphere-portal",
        "color": "#3b82f6"
      },
      {
        "id": "e5e12d65-1031-457b-91b0-a0dd511e26a2",
        "position": [
          8,
          2,
          -125
        ],
        "size": [
          10,
          1,
          10
        ],
        "type": "platform",
        "color": "#cbd5e1",
        "texture": "stone_tile"
      },
      {
        "id": "29abce86-c87e-416f-82df-ca77e594d3ac",
        "position": [
          8,
          2,
          -137
        ],
        "size": [
          8,
          1,
          8
        ],
        "type": "win",
        "color": "#10b981",
        "texture": "neon_grid"
      }
    ]
  }
];
