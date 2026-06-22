import { ChefHat, Clock, Globe2, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ MOCK_RECIPES }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_RECIPES.map((recipe) => (
        <div
          key={recipe._id}
          className="group bg-white dark:bg-[#131b2e] border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative"
        >
          {/* Card Image Header Component Area */}
          <div className="h-52 w-full relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 aspect-video">
            <Image
              fill
              src={recipe.recipeImage}
              alt={recipe.recipeName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

            {/* Float Badge Category wrapper */}
            <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-extrabold bg-white/90 dark:bg-[#0b0f19]/90 text-orange-600 dark:text-orange-400 uppercase tracking-wider shadow-sm backdrop-blur-xs">
              {recipe.category}
            </span>

            {/* Likes Top-Right Overlay */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-xs font-bold">
              <Heart size={12} className="fill-rose-500 text-rose-500" />
              <span>{recipe.likesCount}</span>
            </div>
          </div>

          {/* Card Body Information Content */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            {/* Info Text Stack Container */}
            <div className="space-y-2">
              <h3 className="font-bold text-lg leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                {recipe.recipeName}
              </h3>

              {/* Author Meta Profile Block */}
              <div className="flex items-center gap-2">
                <img
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  className="w-5 h-5 rounded-full object-cover border border-orange-500/40"
                />
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  By {recipe.author.name}
                </span>
              </div>
            </div>

            {/* Meta Attributes Chips Grid Row */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-100 dark:border-neutral-800/60 text-neutral-600 dark:text-neutral-400 text-xs font-semibold">
              <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-50 dark:bg-[#1a233d]/30 rounded-xl">
                <Clock size={14} className="text-orange-500 mb-0.5" />
                <span>{recipe.preparationTime}m</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-50 dark:bg-[#1a233d]/30 rounded-xl">
                <ChefHat size={14} className="text-rose-500 mb-0.5" />
                <span className="truncate max-w-full">
                  {recipe.difficultyLevel}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-50 dark:bg-[#1a233d]/30 rounded-xl">
                <Globe2 size={14} className="text-blue-500 mb-0.5" />
                <span className="truncate max-w-full">
                  {recipe.cuisineType}
                </span>
              </div>
            </div>

            {/* View Details Client Interactive CTA Button */}
            <Link href={`recipes/${recipe._id}`}>
              <button className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-linear-to-r hover:from-orange-500 hover:to-rose-500 dark:bg-[#1a233d]/60 dark:hover:bg-linear-to-r text-neutral-800 dark:text-neutral-300 font-bold text-xs uppercase tracking-wider hover:text-white dark:hover:text-white border border-neutral-200/40 dark:border-neutral-800/40 hover:border-transparent dark:hover:border-transparent shadow-xs transition-all duration-300">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
