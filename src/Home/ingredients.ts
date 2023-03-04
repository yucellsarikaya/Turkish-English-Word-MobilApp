export interface Ingredient {
  icon: string;
  label: string;
}

export const allIngredients = [
  { icon: "🏠", label: "Anasayfa", index: "1" },
  { icon: "🌍", label: "Tüm Kelimeler", index: "2" },
  { icon: "✅", label: "Doğru Bildiklerim", index: "3" },
  { icon: "❌", label: "Yanlış Bildiklerim", index: "4" },
  { icon: "📧", label: "İletişim", index: "5" },
];

const [Home, Words, True, False, Support] = allIngredients;
export const initialTabs = [Home, Words, True, False, Support];

export function getNextIngredient(
  ingredients: Ingredient[]
): Ingredient | undefined {
  const existing = new Set(ingredients);
  return allIngredients.find((ingredient) => !existing.has(ingredient));
}
