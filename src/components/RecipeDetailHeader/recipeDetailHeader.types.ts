export interface RecipeHeaderData {
  id: string;
  title: string;
  breadcrumbs: { name: string; href: string }[];
  rating: number;
  reviewCount: number;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  details: {
    prepTime: string;
    cookTime: string;
    servings: string;
    difficulty: string;
  };
  nutrition: {
    kcal: number;
    protein: string;
    carbs: string;
  };
}

export interface RecipeDetailHeaderProps {
  recipe: RecipeHeaderData;
}
