"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, Avatar, Chip } from "@heroui/react";
import { Utensils, Globe, Clock, ChefHat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe, variant = "featured", rank }) {
  const getRankStyle = (rankNumber) => {
    switch (rankNumber) {
      case 1:
        return "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white font-black shadow-lg shadow-yellow-500/20";
      case 2:
        return "bg-gradient-to-r from-slate-300 via-zinc-400 to-slate-500 text-white font-black shadow-lg shadow-zinc-400/20";
      case 3:
        return "bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-black shadow-lg shadow-amber-700/20";
      default:
        return "bg-zinc-900/80 dark:bg-zinc-800/90 text-zinc-100 font-bold border border-white/10";
    }
  };

  const getRankLabel = (rankNumber) => {
    if (rankNumber === 1) return "🥇 #1";
    if (rankNumber === 2) return "🥈 #2";
    if (rankNumber === 3) return "🥉 #3";
    return `#${rankNumber}`;
  };
  
  return (
    <Card className="group relative h-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl overflow-hidden p-3 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
      {/* ================= Image Section ================= */}
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-inner">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName || "Recipe image"}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="100vw"
          priority={variant === "featured"}
        />

        {variant === "featured" ?
          <div className="absolute top-3 left-3 z-10">
            <Chip className="bg-orange-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 shadow-md border-0 h-6">
              Featured
            </Chip>
          </div>
        : <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (rank || 1) * 0.2,
            }}
            className={`absolute top-3 left-3 z-20 flex items-center justify-center px-3 py-1 rounded-xl text-xs shadow-md ${getRankStyle(rank)}`}
          >
            {getRankLabel(rank)}
          </motion.div>
        }

        <div className="absolute top-3 right-3 z-10">
          <Chip className="bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 h-6 border-0">
            ❤️ {recipe?.likesCount}
          </Chip>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 pt-8 flex flex-col justify-end">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Image
                src={recipe?.author?.avatar}
                alt={recipe?.author?.name || "Author avatar"}
                width={28}
                height={28}
                className="w-7 h-7 rounded-lg border border-white/20 object-contain"
              />
              <span className="text-xs text-white/90 font-bold truncate max-w-30">
                {recipe.author?.name}
              </span>
            </div>
            <Chip className="bg-white/10 backdrop-blur-md text-white border border-white/10 text-[10px] font-bold px-2 h-5">
              {recipe?.category}
            </Chip>
          </div>
        </div>
      </div>

      {/* ================= Card Body Metadata ================= */}
      <CardContent className="px-3 pt-4 pb-2 grow flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug line-clamp-1 group-hover:text-orange-500 transition-colors">
            {recipe?.recipeName}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-xl border border-zinc-100/50 dark:border-zinc-800/30">
              <Utensils className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 truncate">
                {recipe?.category}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-xl border border-zinc-100/50 dark:border-zinc-800/30">
              <Globe className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 truncate">
                {recipe?.cuisineType || "Global"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-xl border border-zinc-100/50 dark:border-zinc-800/30">
              <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 truncate">
                {recipe?.preparationTime || 30} Mins
              </span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-xl border border-zinc-100/50 dark:border-zinc-800/30">
              <ChefHat className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 truncate">
                {recipe?.difficultyLevel || "Easy"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* ================= Card Footer Action ================= */}
      <CardFooter className="px-3 pb-1 pt-2 flex items-center gap-2">
        <Link
          href={`/recipes/${recipe._id}`}
          className="flex items-center justify-center grow bg-linear-to-r from-orange-500 to-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-orange-500/10 h-11 active:scale-98 transition-all"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
