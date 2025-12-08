import { ChevronRight, Clock, Flame, Star, Users } from 'lucide-react';
import React from 'react';
import { RecipeDetailHeaderProps } from './recipeDetailHeader.types';

const RecipeDetailHeader: React.FC<RecipeDetailHeaderProps> = ({ recipe }) => {
  return (
    <div className="bg-white border-b">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
        {recipe.breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight size={14} />}
            <span className={index === recipe.breadcrumbs.length - 1 ? "font-semibold text-gray-800" : ""}>
              {crumb.name}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="container mx-auto px-4 pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {recipe.title}
            </h1>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center text-yellow-500">
                <Star className="fill-current" size={18} />
                <span className="ml-1 font-bold text-gray-900">{recipe.rating}</span>
                <span className="text-gray-500 ml-1">({recipe.reviewCount} reviews)</span>
              </div>
              <div className="text-gray-400">|</div>
              <div className="flex gap-2">
                {recipe.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              {recipe.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-100">
              <div className="flex flex-col items-center p-3 bg-pink-50 rounded-xl">
                <Clock className="text-pink-600 mb-2" size={24} />
                <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Time</span>
                <span className="font-bold text-gray-900">{recipe.details.prepTime}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-green-50 rounded-xl">
                <Users className="text-green-600 mb-2" size={24} />
                <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Servings</span>
                <span className="font-bold text-gray-900">{recipe.details.servings}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl">
                <Flame className="text-orange-600 mb-2" size={24} />
                <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Calories</span>
                <span className="font-bold text-gray-900">{recipe.nutrition.kcal}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={recipe.imageUrl}
              alt={recipe.imageAlt}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetailHeader;
