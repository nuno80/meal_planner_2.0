import { IngredientsData } from '../components/ingredients/ingredients.types';
import { InstructionsData } from '../components/instructions/instructions.types';
import { RecipeCardData } from '../components/recipeCard/recipeCard.types';
import { RecipeHeaderData as ImportedRecipeHeaderData } from '../components/RecipeDetailHeader'; // Assuming this is the path to your original header component's types
// --- Mock Data for Ingredients Section ---
export const mockIngredientsData: IngredientsData = {
defaultServings: 4,
ingredients: [
{ id: 'ing1', name: '250 g chickpeas, cooked' },
{ id: 'ing2', name: '150 g carrots, peeled' },
{ id: 'ing3', name: '2 eggs' },
{ id: 'ing4', name: '100 g breadcrumbs' },
{ id: 'ing5', name: '250 g spinach' },
{ id: 'ing6', name: '130 g red onion, peeled' },
{ id: 'ing7', name: '65 g Parmigiano Reggiano, grated (or vegetarian alternative)' },
{ id: 'ing8', name: '2 tbsp extra virgin olive oil' },
{ id: 'ing9', name: '1 tsp salt' },
],
};
// --- Mock Data for Instructions Section ---
export const mockInstructionsData: InstructionsData = {
steps: [
{
id: 'step1',
stepNumber: 1,
description: 'In a food processor, blend the chickpeas until they form a coarse mixture.',
imageUrl: 'https://placehold.co/600x400/E99F97/333333?text=Step+1+Image&font=lora',
imageAlt: 'Blending chickpeas',
isCompleted: false,
},
{
id: 'step2',
stepNumber: 2,
description: 'Finely chop the carrots, spinach, and red onion. Add them to a large mixing bowl.',
isCompleted: false,
},
{
id: 'step3',
stepNumber: 3,
description: 'Add the chickpea mixture, breadcrumbs, grated Parmigiano, and eggs to the bowl. Season with salt and mix thoroughly until well combined.',
isCompleted: false,
},
{
id: 'step4',
stepNumber: 4,
description: 'With slightly wet hands, form the mixture into small balls about the size of a golf ball.',
isCompleted: false,
},
],
};
// --- Mock Data for Recipe Cards ---
export const mockRecipeCardDataArray: RecipeCardData[] = [
{
id: 'rc1',
imageUrl: 'https://placehold.co/400x300/E99F97/333333?text=Polpette&font=lora',
imageAlt: 'Vegetarian Polpette',
rating: 4.5,
title: 'Vegetarian Polpette with Yogurt Dip',
tags: [{ label: 'Vegetarian' }, { label: 'Italian' }, { label: 'Appetizer' }],
time: '70 min',
difficulty: 'Easy',
calories: '79 kcal',
href: '/recipes/vegetarian-polpette',
},
{
id: 'rc2',
imageUrl: 'https://placehold.co/400x300/A8D8B9/333333?text=Quinoa+Bowl&font=lora',
imageAlt: 'Mediterranean Quinoa Bowl',
rating: 4.2,
title: 'Mediterranean Quinoa Bowl with Roasted Vegetables',
tags: [{ label: 'Vegan' }, { label: 'Gluten-Free' }, { label: 'Healthy' }, {label: '+1', type: 'neutral'}],
time: '40 min',
difficulty: 'Medium',
calories: '320 kcal',
href: '/recipes/quinoa-bowl',
},
{
id: 'rc3',
imageUrl: 'https://placehold.co/400x300/F3B5A5/333333?text=Curry+Soup&font=lora',
imageAlt: 'Spicy Thai Coconut Curry Soup',
rating: 4.8,
title: 'Spicy Thai Coconut Curry Soup',
tags: [{ label: 'Thai' }, { label: 'Spicy' }, { label: 'Dinner' }, {label: '+1', type: 'neutral'}],
time: '50 min',
difficulty: 'Hard',
calories: '410 kcal',
href: '/recipes/thai-curry-soup',
},
{
id: 'rc4',
imageUrl: 'https://placehold.co/400x300/CAD9E1/333333?text=Mushrooms&font=lora',
imageAlt: 'Spinach and Ricotta Stuffed Mushrooms',
title: 'Spinach and Ricotta Stuffed Mushrooms',
tags: [],
time: '45 min',
difficulty: 'Easy',
href: '/recipes/stuffed-mushrooms',
},
{
id: 'rc5',
imageUrl: 'https://placehold.co/400x300/D8E2DC/333333?text=Fritters&font=lora',
imageAlt: 'Vegetable Fritters with Yogurt Sauce',
title: 'Vegetable Fritters with Yogurt Sauce',
tags: [],
time: '35 min',
difficulty: 'Easy',
href: '/recipes/vegetable-fritters',
},
];
// --- Mock Data for Full Page Example (used in showcase) ---
// Assuming RecipeHeaderData is defined in your original RecipeDetailHeader component file
// For this example, let's define a compatible structure or import it.
// If RecipeDetailHeader.tsx is at src/components/RecipeDetailHeader.tsx
// and exports RecipeHeaderData
export type RecipeHeaderData = ImportedRecipeHeaderData;
export const mockRecipeHeaderData: RecipeHeaderData = {
id: 'vegetarian-polpette-1',
breadcrumbs: [
{ name: 'Home', href: '/' },
{ name: 'Recipes', href: '/recipes' },
{ name: 'Appetizers', href: '/recipes/appetizers' },
],
title: 'Vegetarian Polpette with Yogurt Dip',
rating: 4.5,
reviewCount: 124,
description:
"These vegetarian polpette are a delicious and light alternative to traditional meat-based ones. Made with a flavorful mix of vegetables, they're crispy on the outside and soft on the inside, perfect as an appetizer or main dish.",
details: {
prepTime: '30 min',
cookTime: '40 min',
servings: '4 +',
difficulty: 'Easy',
},
tags: ['Vegetarian', 'Italian', 'Appetizer', 'Healthy', 'Party Food'],
nutrition: {
kcal: 79,
protein: '12g',
carbs: '24g',
},
imageUrl: 'https://placehold.co/600x800/E99F97/333333?text=Recipe+Image&font=lora',
imageAlt: 'Vegetarian Polpette',
};
