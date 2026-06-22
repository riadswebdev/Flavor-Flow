"use client";

import { useState } from "react";
import {
  Heart,
  Flag,
  Bookmark,
  Clock,
  ChefHat,
  Globe2,
  Layers,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  X,
} from "lucide-react";

export default function RecipeDetails({ recipeData, currentUser, likeStatus }) {
  // States for interactive features
  const [likesCount, setLikesCount] = useState(recipeData.likesCount);
  const [isLiked, setIsLiked] = useState(likeStatus?.isLiked || false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);

  
 
  // 1. Like / Unlike Button Handler with Optimistic UI Updates
  const handleLikeToggle = async () => {
    if (isLikeLoading || !currentUser?.id) return;

    const newLikedState = !isLiked ;
    const action = newLikedState ? "like" : "unlike";

    // ২. Optimistic UI Update
    setIsLiked(newLikedState);
    setLikesCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    setIsLikeLoading(true);
   
    try {
      const res = await fetch(
        `http://localhost:8000/api/recipes/${recipeData._id}/like`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            userId: currentUser.id,
          }),
        },
      );

      const data = await res.json();

      if (!data.success) {
        setIsLiked(!newLikedState);
        setLikesCount((prev) => (newLikedState ? prev - 1 : prev + 1));
      } else {
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error("Error updating like:", error);

      setIsLiked(!newLikedState);
      setLikesCount((prev) => (newLikedState ? prev - 1 : prev + 1));
    } finally {
      setIsLikeLoading(false);
    }
  };

  // 2. Favorite Button Handler
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // LocalStorage বা ব্যাকএন্ডে সেভ করার লজিক এখানে হবে
  };

  // 3. Report Submit Handler
  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log("Reported Reason:", reportReason);

    setIsReportModalOpen(false);
    setReportReason("");
    alert("Thank you for your report. We will review this recipe shortly.");
  };

  // 4. Stripe Checkout Payment Handler
  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      const res = await fetch(
        "http://localhost:8000/api/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipeId: recipeData._id,
            recipeName: recipeData.recipeName,
            price: 499,
          }),
        },
      );

      const session = await res.json();
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0b0f19] text-neutral-800 dark:text-neutral-200 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= BREADCRUMB ================= */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
          <span className="hover:text-orange-500 cursor-pointer">
            Browse Recipes
          </span>
          <ChevronRight size={14} />
          <span className="hover:text-orange-500 cursor-pointer">
            {recipeData?.category}
          </span>
          <ChevronRight size={14} />
          <span className="text-orange-600 dark:text-orange-400 font-semibold">
            {recipeData?.recipeName}
          </span>
        </nav>

        {/* ================= MAIN HERO GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Large Hero Image (Left Side) */}
          <div className="lg:col-span-7 xl:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/60 dark:border-neutral-800/50 h-[350px] sm:h-[450px] lg:h-[500px]">
            <img
              src={recipeData.recipeImage}
              alt={recipeData.recipeName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <h1 className="absolute bottom-6 left-6 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {recipeData.recipeName}
            </h1>
          </div>

          {/* Recipe Info & Actions (Right Side Card) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white dark:bg-[#131b2e]/70 border border-neutral-200/80 dark:border-neutral-800/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between backdrop-blur-md">
            <div className="space-y-6">
              <h3 className="text-lg font-bold border-b border-neutral-100 dark:border-neutral-800 pb-3">
                Recipe Insights
              </h3>

              {/* Grid Meta Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-100/70 dark:bg-[#1a233d]/50">
                  <Layers className="text-orange-500" size={18} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-400">
                      Category
                    </p>
                    <p className="text-sm font-semibold">
                      {recipeData?.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-100/70 dark:bg-[#1a233d]/50">
                  <Globe2 className="text-rose-500" size={18} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-400">
                      Cuisine
                    </p>
                    <p className="text-sm font-semibold">
                      {recipeData?.cuisineType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-100/70 dark:bg-[#1a233d]/50">
                  <ChefHat className="text-amber-500" size={18} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-400">
                      Difficulty
                    </p>
                    <p className="text-sm font-semibold">
                      {recipeData?.difficultyLevel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-100/70 dark:bg-[#1a233d]/50">
                  <Clock className="text-blue-500" size={18} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-400">
                      Prep Time
                    </p>
                    <p className="text-sm font-semibold">
                      {recipeData?.preparationTime} Mins
                    </p>
                  </div>
                </div>
              </div>

              {/* Like Count Counter Display */}
              <div className="flex items-center gap-2 py-2 px-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 w-full justify-center font-bold">
                <Heart size={18} fill="currentColor" />
                <span>{likesCount} People Liked This</span>
              </div>
            </div>

            {/* ACTION BUTTONS GROUP */}
            <div className="space-y-3 mt-8">
              {/* Purchase Button via Stripe */}
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className="w-full py-3 bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <CreditCard size={18} />
                {isPurchasing ? "Processing..." : "Buy Recipe Premium Access"}
              </button>

              <div className="grid grid-cols-2 gap-2">
                {/* Favorite Toggle Button */}
                <button
                  onClick={handleFavoriteToggle}
                  className={`py-2.5 px-4 rounded-xl border font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isFavorite ?
                      "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400"
                    : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Bookmark
                    size={16}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                  {isFavorite ? "Favorited" : "Add Favorite"}
                </button>

                {/* Like Trigger Button */}
                <button
                  disabled={isLikeLoading}
                  onClick={handleLikeToggle}
                  className={`py-2.5 px-4 rounded-xl border font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isLikeLoading ? "opacity-60 cursor-not-allowed" : ""
                  } ${
                    isLiked ?
                      "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400"
                    : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                  {isLiked ? "Liked" : "Like Recipe"}
                </button>
              </div>

              {/* Report Modal Opener Button */}
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-2 border border-dashed border-rose-500/40 text-rose-500 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <Flag size={14} /> Report Recipe Issue
              </button>
            </div>
          </div>
        </div>

        {/* ================= DETAILS TABS SECTION ================= */}
        <div className="bg-white dark:bg-[#131b2e]/40 border border-neutral-200/80 dark:border-neutral-800/60 rounded-3xl p-6 sm:p-8 space-y-8 mb-12 shadow-sm">
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-orange-600 dark:text-orange-400">
              About Recipe
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">
              Indulge in the rich, velvety perfection of this traditional{" "}
              {recipeData?.recipeName}. Perfectly balanced with premium aromatic
              spices, rich butter, and cream, creating an unforgettable culinary
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients Check List */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                Ingredients List
              </h2>
              <ul className="space-y-2.5">
                {recipeData?.ingredients?.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                Cooking Instructions
              </h2>
              <ol className="space-y-4">
                {recipeData?.instructions?.map((step, idx) => (
                  <li key={idx} className="flex gap-4 text-sm">
                    <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* ================= CHEF PROFILE CARD ================= */}
        <div className="bg-linear-to-r from-orange-500/5 via-rose-500/5 to-transparent border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 shadow-inner mb-12">
          <img
            src={recipeData?.author?.avatar}
            alt={recipeData?.author?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-orange-500/20"
          />
          <div className="text-center sm:text-left space-y-1">
            <p className="text-xs uppercase font-extrabold tracking-widest text-neutral-400">
              Master Chef Profile
            </p>
            <h4 className="text-lg font-bold">{recipeData?.author?.name}</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {recipeData?.author?.email}
            </p>
          </div>
          ?
        </div>
      </div>

      {/* ================= REPORT MODAL COMPONENT ================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-rose-500">
              <Flag size={20} /> Report Content
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Please clarify what issue you found regarding this recipe entry.
            </p>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <textarea
                required
                rows={4}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Write your details report message here..."
                className="w-full p-3 text-sm bg-neutral-100 dark:bg-[#1a233d]/70 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:border-rose-500 dark:text-white"
              />
              <div className="flex justify-end gap-2 text-xs font-bold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
