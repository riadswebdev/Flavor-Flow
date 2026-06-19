"use client";

import { useEffect, useState } from "react";
import RecipeCard from "@/components/browseJobs/RecipeCard";
import {
  Search,
  Clock,
  ChefHat,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Utensils,
  Globe2,
  ArrowUpDown,
} from "lucide-react";
import { getRecipes } from "@/components/lib/api/recipes";

const CATEGORIES = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snacks",
  "Drinks",
  "Seafood",
  "Vegetarian",
];
const CUISINES = [
  "All Cuisines",
  "Italian",
  "American",
  "Mexican",
  "Japanese",
  "Indian",
  "Thai",
];
const DIFFICULTIES = ["All Difficulties", "Easy", "Medium", "Hard"];
const TIME_OPTIONS = [
  "All Preparation Times",
  "Under 20 mins",
  "20-45 mins",
  "Over 45 mins",
];

export default function BrowseRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cuisine, setCuisine] = useState("All Cuisines");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [prepTime, setPrepTime] = useState("All Preparation Times");
  const [sortBy, setSortBy] = useState("newest");
  // debounced search term state to optimize API calls while typing
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log(totalPages, "total page");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(search);
    }, 600);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Query Params
        const params = new URLSearchParams();
        if (debouncedTerm) params.append("search", debouncedTerm);
        if (activeCategory !== "All") params.append("category", activeCategory);
        if (cuisine !== "All Cuisines") params.append("cuisine", cuisine);
        if (difficulty !== "All Difficulties")
          params.append("difficulty", difficulty);
        if (prepTime !== "All Preparation Times")
          params.append("prepTime", prepTime);
        if (sortBy) params.append("sortBy", sortBy);
        params.append("page", page.toString());

        const data = await getRecipes(params.toString());
console.log("Fetched Recipes Data:", params);
        if (data.success) {
          setRecipes(data.data);
          setTotalPages(data?.totalPages);
          console.log("Fetched Recipes:", data?.data);
          console.log("Total Recipes Count:", data?.totalPages);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [
    debouncedTerm,
    activeCategory,
    cuisine,
    difficulty,
    prepTime,
    sortBy,
    page,
  ]);

  const handleResetFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setCuisine("All Cuisines");
    setDifficulty("All Difficulties");
    setPrepTime("All Preparation Times");
    setSortBy("newest");
    setPage(1);
  };
  console.log(recipes);
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0b0f19] text-neutral-800 dark:text-neutral-200 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-wide uppercase border border-orange-500/20">
            <Sparkles size={12} /> Explore FlavorFlow
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 via-orange-600 to-rose-600 dark:from-white dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
            Browse Recipes
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Discover delicious recipes from our global community of master chefs
            and passionate home cooks.
          </p>
        </div>

        {/* ================= SEARCH & FILTERS CONTROLS ================= */}
        <div className="bg-white/70 dark:bg-[#131b2e]/60 border border-neutral-200/80 dark:border-neutral-800/60 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-6 mb-10">
          {/* Main Search Input */}
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-orange-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by recipe name, ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-neutral-100 dark:bg-[#1a233d]/50 border border-transparent focus:border-orange-500/50 rounded-xl focus:outline-none transition-all text-sm font-medium shadow-inner dark:text-white"
            />
          </div>

          {/* Grid Selection Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cuisine Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                <Globe2 size={12} /> Cuisine
              </label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-2.5 bg-neutral-100 dark:bg-[#1a233d]/70 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 dark:text-neutral-300"
              >
                {CUISINES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                <ChefHat size={12} /> Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2.5 bg-neutral-100 dark:bg-[#1a233d]/70 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 dark:text-neutral-300"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Prep Time Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                <Clock size={12} /> Prep Time
              </label>
              <select
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full p-2.5 bg-neutral-100 dark:bg-[#1a233d]/70 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 dark:text-neutral-300"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                <ArrowUpDown size={12} /> Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 bg-neutral-100 dark:bg-[#1a233d]/70 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium focus:outline-none focus:border-orange-500 dark:text-neutral-300"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="time-low">Time: Low to High</option>
              </select>
            </div>
          </div>

          {/* Horizontal Divider Rule */}
          <div className="h-px bg-neutral-200 dark:bg-neutral-800/80 w-full" />

          {/* Small Horizontal Category Filters Row */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase block">
              Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setPage(1);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    activeCategory === cat ?
                      "bg-gradient-to-r from-orange-500 to-rose-500 border-transparent text-white shadow-md shadow-orange-500/20 scale-105"
                    : "bg-neutral-100 dark:bg-[#1a233d]/50 border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-orange-500/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= META LABELS & RESET CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
              <Utensils size={16} />
            </div>
            <p className="text-sm font-semibold">
              Found{" "}
              <span className="text-orange-500 text-base font-bold">
                {recipes.length}
              </span>{" "}
              Premium Recipes
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wider"
          >
            <SlidersHorizontal size={14} /> Clear All Filters
          </button>
        </div>

        {/* ================= RECIPE GRID CARD LAYOUT ================= */}
        {loading ?
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        : recipes.length === 0 ?
          <div className="text-center py-16 px-4 bg-white/50 dark:bg-[#131b2e]/40 border border-neutral-200/60 dark:border-neutral-800/40 rounded-2xl backdrop-blur-md max-w-md mx-auto shadow-sm">
            <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-500 mb-4 animate-bounce">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-neutral-100">
              কোনো রেসিপি পাওয়া যায়নি!
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              আপনার সার্চ করা কি-ওয়ার্ড বা ফিল্টারটির সাথে মিলছে এমন কোনো উপাদান
              আমাদের কাছে নেই। দয়া করে অন্য কিছু লিখে চেষ্টা করুন।
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
            ></button>
          </div>
        : <RecipeCard MOCK_RECIPES={recipes} />}

        {/* ================= PAGINATION CONTROL CONTROLLER BLOCK ================= */}
        <div className="mt-14 flex items-center justify-center gap-2">
          {/* Previous Arrow Button */}
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2 rounded-xl bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-neutral-800 disabled:opacity-40 hover:border-orange-500 dark:hover:border-orange-500/50 text-neutral-600 dark:text-neutral-400 transition-colors shadow-xs"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Individual Page Number Links */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                page === num ?
                  "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20 scale-105"
                : "bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-orange-500/50"
              }`}
            >
              {num}
            </button>
          ))}

          {/* Next Arrow Button */}
          <button
            onClick={() => setPage((p) => p + 1)}
            className="p-2 rounded-xl bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-orange-500 dark:hover:border-orange-500/50 transition-colors shadow-xs"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
