// @filename: src/app/recipe-showcase/page.tsx
// Importa solo i componenti che vuoi mostrare isolatamente nello showcase
import { RecipeCard } from '../../components/recipeCard/RecipeCard';
import { RelatedRecipesSection } from '../../components/relatedRecipes/RelatedRecipesSection';
// Opzionale: importa questi se vuoi mostrarli come componenti singoli nello showcase
// import { IngredientsSection } from '../../components/ingredients/IngredientsSection';
// import { InstructionsSection } from '../../components/instructions/InstructionsSection';
// import RecipeDetailHeader from '../../components/RecipeDetailHeader/RecipeDetailHeader';


// import { mockRecipeCardDataArray } from '../../data/mockData';
import { ricette } from "@/db/schema";
import { db } from "@/lib/db";
import type { Route } from 'next';
import { RecipeCardData } from '../../components/recipeCard/recipeCard.types';

import { getRecipeImage } from "@/lib/recipe-images";

async function getRecipes(): Promise<RecipeCardData[]> {
  // Safe fetch - defaults to empty array if DB fails
  try {
    const dbRecipes = await db.select().from(ricette).limit(6);

    return dbRecipes.map((r) => ({
      id: r.url || 'unknown',
      imageUrl: getRecipeImage(r.immagineUrl, r.titolo),
      imageAlt: r.titolo || 'Recipe',
      rating: 4.5,
      title: r.titolo || 'Untitled Recipe',
      tags: [
        ...(r.tipologiaDieta ? [{ label: r.tipologiaDieta, type: 'secondary' }] : []),
        ...(r.difficolta ? [{ label: r.difficolta, type: 'neutral' }] : [])
      ],
      time: r.preparazione || r.cottura || 'N/A',
      difficulty: (r.difficolta as any) || 'Medium',
      calories: r.caloriePerPorzione ? `${r.caloriePerPorzione} kcal` : undefined,
      // Fix: Encode URL to be safe for Next.js dynamic route segment
      href: ('/recipes/' + encodeURIComponent(r.url)) as Route,
    }));
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
}

// Non abbiamo più bisogno di FullRecipePageData e mockFullRecipePageData qui
// Non abbiamo più bisogno di IngredientsData, InstructionsData, RecipeHeaderData (tipi) se non mostriamo quei componenti isolatamente

import { Navbar } from "@/components/navbar";

const ComponentsPreviewApp = async () => {
  const recipes = await getRecipes();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="space-y-10 p-2 sm:p-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-center my-6 sm:my-10 text-gray-800">
          Recipe Components Showcase
        </h1>

        {/* Opzionale: Showcase per IngredientsSection (decommenta se vuoi mostrarlo qui) */}
        {/*
            <section id="ingredients-showcase">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Ingredients Section</h2>
                <div className="max-w-md mx-auto bg-white p-1 rounded-lg shadow-md">
                  <IngredientsSection data={mockIngredientsData} />
                </div>
            </section>
            */}

        {/* Opzionale: Showcase per InstructionsSection (decommenta se vuoi mostrarlo qui) */}
        {/*
            <section id="instructions-showcase">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Instructions Section</h2>
                <div className="max-w-2xl mx-auto bg-white p-1 rounded-lg shadow-md">
                  <InstructionsSection data={mockInstructionsData} />
                </div>
            </section>
            */}

        {/* Opzionale: Showcase per RecipeDetailHeader (decommenta se vuoi mostrarlo qui) */}
        {/*
            <section id="recipe-detail-header-showcase">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Recipe Detail Header</h2>
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                  {mockRecipeHeaderData.id ? ( // Controlla se i dati dell'header esistono
                     <RecipeDetailHeader recipe={mockRecipeHeaderData} />
                  ) : (
                    <p className="p-4 text-center text-orange-500">RecipeDetailHeader data not fully available.</p>
                  )}
                </div>
            </section>
            */}

        <section id="recipe-cards-default-showcase">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Recipe Cards (Default Style)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {recipes.slice(0, 3).map(recipe => (
              <RecipeCard key={`default-${recipe.id}`} recipe={recipe} />
            ))}
          </div>
        </section>

        <section id="recipe-cards-compact-showcase">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Recipe Cards (Compact Style)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
            {recipes.map(recipe => (
              <RecipeCard key={`compact-${recipe.id}`} recipe={recipe} variant="compact" />
            ))}
          </div>
        </section>

        <section id="related-recipes-showcase">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Related Recipes Section</h2>
          <RelatedRecipesSection recipes={recipes.slice(0, 5)} />
        </section>

        {/* SEZIONE RIMOSSA: Full Page Layout Example */}
        {/*
            <section id="full-page-example-showcase">
                // ... contenuto precedente rimosso ...
            </section>
            */}
      </div>
    </div>
  );
};

export default ComponentsPreviewApp;
