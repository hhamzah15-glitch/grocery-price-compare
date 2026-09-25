/* ==========================================================================
   Grocery Price Comparison — Malaysia
   ==========================================================================

   All price data lives in this one file, mirroring the same pattern used
   in the "Haris's Mandarin" app: everything the site shows is built from
   this array, so keeping it up to date is just editing here.

   STARTING DATA NOTE:
   The prices below are a *starter dataset* — anchored to real prices found
   for a handful of items (e.g. rice, cooking oil, sugar, salt at Jaya
   Grocer) at the time this was built, with the remaining items and stores
   estimated from typical Malaysian retail pricing and each chain's usual
   market positioning (NSK/Lotus's skew cheaper, AEON mid-range, Jaya
   Grocer/Village Grocer skew premium). They are NOT live-scraped prices.
   Treat this as a template to replace with real prices from receipts or
   each store's own site — see README.md for how.

   HOW TO UPDATE:
   1. Edit the `price` for any item/store pair below (or add a new item to
      ITEMS, following the same shape).
   2. Bump LAST_SYNCED at the bottom of this file to today's date.
   3. Commit and push (or upload this file via GitHub's web interface) —
      GitHub Pages redeploys automatically within a minute or two.
   ========================================================================== */

const STORES = [
  { id: "lotuss", name: "Lotus's", shortName: "Lotus's" },
  { id: "jayagrocer", name: "Jaya Grocer", shortName: "Jaya Grocer" },
  { id: "aeon", name: "AEON", shortName: "AEON" },
  { id: "villagegrocer", name: "Village Grocer", shortName: "Village Grocer" },
  { id: "nsk", name: "NSK", shortName: "NSK" },
];

const CATEGORIES = [
  { id: "staples", title: "Pantry Staples", icon: "🍚" },
  { id: "dairy", title: "Dairy, Eggs & Bread", icon: "🥚" },
  { id: "beverages", title: "Beverages", icon: "☕" },
  { id: "household", title: "Household & Personal Care", icon: "🧴" },
];

/**
 * Each item:
 *  id           unique slug
 *  name         display name
 *  category     one of CATEGORIES[].id
 *  unit         pack size shown to the user (assumed same size at every
 *               store, so the comparison is apples-to-apples)
 *  prices       { storeId: price in RM }
 *  source       where this starting price came from ("researched" =
 *               grounded in an actual product page found during setup;
 *               "estimated" = modelled from typical MY retail pricing)
 */
const ITEMS = [
  // ---- Pantry Staples ----------------------------------------------------
  {
    id: "rice-white-5kg",
    name: "White Rice",
    category: "staples",
    unit: "5kg bag",
    prices: { lotuss: 22.90, jayagrocer: 26.90, aeon: 24.50, villagegrocer: 27.90, nsk: 21.90 },
    source: "researched",
  },
  {
    id: "rice-fragrant-5kg",
    name: "Fragrant (Jasmine) Rice",
    category: "staples",
    unit: "5kg bag",
    prices: { lotuss: 26.90, jayagrocer: 28.99, aeon: 27.50, villagegrocer: 29.90, nsk: 25.90 },
    source: "researched",
  },
  {
    id: "cooking-oil-2kg",
    name: "Cooking Oil (Vegetable Blend)",
    category: "staples",
    unit: "2kg bottle",
    prices: { lotuss: 15.90, jayagrocer: 14.99, aeon: 16.20, villagegrocer: 17.50, nsk: 15.50 },
    source: "researched",
  },
  {
    id: "sugar-1kg",
    name: "Fine Sugar",
    category: "staples",
    unit: "1kg pack",
    prices: { lotuss: 2.85, jayagrocer: 2.95, aeon: 2.90, villagegrocer: 3.10, nsk: 2.85 },
    source: "researched",
  },
  {
    id: "flour-1kg",
    name: "Plain Flour",
    category: "staples",
    unit: "1kg pack",
    prices: { lotuss: 2.60, jayagrocer: 2.90, aeon: 2.75, villagegrocer: 3.00, nsk: 2.55 },
    source: "estimated",
  },
  {
    id: "salt-400g",
    name: "Fine Table Salt",
    category: "staples",
    unit: "400g pack",
    prices: { lotuss: 0.95, jayagrocer: 0.95, aeon: 0.95, villagegrocer: 1.10, nsk: 0.90 },
    source: "researched",
  },
  {
    id: "instant-noodles-5pack",
    name: "Instant Noodles",
    category: "staples",
    unit: "5-pack",
    prices: { lotuss: 5.20, jayagrocer: 5.90, aeon: 5.50, villagegrocer: 6.20, nsk: 5.00 },
    source: "estimated",
  },
  {
    id: "canned-sardines-425g",
    name: "Canned Sardines in Tomato Sauce",
    category: "staples",
    unit: "425g can",
    prices: { lotuss: 4.80, jayagrocer: 5.40, aeon: 5.10, villagegrocer: 5.60, nsk: 4.70 },
    source: "estimated",
  },
  {
    id: "canned-baked-beans-425g",
    name: "Canned Baked Beans",
    category: "staples",
    unit: "425g can",
    prices: { lotuss: 4.50, jayagrocer: 4.50, aeon: 4.60, villagegrocer: 5.20, nsk: 4.30 },
    source: "estimated",
  },
  {
    id: "canned-tuna-185g",
    name: "Canned Tuna Chunks in Oil",
    category: "staples",
    unit: "185g can",
    prices: { lotuss: 4.20, jayagrocer: 4.80, aeon: 4.50, villagegrocer: 5.00, nsk: 4.10 },
    source: "estimated",
  },
  {
    id: "soy-sauce-640ml",
    name: "Light Soy Sauce",
    category: "staples",
    unit: "640ml bottle",
    prices: { lotuss: 6.90, jayagrocer: 7.50, aeon: 7.20, villagegrocer: 7.90, nsk: 6.70 },
    source: "estimated",
  },
  {
    id: "ketchup-340g",
    name: "Tomato Ketchup",
    category: "staples",
    unit: "340g bottle",
    prices: { lotuss: 3.90, jayagrocer: 4.40, aeon: 4.10, villagegrocer: 4.60, nsk: 3.90 },
    source: "estimated",
  },
  {
    id: "stock-cubes-60g",
    name: "Chicken Stock Cubes",
    category: "staples",
    unit: "60g (6 cubes)",
    prices: { lotuss: 3.20, jayagrocer: 3.60, aeon: 3.40, villagegrocer: 3.80, nsk: 3.20 },
    source: "estimated",
  },

  // ---- Dairy, Eggs & Bread ------------------------------------------------
  {
    id: "eggs-grade-a-30s",
    name: "Eggs (Grade A)",
    category: "dairy",
    unit: "tray of 30",
    prices: { lotuss: 12.90, jayagrocer: 14.50, aeon: 13.80, villagegrocer: 15.20, nsk: 12.50 },
    source: "researched",
  },
  {
    id: "fresh-milk-1l",
    name: "Fresh Milk (Full Cream)",
    category: "dairy",
    unit: "1L carton",
    prices: { lotuss: 7.90, jayagrocer: 8.90, aeon: 8.30, villagegrocer: 9.20, nsk: 7.80 },
    source: "researched",
  },
  {
    id: "uht-milk-1l",
    name: "UHT Milk",
    category: "dairy",
    unit: "1L carton",
    prices: { lotuss: 6.50, jayagrocer: 7.20, aeon: 6.90, villagegrocer: 7.50, nsk: 6.40 },
    source: "estimated",
  },
  {
    id: "butter-250g",
    name: "Butter",
    category: "dairy",
    unit: "250g block",
    prices: { lotuss: 9.90, jayagrocer: 11.50, aeon: 10.50, villagegrocer: 12.00, nsk: 9.70 },
    source: "estimated",
  },
  {
    id: "bread-white-loaf",
    name: "White Bread Loaf",
    category: "dairy",
    unit: "400g loaf",
    prices: { lotuss: 3.60, jayagrocer: 4.20, aeon: 3.90, villagegrocer: 4.50, nsk: 3.50 },
    source: "estimated",
  },
  {
    id: "bread-wholemeal-loaf",
    name: "Wholemeal Bread Loaf",
    category: "dairy",
    unit: "400g loaf",
    prices: { lotuss: 4.50, jayagrocer: 5.20, aeon: 4.90, villagegrocer: 5.50, nsk: 4.40 },
    source: "estimated",
  },
  {
    id: "cheese-slices-200g",
    name: "Cheese Slices",
    category: "dairy",
    unit: "200g (10 slices)",
    prices: { lotuss: 8.90, jayagrocer: 9.90, aeon: 9.40, villagegrocer: 10.50, nsk: 8.90 },
    source: "estimated",
  },

  // ---- Beverages -----------------------------------------------------------
  {
    id: "coffee-3in1-20s",
    name: "3-in-1 Instant Coffee",
    category: "beverages",
    unit: "20 sachets",
    prices: { lotuss: 9.90, jayagrocer: 10.90, aeon: 10.40, villagegrocer: 11.20, nsk: 9.70 },
    source: "estimated",
  },
  {
    id: "tea-bags-25s",
    name: "Tea Bags",
    category: "beverages",
    unit: "25 bags",
    prices: { lotuss: 5.90, jayagrocer: 6.90, aeon: 6.40, villagegrocer: 7.20, nsk: 5.90 },
    source: "estimated",
  },
  {
    id: "mineral-water-1.5l-6pack",
    name: "Mineral Water",
    category: "beverages",
    unit: "1.5L x 6",
    prices: { lotuss: 8.90, jayagrocer: 9.90, aeon: 9.40, villagegrocer: 10.20, nsk: 8.70 },
    source: "estimated",
  },
  {
    id: "orange-juice-1l",
    name: "Orange Juice",
    category: "beverages",
    unit: "1L carton",
    prices: { lotuss: 7.90, jayagrocer: 9.20, aeon: 8.50, villagegrocer: 9.50, nsk: 7.80 },
    source: "estimated",
  },
  {
    id: "soft-drink-1.5l",
    name: "Soft Drink (Cola)",
    category: "beverages",
    unit: "1.5L bottle",
    prices: { lotuss: 4.50, jayagrocer: 5.00, aeon: 4.80, villagegrocer: 5.20, nsk: 4.50 },
    source: "estimated",
  },

  // ---- Household & Personal Care -------------------------------------------
  {
    id: "laundry-detergent-2kg",
    name: "Laundry Detergent Powder",
    category: "household",
    unit: "2kg box",
    prices: { lotuss: 16.90, jayagrocer: 18.90, aeon: 17.80, villagegrocer: 19.50, nsk: 16.50 },
    source: "estimated",
  },
  {
    id: "dishwashing-liquid-900ml",
    name: "Dishwashing Liquid",
    category: "household",
    unit: "900ml bottle",
    prices: { lotuss: 6.90, jayagrocer: 7.90, aeon: 7.40, villagegrocer: 8.20, nsk: 6.80 },
    source: "estimated",
  },
  {
    id: "toilet-paper-10rolls",
    name: "Toilet Paper",
    category: "household",
    unit: "10 rolls",
    prices: { lotuss: 13.90, jayagrocer: 15.90, aeon: 14.90, villagegrocer: 16.50, nsk: 13.50 },
    source: "estimated",
  },
  {
    id: "facial-tissue-box",
    name: "Facial Tissue Box (3-ply)",
    category: "household",
    unit: "1 box",
    prices: { lotuss: 4.90, jayagrocer: 5.50, aeon: 5.20, villagegrocer: 5.90, nsk: 4.80 },
    source: "estimated",
  },
  {
    id: "handwash-500ml",
    name: "Hand Soap / Handwash",
    category: "household",
    unit: "500ml bottle",
    prices: { lotuss: 6.50, jayagrocer: 7.50, aeon: 7.00, villagegrocer: 7.90, nsk: 6.40 },
    source: "estimated",
  },
  {
    id: "shampoo-400ml",
    name: "Shampoo",
    category: "household",
    unit: "400ml bottle",
    prices: { lotuss: 14.90, jayagrocer: 16.90, aeon: 15.90, villagegrocer: 17.50, nsk: 14.90 },
    source: "estimated",
  },
  {
    id: "toothpaste-150g",
    name: "Toothpaste",
    category: "household",
    unit: "150g tube",
    prices: { lotuss: 6.90, jayagrocer: 7.90, aeon: 7.40, villagegrocer: 8.20, nsk: 6.80 },
    source: "estimated",
  },
  {
    id: "all-purpose-cleaner-500ml",
    name: "All-Purpose Cleaner Spray",
    category: "household",
    unit: "500ml bottle",
    prices: { lotuss: 7.90, jayagrocer: 8.90, aeon: 8.40, villagegrocer: 9.20, nsk: 7.80 },
    source: "estimated",
  },
  {
    id: "trash-bags-30ct",
    name: "Trash Bags",
    category: "household",
    unit: "roll of 30",
    prices: { lotuss: 8.90, jayagrocer: 9.90, aeon: 9.40, villagegrocer: 10.50, nsk: 8.70 },
    source: "estimated",
  },
  {
    id: "bleach-1l",
    name: "Bleach",
    category: "household",
    unit: "1L bottle",
    prices: { lotuss: 4.90, jayagrocer: 5.60, aeon: 5.20, villagegrocer: 5.90, nsk: 4.80 },
    source: "estimated",
  },
];

// Bump this every time you update prices above.
const LAST_SYNCED = "2026-09-25";
