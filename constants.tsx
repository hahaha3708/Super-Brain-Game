
import { Season } from './types';

export const SEASONS: Season[] = [
  {
    id: 's1',
    title: 'Season 01: Foundations',
    theme: 'Neural Awakening',
    description: 'Master the basic cognitive pathways required for high-level mental competition.',
    games: [
      {
        id: 'pattern-recall',
        title: 'Pattern Matrix',
        description: 'Memorize the flashing grid sequence and replicate it with absolute precision.',
        type: 'memory',
        difficulty: 'Novice',
        thumbnail: 'https://picsum.photos/seed/pattern/400/300'
      },
      {
        id: 'math-sprint',
        title: 'Neural Arithmetic',
        description: 'Solve complex equations under extreme time pressure to stimulate rapid processing.',
        type: 'math',
        difficulty: 'Elite',
        thumbnail: 'https://picsum.photos/seed/math/400/300'
      }
    ]
  },
  {
    id: 's2',
    title: 'Season 02: Spatial Mastery',
    theme: 'Geometric Transcendence',
    description: 'Elevate your spatial reasoning and visual processing capabilities to the next dimension.',
    games: [
      {
        id: 'spatial-grid',
        title: 'Cube Rotation',
        description: 'Mentally rotate complex structures to identify matching perspectives.',
        type: 'spatial',
        difficulty: 'Master',
        thumbnail: 'https://picsum.photos/seed/spatial/400/300'
      }
    ]
  }
];

export const UI_COLORS = {
  bg: '#020617',
  primary: '#22d3ee', // Cyan
  secondary: '#f59e0b', // Gold
  accent: '#a855f7', // Purple
  muted: '#64748b'
};
