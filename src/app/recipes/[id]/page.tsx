// @filename: src/app/recipes/[id]/page.tsx
import Link from 'next/link';
// Importa i componenti necessari per il layout completo
import { IngredientsSection } from '@/components/ingredients/IngredientsSection';
import { InstructionsSection } from '@/components/instructions/InstructionsSection';
import RecipeDetailHeader from '@/components/RecipeDetailHeader/RecipeDetailHeader';
import { RelatedRecipesSection } from '@/components/relatedRecipes/RelatedRecipesSection';

// Importa i dati mock e i tipi
import {
  mockIngredientsData,
  mockInstructionsData,
  mockRecipeCardDataArray,
  mockRecipeHeaderData, // Useremo questo per l'header della ricetta specifica (simulando fetch)
  RecipeHeaderData // Tipo
} from '@/data/mockData';


interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const recipeId = params.id;

  // --- SIMULAZIONE DATA FETCHING PER LA RICETTA SPECIFICA ---
  // In un'app reale, useresti recipeId per fare un fetch dei dati completi della ricetta.
  // Per questo esempio, fingeremo che mockRecipeHeaderData, mockIngredientsData, e mockInstructionsData
  // siano i dati per *qualsiasi* ricetta a cui si accede.
  // Idealmente, avresti un modo per mappare recipeId a dati specifici.

  // Cerchiamo la card per ottenere alcuni dettagli iniziali come il titolo, se necessario per l'header
  const cardData = mockRecipeCardDataArray.find(r => r.href === `/recipes/${recipeId}`);

  // Se non troviamo la card, potremmo mostrare un errore 404 o un messaggio
  if (!cardData) {
    return (
      <div className="container mx-auto p-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-700">Recipe Not Found</h1>
        <p className="text-gray-500 mt-2">
          Sorry, we couldn't find a recipe with ID: <code>{recipeId}</code>.
        </p>
        <Link href="/recipe-showcase" className="mt-4 inline-block text-pink-600 hover:underline">
          ← Back to Showcase
        </Link>
      </div>
    );
  }

  // Per l'esempio, usiamo i dati mock globali. In un'app reale, questi sarebbero specifici per `recipeId`.
  // Potresti adattare mockRecipeHeaderData per usare cardData.title, ecc.
  const currentRecipeHeaderData: RecipeHeaderData = {
      ...mockRecipeHeaderData, // Dati di base dall'header mock
      id: recipeId,            // Sovrascrivi con l'ID corrente
      title: cardData.title,   // Sovrascrivi con il titolo dalla card
      // Potresti voler sovrascrivere anche imageUrl, description, etc., se li hai nella cardData
      // e vuoi che l'header della pagina di dettaglio li rifletta.
      // imageUrl: cardData.imageUrl,
      // imageAlt: cardData.imageAlt,
  };
  const currentIngredientsData = mockIngredientsData;
  const currentInstructionsData = mockInstructionsData;
  const relatedRecipes = mockRecipeCardDataArray.filter(r => r.id !== cardData.id).slice(0, 5); // Escludi la corrente

  // Controllo per l'header (lo stesso di prima)
  const canRenderHeader = currentRecipeHeaderData && currentRecipeHeaderData.id;

  return (
    // Il RootLayout (app/layout.tsx) fornisce già bg-gray-100 e la struttura base.
    // Il FullRecipePageLayout è ora integrato qui.
    <div className="min-h-screen"> {/* Rimosso bg-gray-100 se già nel layout principale */}
      {canRenderHeader ? (
         <RecipeDetailHeader recipe={currentRecipeHeaderData} />
      ) : (
        <div className="p-4 text-center text-red-500 bg-red-100 rounded-md">
            RecipeDetailHeader data is missing or incomplete.
        </div>
      )}

      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mt-[-30px] md:mt-[-50px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <InstructionsSection data={currentInstructionsData} />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <IngredientsSection data={currentIngredientsData} />
          </div>
        </div>
      </div>
      <RelatedRecipesSection recipes={relatedRecipes} title="You might also like" />
      
      {/* Link per tornare indietro, può essere utile */}
      <div className="text-center py-8">
          <Link href="/recipe-showcase" className="text-pink-600 hover:underline">
            ← View All Components in Showcase
          </Link>
      </div>
    </div>
  );
}

// generateStaticParams rimane uguale
export async function generateStaticParams() {
    const ids = mockRecipeCardDataArray.map(recipe => {
        const parts = recipe.href.split('/');
        return parts[parts.length - 1];
    }).filter(id => id !== ''); 

    return ids.map(id => ({
        id: id,
    }));
}