"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteFavRecipe } from "./DeleteFavRecipe";

import {
  Card,
  CardFooter,
  Button,
  Chip,
  Separator,
  Tooltip,
} from "@heroui/react";
import {
  FiHeart,
  FiEye,
  FiUser,
  FiTag,
  FiCalendar,
  FiFolderMinus,
} from "react-icons/fi";

const UserFavoritesPage = ({ favoriteRecipes }) => {
  const router = useRouter();

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-6xl mx-auto sm:px-6 lg:px-8 bg-transparent">
      {/* ================= Page Header ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-default-200/60">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight sm:text-3xl">
              Favorite Recipes
            </h1>
            <Chip
              variant="flat"
              className="bg-orange-500/10 text-orange-600 dark:text-orange-400 font-black text-xs h-6"
            >
              {favoriteRecipes.length}{" "}
              {favoriteRecipes.length === 1 ? "Item" : "Items"}
            </Chip>
          </div>
          <p className="text-sm text-foreground/60">
            Your personally curated collection of master-class culinary
            artworks.
          </p>
        </div>
      </div>

      {/* ================= Empty State (if no favorite recipes exist) ================= */}
      <AnimatePresence>
        {favoriteRecipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-12 rounded-[2rem] border border-dashed border-default-200 bg-default-50/10 min-h-87.5"
          >
            <div className="p-4 rounded-2xl bg-default-100 text-default-400 mb-4 inline-flex">
              <FiFolderMinus size={32} />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              No Saved Favorites Yet
            </h3>
            <p className="text-sm text-foreground/50 max-w-sm mt-1 mb-6">
              Explore the FlavorFlow feed and click the heart icon on recipes
              that inspire your kitchen adventures.
            </p>
            <Button
              radius="xl"
              onClick={() => router.push("/dashboard/recipes")}
              className="font-bold bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 px-6 h-11 text-xs uppercase tracking-wider"
            >
              Browse Recipes
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= Premium Glass-Morphs Recipe Grid Layout ================= */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {favoriteRecipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Card className="bg-background/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-default-200/60 rounded-3xl shadow-md hover:shadow-xl transition-all group overflow-hidden h-full flex flex-col justify-between">
                {/* ================= Card Header ================= */}
                <Card.Content className="p-0 relative overflow-hidden aspect-video min-h-45 bg-default-100">
                  <Image
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />

                  <div className="absolute top-3 left-3 z-10">
                    <Chip className="bg-black/60 dark:bg-zinc-900/80 backdrop-blur-md text-white text-[10px] font-black border border-white/10 px-2.5 h-6 uppercase tracking-wider">
                      <FiTag size={10} />
                      {recipe.category}
                    </Chip>
                  </div>
                </Card.Content>

                {/* ================= Card Content and Metadata Info ================= */}
                <div className="p-5 flex-1 space-y-3.5">
                  <h3 className="text-lg font-extrabold text-foreground tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {recipe.recipeName}
                  </h3>

                  <Separator className="bg-default-200/50" />

                  <div className="space-y-2 text-xs font-medium text-foreground/70">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-orange-500 shrink-0" size={14} />
                      <span>
                        Chef:{" "}
                        <span className="font-bold text-foreground">
                          {recipe.authorName}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar
                        className="text-orange-500 shrink-0"
                        size={14}
                      />
                      <span>
                        Added on:{" "}
                        <span className="text-foreground/50">
                          {formatDate(recipe.addedAt)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= Card Footer ================= */}
                <CardFooter className="px-5 pb-5 pt-0 gap-2.5">
                  {/* View Details Button */}
                  <Link href={`/recipes/${recipe.recipeId}`}>
                    <Button
                      size="sm"
                      radius="xl"
                      variant="flat"
                      className="flex-1 font-bold bg-default-100 hover:bg-default-200 text-foreground text-xs"
                    >
                      <FiEye size={14} />
                      View Details
                    </Button>
                  </Link>

                  <Tooltip
                    content="Remove from Favorites"
                    color="danger"
                    radius="xl"
                    closeDelay={0}
                  >
                    <DeleteFavRecipe
                      recipeId={recipe?.recipeId}
                      recipeName={recipe?.recipeName}
                    />
                  </Tooltip>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UserFavoritesPage;
