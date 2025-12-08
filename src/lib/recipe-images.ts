export const FALLBACK_FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", // Salad bowl
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", // Pizza
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80", // Pancakes
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80", // Sandwich/Egg
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80", // Toast/Breakfast
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80", // Pasta
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80", // Healthy bowl
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", // Steak/Food
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80", // Food spread
  "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80", // Soup
];

export function getRecipeImage(dbUrl: string | null, title: string | null): string {
  // 1. If we have a valid external URL, use it
  if (dbUrl && (dbUrl.startsWith('http://') || dbUrl.startsWith('https://'))) {
    return dbUrl;
  }

  // 2. Otherwise, pick a consistent image from our fallback list using the title hash
  const safeTitle = title || 'recipe';
  let hash = 0;
  for (let i = 0; i < safeTitle.length; i++) {
    hash = safeTitle.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % FALLBACK_FOOD_IMAGES.length;
  return FALLBACK_FOOD_IMAGES[index];
}
