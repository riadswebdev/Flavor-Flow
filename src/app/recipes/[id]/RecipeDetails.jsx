"use client";

import { useState } from "react";
import Image from "next/image";
import { FiAlertTriangle } from "react-icons/fi";
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
import {
  likeToggle,
  reportRecipe,
  toggleFavoriteRecipe,
} from "@/lib/actions/recipe";
import {
  Button,
  FieldError,
  Label,
  Modal,
  Radio,
  RadioGroup,
  Separator,
  Spinner,
  toast,
} from "@heroui/react";

export default function RecipeDetails({
  recipeData,
  currentUser,
  likeStatus,
  favoriteRecipesStatus,
}) {
  // States for like feature
  const [likesCount, setLikesCount] = useState(recipeData.likesCount);
  const [isLiked, setIsLiked] = useState(likeStatus?.isLiked || false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // States for favorite feature
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipesStatus?.isFavorite || false,
  );

  // States for Stripe Checkout
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Report modal states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_RECIPES_API_URL || "http://localhost:8000";

  // 1. Like / Unlike Button Handler with Optimistic UI Updates
  const handleLikeToggle = async () => {
    if (isLikeLoading || !currentUser?.id) {
      return toast.error("Please log in to like this recipe.");
    }
    const newLikedState = !isLiked;
    const action = newLikedState ? "like" : "unlike";
    // ২. Optimistic UI Update
    setIsLiked(newLikedState);
    setLikesCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    setIsLikeLoading(true);
    try {
      const data = await likeToggle(recipeData._id, currentUser.id, action);
      if (!data.success) {
        setIsLiked(!newLikedState);
        toast.error("Failed to update like. Please try again.");
        setLikesCount((prev) => (newLikedState ? prev - 1 : prev + 1));
      } else {
        setLikesCount(data.likesCount);
        toast.success(
          `Recipe ${newLikedState ? "liked" : "unliked"} successfully!`,
        );
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
  const handleFavoriteToggle = async () => {
    if (!currentUser?.id) {
      toast.error("Please log in to add this recipe to your favorites.");
      return;
    }
    const newFavoriteState = !isFavorite;
    const action = newFavoriteState ? "favorite" : "unfavorite";
    setIsFavorite(newFavoriteState);
    setFavoriteLoading(true);

    const favoriteRecipes = {
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      recipeId: recipeData?._id,
      recipeName: recipeData?.recipeName,
      recipeImage: recipeData?.recipeImage,
      category: recipeData?.category,
      authorName: recipeData?.author?.name,
      addedAt: new Date().toISOString(),
    };

    try {
      const data = await toggleFavoriteRecipe(
        recipeData._id,
        favoriteRecipes,
        action,
      );
      if (!data.success) {
        setIsFavorite(!newFavoriteState);
      }
      toast.success(
        `Recipe ${newFavoriteState ? "added to" : "removed from"} favorites!`,
      );
      setIsFavorite(newFavoriteState);
    } catch (error) {
      toast.error("Error updating favorite");
    } finally {
      setFavoriteLoading(false);
    }
    setIsFavorite(!isFavorite);
  };

  // 3. Report Submit Handler
  const handleReasonChange = (value) => {
    setSelectedReason(value);
    if (isInvalid) setIsInvalid(false);
  };
  const handleSubmitReport = async () => {
    if (!selectedReason) {
      return;
    }

    setIsSubmittingReport(true);

    const reportData = {
      recipeId: recipeData?._id,
      reporterEmail: currentUser?.email || "anonymous@flavorflow.com",
      reason: selectedReason,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await reportRecipe(reportData);
      if (response.success) {
        setSelectedReason("");
        setIsInvalid(false);
        toast.success(
          "Thank you for your report. We will review this recipe shortly.",
        );
        setIsReportModalOpen(false); // Closes modal programmatically on success
      }
    } catch (error) {
      console.error("Error submitting recipe report:", error);
      toast.error("Failed to submit the report. Please try again.");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  // 4. Stripe Checkout Payment Handler
  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      const res = await fetch(`${apiBaseUrl}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeId: recipeData._id,
          recipeName: recipeData.recipeName,
          price: 499,
        }),
      });

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
          <div className="lg:col-span-7 xl:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/60 dark:border-neutral-800/50 h-87.5 sm:h-112.5 lg:h-125">
            <Image
              src={recipeData.recipeImage}
              alt={recipeData.recipeName}
              fill
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
                  disabled={favoriteLoading}
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
          <Image
            src={recipeData?.author?.avatar || "/placeholder-avatar.png"}
            alt={recipeData?.author?.name || "Author avatar"}
            width={64}
            height={64}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-orange-500/20"
            priority={false}
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
        </div>
      </div>

      {/* ================= HEROUI PREMIUM REPORT MODAL ================= */}
      <Modal isOpen={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <Modal.Backdrop className="bg-black/30 backdrop-blur-md">
          <Modal.Container>
            <Modal.Dialog className="border border-default-200/60 bg-white/80 dark:bg-[#131b2e]/90 backdrop-blur-xl rounded-3xl max-w-md shadow-2xl overflow-hidden text-neutral-800 dark:text-neutral-200 w-full mx-4">
              <Modal.CloseTrigger className="hover:bg-default-100 active:bg-default-200 transition-colors rounded-full top-4 right-4 text-neutral-400 absolute" />

              <Modal.Header className="flex flex-col gap-1 pt-6 px-6">
                <Modal.Heading className="flex items-center gap-2 text-rose-500 text-xl font-extrabold tracking-tight">
                  <span>🚩</span>
                  <span>Report Recipe</span>
                </Modal.Heading>
                <p className="text-default-500 dark:text-neutral-400 font-normal text-xs sm:text-sm mt-1 leading-normal">
                  Help us keep FlavorFlow safe by reporting inappropriate
                  recipes.
                </p>
              </Modal.Header>

              <Separator className="my-2 opacity-60" />

              {/* Modal Body with Radio Options */}
              <Modal.Body className="py-4 px-6">
                <RadioGroup
                  value={selectedReason}
                  onChange={handleReasonChange}
                  isInvalid={isInvalid}
                  className="flex flex-col gap-3 w-full"
                >
                  <Label className="text-default-700 dark:text-default-300 font-semibold text-sm mb-1">
                    Select a reason for reporting:
                  </Label>

                  {/* Spam Option */}
                  <Radio value="Spam" className="w-full">
                    <Radio.Content className="inline-flex m-0 bg-default-100/50 dark:bg-[#1a233d]/50 hover:bg-default-100 dark:hover:bg-zinc-800 max-w-full items-center justify-start cursor-pointer rounded-2xl gap-2 p-3 border border-transparent data-[selected=true]:border-rose-500/50 transition-all w-full text-default-800 dark:text-default-200 text-sm font-medium">
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      Spam
                    </Radio.Content>
                  </Radio>

                  {/* Offensive Content Option */}
                  <Radio value="Offensive Content" className="w-full">
                    <Radio.Content className="inline-flex m-0 bg-default-100/50 dark:bg-[#1a233d]/50 hover:bg-default-100 dark:hover:bg-zinc-800 max-w-full items-center justify-start cursor-pointer rounded-2xl gap-2 p-3 border border-transparent data-[selected=true]:border-rose-500/50 transition-all w-full text-default-800 dark:text-default-200 text-sm font-medium">
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      Offensive Content
                    </Radio.Content>
                  </Radio>

                  {/* Copyright Issue Option */}
                  <Radio value="Copyright Issue" className="w-full">
                    <Radio.Content className="inline-flex m-0 bg-default-100/50 dark:bg-[#1a233d]/50 hover:bg-default-100 dark:hover:bg-zinc-800 max-w-full items-center justify-start cursor-pointer rounded-2xl gap-2 p-3 border border-transparent data-[selected=true]:border-rose-500/50 transition-all w-full text-default-800 dark:text-default-200 text-sm font-medium">
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>
                      Copyright Issue
                    </Radio.Content>
                  </Radio>

                  {/* Error Message */}
                  {isInvalid && (
                    <FieldError className="text-danger text-xs font-medium mt-1 animate-pulse">
                      Please select a reason before submitting.
                    </FieldError>
                  )}
                </RadioGroup>
              </Modal.Body>

              {/* Modal Footer */}
              <Modal.Footer className="pb-6 pt-2 px-6 gap-3 flex">
                <Button
                  variant="bordered"
                  onPress={() => {
                    setSelectedReason("");
                    setIsInvalid(false);
                    setIsReportModalOpen(false);
                  }}
                  disabled={isSubmittingReport}
                  className="rounded-xl font-semibold border-default-300 text-default-700 dark:text-default-300 hover:bg-default-100 dark:hover:bg-zinc-800 transition-colors flex-1"
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleSubmitReport}
                  disabled={isSubmittingReport}
                  className="bg-linear-to-r from-red-500 to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex-1"
                  startContent={isSubmittingReport ? null : <FiAlertTriangle />}
                >
                  {isSubmittingReport ?
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" color="white" />
                      <span>Submitting...</span>
                    </div>
                  : "Submit Report"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
