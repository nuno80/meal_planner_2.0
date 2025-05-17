import { Difficulty, RecipeTag } from '../../types'; // Shared types

export interface RecipeCardData {
  id: string;
  imageUrl: string;
  imageAlt: string;
  rating?: number;
  title: string;
  tags: RecipeTag[];
  time: string;
  difficulty: Difficulty;
  calories?: string;
  href: string;
}
