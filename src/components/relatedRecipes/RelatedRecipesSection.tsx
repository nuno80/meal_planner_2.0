"use client";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { RecipeCard } from '../recipeCard/RecipeCard';
import { RecipeCardData } from '../recipeCard/recipeCard.types';

interface RelatedRecipesSectionProps {
  recipes: RecipeCardData[];
  title?: string;
}

export const RelatedRecipesSection: React.FC<RelatedRecipesSectionProps> = ({
  recipes,
  title = "You might also like",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const recipesToShow = 4; // Number of recipes visible at a time on larger screens

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(recipes.length - recipesToShow, prev + 1));
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < recipes.length - recipesToShow && recipes.length > recipesToShow;

  // Calculate the width for each item based on recipesToShow for the transform
  const itemWidthPercentage = recipesToShow > 0 ? 100 / recipesToShow : 100;

  return (
    <div className="py-8 bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {recipes.length > recipesToShow && (
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous related recipes"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next related recipes"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            // CORREZIONE: Rimosso backslash
            style={{ transform: `translateX(-${currentIndex * itemWidthPercentage}%)` }}
          >
            {recipes.map(recipe => (
              // CORREZIONE: Rimosso backslash
              <div key={recipe.id} className="p-2" style={{ flex: `0 0 ${itemWidthPercentage}%` }}>
                <RecipeCard recipe={recipe} variant="compact" />
              </div>
            ))}
          </div>
        </div>

        {recipes.length > recipesToShow && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-pink-600 h-1.5 rounded-full transition-all duration-300" // Modificato bg-gray-500 in bg-pink-600 per coerenza tema
              // CORREZIONE: Rimosso backslash
              style={{ 
                width: `${recipes.length > 0 ? ((currentIndex + recipesToShow) / recipes.length) * 100 : 0}%`,
                maxWidth: '100%' // Aggiunto per sicurezza, per non superare il 100%
              }}
            ></div>
          </div>
        )}
        {recipes.length === 0 && (
          <p className="text-center text-gray-500 py-4">No related recipes found.</p>
        )}
      </div>
    </div>
  );
};