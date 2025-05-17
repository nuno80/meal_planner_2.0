// @filename: src/app/recipes/[id]/page.tsx
import SafeImage from '@/components/ui/SafeImage'; // Assicurati di avere il componente SafeImage
import { mockRecipeCardDataArray } from '@/data/mockData';
import Link from 'next/link';

interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const recipeId = params.id;
  const recipe = mockRecipeCardDataArray.find(r => r.href === `/recipes/${recipeId}`);

  return (
    <div className="py-8">
      <div className="mb-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/recipe-showcase" className="text-pink-600 hover:underline flex items-center">
           ← <span className="ml-1">Back to Showcase</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {recipe ? (
          <article className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
            
            {recipe.imageUrl && (
              <SafeImage // <<<--- USA IL NUOVO COMPONENTE SafeImage
                src={recipe.imageUrl}
                alt={recipe.imageAlt || `Image for ${recipe.title}`}
                className="w-full h-auto max-h-96 object-cover rounded-md mb-6" // Passa la className
                // fallbackSrc="URL_DI_UN_ALTRO_FALLBACK_SE_NECESSARIO_E_DIVERSO_DA_QUELLO_DI_DEFAULT" // Opzionale
              />
            )}

            <div className="text-gray-700 mb-6 space-y-2">
                <p><strong>Time:</strong> {recipe.time}</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                {recipe.calories && <p><strong>Calories:</strong> {recipe.calories}</p>}
                {typeof recipe.rating === 'number' && <p><strong>Rating:</strong> {recipe.rating.toFixed(1)}</p>}
                 {recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        <strong>Tags:</strong>
                        {recipe.tags.map((tag, index) => (
                        <span
                            key={index}
                            className={`px-2 py-0.5 text-xs font-medium rounded-full
                              ${tag.type === 'neutral' ? 'bg-gray-200 text-gray-700' :
                                tag.type === 'secondary' ? 'bg-blue-100 text-blue-700' :
                                'bg-pink-100 text-pink-700'
                              }`}
                        >
                            {tag.label}
                        </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="prose max-w-none text-gray-800">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Placeholder Content</h2>
              <p>
                Questa è una pagina placeholder per la ricetta: <strong>{recipe.title}</strong>.
              </p>
              <p>
                ID della ricetta dall'URL: <strong>{recipeId}</strong>
              </p>
              <p>
                In un'applicazione reale, qui useresti l'ID (<code>{recipeId}</code>) per recuperare i dati completi della ricetta da un database o API e renderizzeresti i dettagli effettivi.
              </p>
               <p>
                   Potresti riutilizzare i componenti <code>IngredientsSection</code> e <code>InstructionsSection</code> qui, passando i dati completi della ricetta recuperati.
               </p>
            </div>
          </article>
        ) : (
          <div className="text-center py-10 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-700">Recipe Not Found</h1>
            <p className="text-gray-500 mt-2">
              Spiacenti, non è stata trovata nessuna ricetta con l'ID: <code>{recipeId}</code> nei dati mock.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    const ids = mockRecipeCardDataArray.map(recipe => {
        const parts = recipe.href.split('/');
        return parts[parts.length - 1];
    }).filter(id => id !== ''); 

    return ids.map(id => ({
        id: id,
    }));
}