// @filename: src/app/recipe-showcase/page.tsx
// ====================================================================================
// src/app/recipe-showcase/page.tsx - Example page to showcase all components (App Router)
// ====================================================================================
import React from 'react';
// Importa i componenti
import { IngredientsSection } from '../../components/ingredients/IngredientsSection';
import { InstructionsSection } from '../../components/instructions/InstructionsSection';
import { RecipeCard } from '../../components/recipeCard/RecipeCard';
import { RelatedRecipesSection } from '../../components/relatedRecipes/RelatedRecipesSection';
// Importa il componente Header (assicurati che il percorso e il file esistano)
import RecipeDetailHeader from '../../components/RecipeDetailHeader/RecipeDetailHeader';

// Importa i dati mock e i tipi necessari
import {
    mockIngredientsData,
    mockInstructionsData,
    mockRecipeCardDataArray,
    mockRecipeHeaderData,
    RecipeHeaderData // Importa il tipo da mockData (che a sua volta lo importa da RecipeDetailHeader/types)
} from '../../data/mockData';

// Importa i tipi specifici dei componenti per maggiore chiarezza
import { IngredientsData } from '../../components/ingredients/ingredients.types';
import { InstructionsData } from '../../components/instructions/instructions.types';
import { RecipeCardData } from '../../components/recipeCard/recipeCard.types';


// Interfaccia per i dati completi di una pagina ricetta singola (usata nell'esempio di layout completo)
interface FullRecipePageData {
  headerData: RecipeHeaderData;
  ingredientsData: IngredientsData;
  instructionsData: InstructionsData;
  relatedRecipes: RecipeCardData[];
}

// Dati mock per l'esempio di layout completo
const mockFullRecipePageData: FullRecipePageData = {
  // Assicurati che mockRecipeHeaderData esista e sia completo in mockData.ts
  headerData: mockRecipeHeaderData,
  ingredientsData: mockIngredientsData,
  instructionsData: mockInstructionsData,
  relatedRecipes: mockRecipeCardDataArray.slice(0,5), // Prendi le prime 5 per i "correlati"
};

// Componente che mostra un esempio di layout completo di una pagina ricetta
// (Include Header, Ingredients, Instructions, Related Recipes)
const FullRecipePageLayout: React.FC<{ data: FullRecipePageData }> = ({ data }) => {
  // Controllo per verificare se i dati dell'header sono disponibili (dipende dal file RecipeDetailHeader/types/ e mockData.ts)
  const canRenderHeader = data.headerData && data.headerData.id;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Renderizza l'header solo se i dati sono disponibili */}
      {canRenderHeader ? (
         <RecipeDetailHeader recipe={data.headerData} />
      ) : (
        // Messaggio di avviso se l'header non può essere renderizzato
        <div className="p-4 text-center text-red-500 bg-red-100 rounded-md">
            RecipeDetailHeader component or its data is missing or incomplete. Ensure the component, its types, and mock data are correctly defined.
        </div>
      )}

      {/* Contenuto principale: Ingredients e Instructions */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mt-[-30px] md:mt-[-50px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <InstructionsSection data={data.instructionsData} />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <IngredientsSection data={data.ingredientsData} />
          </div>
        </div>
      </div>

      {/* Sezione Ricette Correlate */}
      <RelatedRecipesSection recipes={data.relatedRecipes} />
    </div>
  );
};


// Componente principale della pagina /recipe-showcase
const ComponentsPreviewApp = () => {
    // Controllo per decidere se mostrare la sezione "Full Page Layout Example"
    // Dipende dall'esistenza di mockRecipeHeaderData (che a sua volta dipende dal tipo RecipeHeaderData)
    const showFullPageExample = !!mockRecipeHeaderData.id;

    return (
        // Rimosso bg-gray-100 qui, poiché il layout radice (app/layout.tsx) o il FullRecipePageLayout lo gestiscono
        <div className="space-y-10 p-2 sm:p-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-center my-6 sm:my-10 text-gray-800">Recipe Components Showcase</h1>

            {/* Sezione Ingredienti */}
            <section id="ingredients-showcase">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Ingredients Section</h2>
                {/* Aggiunto un wrapper per visualizzare meglio il componente su sfondo grigio */}
                <div className="max-w-md mx-auto bg-white p-1 rounded-lg shadow-md">
                  <IngredientsSection data={mockIngredientsData} />
                </div>
            </section>

            {/* Sezione Istruzioni */}
            <section id="instructions-showcase">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Instructions Section</h2>
                 {/* Aggiunto un wrapper per visualizzare meglio il componente su sfondo grigio */}
                <div className="max-w-2xl mx-auto bg-white p-1 rounded-lg shadow-md">
                  <InstructionsSection data={mockInstructionsData} />
                </div>
            </section>

            {/* Sezione Recipe Cards (Default) */}
            <section id="recipe-cards-default-showcase">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Recipe Cards (Default Style)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {mockRecipeCardDataArray.slice(0,3).map(recipe => (
                        <RecipeCard key={`default-${recipe.id}`} recipe={recipe} />
                    ))}
                </div>
            </section>

             {/* Sezione Recipe Cards (Compact) */}
            <section id="recipe-cards-compact-showcase">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Recipe Cards (Compact Style)</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
                    {mockRecipeCardDataArray.map(recipe => (
                        <RecipeCard key={`compact-${recipe.id}`} recipe={recipe} variant="compact" />
                    ))}
                </div>
            </section>

            {/* Sezione Related Recipes */}
            <section id="related-recipes-showcase">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Related Recipes Section</h2>
                {/* RelatedRecipesSection ha già padding e sfondo, non serve wrapparlo */}
                <RelatedRecipesSection recipes={mockRecipeCardDataArray.slice(0,5)} />
            </section>

            {/* Sezione Esempio Pagina Completa (mostrata solo se i dati dell'header sono disponibili) */}
            {showFullPageExample ? (
                <section id="full-page-example-showcase">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Full Page Layout Example</h2>
                    {/* FullRecipePageLayout ha già padding e sfondo, non serve wrapparlo */}
                    <FullRecipePageLayout data={mockFullRecipePageData} />
                </section>
            ) : (
                 // Messaggio di avviso se l'esempio completo è saltato
                <section id="full-page-example-skipped" className="p-4 text-center text-orange-500 bg-orange-100 rounded-md">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">Full Page Layout Example Skipped</h2>
                    <p>Il componente RecipeDetailHeader o i suoi dati non sono completamente disponibili. <br/> Assicurati che il componente `RecipeDetailHeader.tsx`, `recipeDetailHeader.types.ts` e i dati in `mockData.ts` siano corretti.</p>
                </section>
            )}
        </div>
    )
}

export default ComponentsPreviewApp;