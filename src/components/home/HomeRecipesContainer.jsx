"use client";

import { useState, useEffect } from "react";
import { Skeleton, Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import FeaturedRecipes from "./FeaturedRecipes";
import PopularRecipes from "./PopularRecipes";
import { getFeatureAndPopularRecipe } from "../../lib/api/recipes";

export default function HomeRecipesContainer() {
  const [data, setData] = useState({ featuredRecipes: [], popularRecipes: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeRecipes = async () => {
      try {
        const resData = await getFeatureAndPopularRecipe();

        if (resData.success) {
          setData({
            featuredRecipes: resData.featuredRecipes || [],
            popularRecipes: resData.popularRecipes || [],
          });
        }
      } catch (error) {
        console.error("Failed to load recipes architecture:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeRecipes();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-16 px-4 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    );
  }

  const hasNoData =
    data.featuredRecipes.length === 0 && data.popularRecipes.length === 0;

  if (hasNoData) {
    return <GlobalEmptyState />;
  }

  return (
    <section className="w-full py-16 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-transparent">
      {data.featuredRecipes.length > 0 && (
        <FeaturedRecipes recipes={data.featuredRecipes} />
      )}
      {data.popularRecipes.length > 0 && (
        <PopularRecipes recipes={data.popularRecipes} />
      )}
    </section>
  );
}

function SkeletonCard() {
  return (
    <Card className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] space-y-4">
      <Skeleton className="rounded-[1.75rem] aspect-video w-full" />
      <div className="space-y-3 px-2">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-8 rounded-xl" />
          <Skeleton className="h-8 rounded-xl" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl pt-2" />
      </div>
    </Card>
  );
}

function GlobalEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center text-center p-12 min-h-100"
    >
      <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-400 mb-4">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
        No Premium Recipes Found
      </h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mt-2 mb-6">
        Recipes with featured tags or high votes will automatically sync right
        here.
      </p>
      <Button className="bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold rounded-xl px-6 h-11 shadow-md">
        Browse Catalog
      </Button>
    </motion.div>
  );
}
