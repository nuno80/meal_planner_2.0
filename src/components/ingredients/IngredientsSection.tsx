// @filename: src/components/ingredients/IngredientsSection.tsx
"use client"; 

import { CheckSquare, Minus, Plus, ShoppingCart, Square } from 'lucide-react';
import React, { useState } from 'react';
import { Ingredient, IngredientsData } from './ingredients.types';

interface IngredientsSectionProps {
  data: IngredientsData;
}

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({ data }) => {
  const [servings, setServings] = useState(data.defaultServings);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    data.ingredients.map(ing => ({ ...ing, isChecked: false }))
  );

  const handleServingsChange = (increment: boolean) => {
    setServings(prev => {
      const newServings = increment ? prev + 1 : prev - 1;
      return newServings > 0 ? newServings : 1;
    });
  };

  const handleIngredientToggle = (id: string) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing.id === id ? { ...ing, isChecked: !ing.isChecked } : ing
      )
    );
  };

  const handleAddAllToShoppingList = () => {
    const checkedIngredients = ingredients.filter(ing => ing.isChecked);
    if (checkedIngredients.length > 0) {
      // CORREZIONE: Rimosso il backslash prima dei backtick
      alert(`Added ${checkedIngredients.length} ingredients to shopping list! (Names: ${checkedIngredients.map(i => i.name.split(',')[0]).join(', ')})`);
    } else {
      alert('No ingredients selected to add to shopping list.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg font-sans">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => handleServingsChange(false)}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          disabled={servings <= 1}
          aria-label="Decrease servings"
        >
          <Minus size={20} className="text-gray-600" />
        </button>
        <span className="mx-3 text-sm font-medium text-gray-700">
          Servings: {servings}
        </span>
        <button
          onClick={() => handleServingsChange(true)}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Increase servings"
        >
          <Plus size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
        <span className="text-sm text-gray-500">for {servings} servings</span>
      </div>

      <ul className="space-y-3 mb-6">
        {ingredients.map(ingredient => (
          <li key={ingredient.id} className="flex items-center">
            <button
              onClick={() => handleIngredientToggle(ingredient.id)}
              className="mr-3 p-1 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
              aria-pressed={ingredient.isChecked}
              aria-label={`Mark ${ingredient.name} as ${ingredient.isChecked ? 'unchecked' : 'checked'}`}
            >
              {ingredient.isChecked ? (
                <CheckSquare size={20} className="text-pink-600" />
              ) : (
                <Square size={20} className="text-gray-400 hover:text-gray-600" />
              )}
            </button>
            <span className={`text-sm ${ingredient.isChecked ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {ingredient.name}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAddAllToShoppingList}
        className="w-full flex items-center justify-center px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
      >
        <ShoppingCart size={18} className="mr-2" />
        Add all to shopping list
      </button>
    </div>
  );
};