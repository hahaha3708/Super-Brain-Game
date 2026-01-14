
export type Difficulty = 'Novice' | 'Elite' | 'Master';

export interface Game {
  id: string;
  title: string;
  description: string;
  type: 'logic' | 'math' | 'memory' | 'spatial';
  difficulty: Difficulty;
  thumbnail: string;
}

export interface Season {
  id: string;
  title: string;
  theme: string;
  description: string;
  games: Game[];
}

export interface GameResult {
  score: number;
  accuracy: number;
  timeSpent: number;
}
