"use client"; // Added "use client" because of interactive buttons
import React from 'react';
import Link from 'next/link'; // Added import for Link
import { Star, Clock, Bookmark } from 'lucide-react';
import { RecipeCardData } from './recipeCard.types';

interface RecipeCardProps {
  recipe: RecipeCardData;
  variant?: 'default' | 'compact';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, variant = 'default' }) => {
  const isCompact = variant === 'compact';

  return (
    <Link href={recipe.href} legacyBehavior>
      <a className="block group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 font-sans h-full flex flex-col">
        <div className="relative">
          <img
            src={recipe.imageUrl}
            alt={recipe.imageAlt}
            className={\`w-full object-cover ${isCompact ? 'h-40' : 'h-48 md:h-56'}\`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/400x300/cccccc/ffffff?text=No+Image&font=lora";
            }}
          />
          {recipe.rating && !isCompact && (
            <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
              <Star size={14} className="mr-1 text-yellow-400 fill-current" />
              {recipe.rating.toFixed(1)}
            </div>
          )}
          <button
            aria-label="Save recipe"
            className="absolute top-3 right-3 bg-black bg-opacity-40 p-2 rounded-full text-white hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => { e.preventDefault(); alert(\`Recipe ${recipe.title} saved! (placeholder)\`); }}
          >
            <Bookmark size={18} />
          </button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className={\`font-bold group-hover:text-pink-600 transition-colors ${isCompact ? 'text-sm mb-1 truncate' : 'text-lg mb-2'}\`}>
            {recipe.title}
          </h3>

          {!isCompact && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className={\`px-2 py-0.5 text-xs font-medium rounded-full
                    ${tag.type === 'neutral' ? 'bg-gray-200 text-gray-700' :
                      tag.type === 'secondary' ? 'bg-blue-100 text-blue-700' :
                        'bg-pink-100 text-pink-700'}\`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}

          <div className={\`flex items-center text-xs text-gray-500 ${isCompact ? 'mb-0' : 'mb-3'} space-x-2\`}>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{recipe.time}</span>
            </div>
            {!isCompact && (
              <>
                <span>•</span>
                <span className={\`capitalize px-1.5 py-0.5 rounded text-xs font-semibold
                    ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'}\`}
                >
                  {recipe.difficulty}
                </span>
                {recipe.calories && (
                  <>
                    <span>•</span>
                    <span>{recipe.calories}</span>
                  </>
                )}
              </>
            )}
          </div>

          {!isCompact && (
            <div className="mt-auto pt-3 flex flex-col sm:flex-row gap-2">
              <!-- This button now acts as part of the main Link -->
              <button type="button" className="flex-1 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-md hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700">
                View Recipe
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); alert(\`Recipe ${recipe.title} 'Add to Plan' clicked! (placeholder)\`); }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Add to Plan
              </button>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};
