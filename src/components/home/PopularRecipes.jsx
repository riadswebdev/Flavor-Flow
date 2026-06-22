"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Flame, ArrowRight } from "lucide-react";
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

export default function PopularRecipes({ recipes }) {
  return (
    <div className="w-full py-20 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-orange-500/20">
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
        <Link href="/recipes"
          className="flex items-center justify-center bg-linear-to-r from-orange-500 to-rose-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl px-6 h-12 shadow-lg"
        >
          View All Recipes
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {recipes?.map((recipe, index) => (
          <motion.div variants={itemVariants} key={recipe._id}>
            <RecipeCard recipe={recipe} variant="popular" rank={index + 1} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
