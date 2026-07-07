"use client";

import { motion } from "framer-motion";
import { Flame, UtensilsCrossed } from "lucide-react";
import RecipeCard from "../shared/RecipeCard";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

// isLoading = false 
export default function PopularRecipes({ recipes, isLoading = false }) {
  const hasRecipes = recipes && recipes.length > 0;

  return (
    <div className="w-full py-20 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-transparent">
      {/* ================= Header Section ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500/10 to-orange-500/10 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-orange-500/20">
            <Flame className="w-3.5 h-3.5 fill-current animate-pulse" /> 🔥
            Popular Recipes
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Most Loved Recipes by Our Community
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Discover the recipes receiving the highest appreciation from food
            lovers around the world.
          </p>
        </div>
        {!isLoading && hasRecipes && (
          <Link
            href="/recipes"
            className="flex items-center justify-center bg-linear-to-r from-orange-500 to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl px-6 h-12 shadow-lg"
          >
            View All Recipes
          </Link>
        )}
      </motion.div>

      {/* ================= Three-Way Conditional Rendering ================= */}
      {isLoading ?
       
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[...Array(3)].map((_, index) => (
            <motion.div variants={itemVariants} key={`skeleton-${index}`}>
              <RecipeCard isLoading={true} />
            </motion.div>
          ))}
        </motion.div>
      : hasRecipes ?
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {recipes.map((recipe, index) => (
            <motion.div variants={itemVariants} key={recipe._id}>
              <RecipeCard recipe={recipe} variant="popular" rank={index + 1} />
            </motion.div>
          ))}
        </motion.div>
      : 
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex flex-col items-center justify-center text-center py-20 px-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800/80 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/20 max-w-xl mx-auto mt-6"
        >
          <div className="p-4 rounded-2xl bg-linear-to-br from-orange-500/10 to-rose-500/10 text-orange-500 mb-5">
            <UtensilsCrossed className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            No Popular Recipes Found
          </h3>
       
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm font-medium leading-relaxed">
            It looks like there aren&apos;t any recipes trending at the moment.
            Try checking back later or explore other delicious content!
          </p>
          <Link
            href="/recipes"
            className="mt-6 flex items-center justify-center bg-linear-to-r from-orange-500 to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl px-6 h-11 shadow-md shadow-orange-500/10 active:scale-98 transition-all"
          >
            Explore All Recipes
          </Link>
        </motion.div>
      }
    </div>
  );
}