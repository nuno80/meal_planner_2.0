export interface Ingredient {
id: string;
name: string;
isChecked?: boolean;
}
export interface IngredientsData {
defaultServings: number;
ingredients: Ingredient[];
}
