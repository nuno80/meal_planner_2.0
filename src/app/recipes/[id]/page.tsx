import Link from 'next/link';
import { notFound } from "next/navigation";

// Components
import { IngredientsSection } from '@/components/ingredients/IngredientsSection';
import { InstructionsSection } from '@/components/instructions/InstructionsSection';
import RecipeDetailHeader from '@/components/RecipeDetailHeader/RecipeDetailHeader';
import { RelatedRecipesSection } from '@/components/relatedRecipes/RelatedRecipesSection';

// Types
import { IngredientsData } from '@/components/ingredients/ingredients.types';
import { InstructionsData } from '@/components/instructions/instructions.types';
import { RecipeCardData } from '@/components/recipeCard/recipeCard.types';
import { RecipeHeaderData } from '@/components/RecipeDetailHeader/recipeDetailHeader.types';
import { getRecipeImage } from '@/lib/recipe-images';

// Database
import { ricette } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

interface RecipeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const resolvedParams = await params;
  const decodedUrl = decodeURIComponent(resolvedParams.id);

  // 1. Fetch Real Data
  const recipeResult = await db.select().from(ricette).where(eq(ricette.url, decodedUrl)).limit(1);
  const recipe = recipeResult[0];

  if (!recipe) {
    return notFound();
  }

  // 2. Parse Ingredients (JSON format in DB: {"name": qty, ...})
  let parsedIngredients: IngredientsData = { defaultServings: recipe.dosiPer || 4, ingredients: [] };
  try {
    if (recipe.ingredientsJson) {
      const json = JSON.parse(recipe.ingredientsJson);
      parsedIngredients.ingredients = Object.entries(json).map(([name, qty], index) => ({
        id: `ing-${index}`,
        // Format: "320 g rigatoni" or just "sale q.b."
        name: `${qty} ${name}`.trim()
      }));
    } else if (recipe.ingredienti) {
      // Fallback if JSON is missing but text exists
      parsedIngredients.ingredients = [{ id: 'ing-1', name: recipe.ingredienti }];
    }
  } catch (e) {
    console.error("Error parsing ingredients JSON", e);
    // Fallback on error
    parsedIngredients.ingredients = [{ id: 'err', name: "Could not load ingredients list." }];
  }

  // 3. Parse Instructions (Text block in DB)
  let parsedInstructions: InstructionsData = { steps: [] };
  if (recipe.istruzioni) {
    // Split by period to simulate steps, filtering empty strings
    const sentences = recipe.istruzioni.split('. ').filter(s => s.trim().length > 0);
    parsedInstructions.steps = sentences.map((desc, index) => ({
      id: `step-${index}`,
      stepNumber: index + 1,
      description: desc.endsWith('.') ? desc : desc + '.',
      isCompleted: false
    }));
  }

  // 4. Construct Header Data
  const headerData: RecipeHeaderData = {
    id: recipe.url || 'unknown-id',
    title: recipe.titolo || 'Untitled Recipe',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Recipes', href: '/recipe-showcase' }, // Changed to showcase as it's our main list now
      { name: 'Detail', href: '#' }
    ],
    rating: 4.5, // Mock
    reviewCount: 0, // Mock
    description: recipe.presentazione || 'No description available.',
    details: {
      prepTime: recipe.preparazione || 'N/A',
      cookTime: recipe.cottura || 'N/A',
      servings: String(recipe.dosiPer) || '4',
      difficulty: (recipe.difficolta as any) || 'Medium',
    },
    tags: [
      ...(recipe.tipologiaDieta ? [recipe.tipologiaDieta] : []),
      ...(recipe.tipologiaPiatti ? [recipe.tipologiaPiatti] : []),
      'Italian'
    ],
    nutrition: {
      kcal: recipe.caloriePerPorzione || 0,
      protein: recipe.proteineTotaliPorzioneG ? `${recipe.proteineTotaliPorzioneG}g` : 'N/A',
      carbs: 'N/A', // Not in top level schema easily mapped
    },
    // Use fallback utility
    imageUrl: getRecipeImage(recipe.immagineUrl, recipe.titolo),
    imageAlt: recipe.titolo || 'Recipe Image',
  };

  // 5. Fetch Related Recipes (Mock or Random DB)
  // For simplicity, just fetching 3 random others (or first 3)
  // Since random() is dialect specific, we'll just take first 3 != current
  const relatedDbRecipes = await db.select().from(ricette).limit(4);
  const relatedRecipes: RecipeCardData[] = relatedDbRecipes
    .filter(r => r.url !== recipe.url)
    .slice(0, 3)
    .map(r => ({
      id: r.url || 'rel',
      title: r.titolo || 'Recipe',
      imageUrl: getRecipeImage(r.immagineUrl, r.titolo),
      rating: 4.0,
      tags: [],
      time: r.preparazione || 'N/A',
      difficulty: 'Medium',
      href: `/recipes/${encodeURIComponent(r.url || '')}` as any, // Cast to Route
      imageAlt: r.titolo || 'Rel',
      calories: r.caloriePerPorzione ? `${r.caloriePerPorzione} kcal` : undefined
    }));


  return (
    <div className="min-h-screen pb-10">
      <RecipeDetailHeader recipe={headerData} />

      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Instructions</h2>
            <InstructionsSection data={parsedInstructions} />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
            <IngredientsSection data={parsedIngredients} />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <RelatedRecipesSection recipes={relatedRecipes} title="You might also like" />
      </div>

      <div className="text-center py-8 border-t mt-12">
        <Link href="/recipe-showcase" className="text-pink-600 hover:underline">
          ← Back to Recipe Showcase
        </Link>
      </div>
    </div>
  );
}
