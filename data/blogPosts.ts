export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-quality-fresh-meat-seafood",
    title: "Best In Quality Fresh Meat & Seafood",
    author: "Ramamoorthi M",
    date: "June 5, 2026",
   excerpt: "Fresh meat and seafood are the cornerstone of a healthy, protein-rich diet — here's how to choose and enjoy the best...",
    content: `Fresh meat and seafood are the cornerstone of a healthy, protein-rich diet. At Groca, we source our meat and seafood directly from trusted farms and fisheries, ensuring you get nothing but the best.

Our seafood is caught fresh daily, and our meat comes from farms that prioritize animal welfare and sustainable practices. When you shop with us, you're not just buying food — you're investing in quality and freshness that you and your family deserve.

Whether you're grilling salmon for a summer barbecue or preparing a hearty stew, our selection has everything you need to create delicious, nutritious meals at home.`,
    image: "/images/blog/blog-1.jpg",
  },
  {
    slug: "best-way-to-eat-dry-fruits-nuts",
    title: "Best Way To Eat Dry Fruits And Nuts",
    author: "Ramamoorthi M",
    date: "June 10, 2026",
   excerpt: "Dry fruits and nuts are nutritional powerhouses, packed with healthy fats, fiber, and essential vitamins...",
    content: `Dry fruits and nuts are nutritional powerhouses, packed with healthy fats, fiber, vitamins, and minerals. Adding a handful to your daily diet can boost energy, support heart health, and keep you feeling full longer.

For the best results, try soaking almonds and walnuts overnight — this makes them easier to digest and enhances their nutrient absorption. Mix a variety of nuts and dried fruits together for a balanced, satisfying snack.

Avoid overeating, though — nuts are calorie-dense, so a small handful a day is usually enough to enjoy their benefits without overdoing it.`,
    image: "/images/blog/blog-2.jpg",
  },
  {
    slug: "fruits-vegetable-nutrients-for-health",
    title: "Fruits & Vegetable Nutrients For Your Health",
    author: "Ramamoorthi M",
    date: "June 8, 2026",
   excerpt: "Fruits and vegetables are essential to a balanced diet, offering vitamins, minerals, and antioxidants...",
    content: `Fruits and vegetables are essential to a balanced diet, offering a wide range of vitamins, minerals, and antioxidants that support overall health. Eating a colorful variety ensures you get a broad spectrum of nutrients.

Leafy greens like spinach and kale are rich in iron and vitamin K, while citrus fruits provide a strong dose of vitamin C to support your immune system. Root vegetables like carrots and beets are great sources of fiber and natural sweetness.

Aim for at least five servings of fruits and vegetables a day to keep your body nourished, energized, and functioning at its best.`,
    image: "/images/blog/blog-3.jpg",
  },
];