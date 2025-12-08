import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ricette = sqliteTable("ricette", {
  url: text("URL").primaryKey(),
  titolo: text("Titolo"),
  presentazione: text("Presentazione"),
  caloriePerPorzione: integer("Calorie_per_porzione"),
  difficolta: text("Difficolta"),
  dosiPer: integer("Dosi_per"),
  preparazione: text("Preparazione"),
  cottura: text("Cottura"),
  costo: text("Costo"),
  ingredienti: text("Ingredienti"),
  ingredients: text("Ingredients"),
  istruzioni: text("Istruzioni"),
  immagineUrl: text("Immagine_URL"),
  calorieCalcolate: integer("Calorie_calcolate"),
  tipologiaDieta: text("Tipologia_dieta"),
  tipologiaPiatti: text("Tipologia_piatti"),
  ingredientsJson: text("Ingredients_JSON"),
  tempoPreparazioneTotale: integer("Tempo_preparazione_totale"),
  ingredientiJson: text("Ingredienti_JSON"),
  calorieTotaliPorzione: real("Calorie_totali_porzione"),
  proteineTotaliPorzioneG: real("Proteine_totali_porzione_G"),
  grassiTotaliPorzioneG: real("Grassi_totali_porzione_G"),
  cholesteroloTotalePorzioneMg: real("Cholesterolo_totale_porzione_MG"),
});

export const ingredienti = sqliteTable("ingredienti", {
  nomeIngrediente: text("Nome_ingrediente").primaryKey(),
  descrizioneUsda: text("Descrizione_USDA"),
  usdaMatch: integer("USDA_match", { mode: "boolean" }), // SQLite stores bools as 0/1
  similarityScore: real("Similarity_score"),
  energiaKcal: real("Energy_KCAL"),
});
