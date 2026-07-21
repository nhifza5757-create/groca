export type Collection = {
  name: string;
  slug: string;
  image: string;
};

export const collections: Collection[] = [
  { name: "Fruits", slug: "fruits", image: "/images/categories/fruits.jpg" },
  { name: "Vegetables", slug: "vegetables", image: "/images/categories/vegetables.jpg" },
  { name: "Grain Foods", slug: "grain-foods", image: "/images/categories/grains.jpg" },
  { name: "Meats", slug: "meats", image: "/images/categories/meats.jpg" },
];