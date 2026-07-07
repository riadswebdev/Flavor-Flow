"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
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

export default function FeaturedRecipes({ recipes }) {
 
  const hasRecipes = recipes && recipes.length > 0;

  return (
    <div className="mb-20 w-full py-20 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-transparent">
      {/* ================= Header Section ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-orange-100 dark:border-orange-900/30">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> ⭐ Featured
            Recipes
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Discover Our Featured Recipes
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Handpicked recipes selected by our culinary experts. Explore the
            most delicious and trending dishes.
          </p>
        </div>
        {hasRecipes && (
          <Link
            href="/recipes"
            className="flex items-center justify-center bg-linear-to-r from-orange-500 to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl px-6 h-12 shadow-lg"
          >
            View All Recipes
          </Link>
        )}
      </motion.div>

      {/* ================= Conditional Rendering Section ================= */}
      {hasRecipes ?
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {recipes.map((recipe) => (
            <motion.div variants={itemVariants} key={recipe._id}>
              <RecipeCard recipe={recipe} variant="featured" />
            </motion.div>
          ))}
        </motion.div>
      : /* ================= Empty State UI ================= */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex flex-col items-center justify-center text-center py-20 px-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800/80 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/20 max-w-xl mx-auto mt-6"
        >
          <div className="p-4 rounded-2xl bg-linear-to-br from-orange-500/10 to-rose-500/10 text-orange-500 mb-5">
            <Sparkles className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            No Featured Recipes Yet
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm font-medium leading-relaxed">
            Our culinary experts are currently curtaining something special.
            Check back soon for handpicked, premium delicacies!
          </p>
          <Link
            href="/recipes"
            className="mt-6 flex items-center justify-center bg-linear-to-r from-orange-500 to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl px-6 h-11 shadow-md shadow-orange-500/10 active:scale-98 transition-all"
          >
            Explore General Recipes
          </Link>
        </motion.div>
      }
    </div>
  );
}