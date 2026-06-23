"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadToImgBB } from "@/lib/actions/uploadImage";
import { getSingleRecipe } from "@/lib/api/recipes";

import {
  Card,
  CardContent,
  Input,
  Select,
  Button,
  Separator,
  Spinner,
  Skeleton,
  TextArea,
  ListBox,
  Label,
} from "@heroui/react";

import {
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiBookOpen,
  FiArrowLeft,
} from "react-icons/fi";
import { updateRecipe } from "@/lib/actions/recipe";

export default function UpdateRecipeForm({ recipeId }) {
  const router = useRouter();

  // ================= System & Loading States =================
  const [pageLoading, setPageLoading] = useState(true);
  const [recipeNotFound, setRecipeNotFound] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState({ type: "", text: "" });

  // ================= Form States =================
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState(new Set([]));
  const [cuisineType, setCuisineType] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(new Set([]));
  const [preparationTime, setPreparationTime] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [recipeImage, setRecipeImage] = useState("");

  // Keep a reference of fields that must NOT change
  const [immutableMeta, setImmutableMeta] = useState({
    likesCount: 0,
    isFeatured: false,
    status: "published",
    author: {},
    createdAt: "",
  });

  // ================= Fetch Recipe Data =================
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setPageLoading(true);
        const recipe = await getSingleRecipe(recipeId);
        console.log("Fetched Recipe Data:", recipe);

        if (!recipe) {
          setRecipeNotFound(true);
          return;
        }

        // Populate Form Fields
        setRecipeName(recipe.recipeName || "");
        setCategory(new Set(recipe.category ? [recipe.category] : []));
        setCuisineType(recipe.cuisineType || "");
        setDifficultyLevel(
          new Set(recipe.difficultyLevel ? [recipe.difficultyLevel] : []),
        );
        setPreparationTime(String(recipe.preparationTime || ""));
        setIngredients(
          recipe.ingredients && recipe.ingredients.length > 0 ?
            recipe.ingredients
          : [""],
        );
        setInstructions(
          recipe.instructions ? recipe.instructions.join("\n") : "",
        );
        setRecipeImage(recipe.recipeImage || "");

        // Retain Immutable Field Map Data
        setImmutableMeta({
          likesCount: recipe.likesCount || 0,
          isFeatured: recipe.isFeatured || false,
          status: recipe.status || "published",
          author: recipe.author || {},
          createdAt: recipe.createdAt,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setRecipeNotFound(true);
      } finally {
        setPageLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  // ================= Dynamic Ingredients Handlers =================
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);

    if (errors.ingredients) {
      setErrors((prev) => ({ ...prev, ingredients: null }));
    }
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index) => {
    if (ingredients.length > 1) {
      const updatedIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(updatedIngredients);
    }
  };

  // ================= Image Upload Handler =================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploading(true);
      setGlobalMessage({ type: "", text: "" });

      // Action uploads image directly to ImgBB
      const imageUrl = await uploadToImgBB(file);

      setRecipeImage(imageUrl);
      setErrors((prev) => ({ ...prev, recipeImage: null }));
      setGlobalMessage({
        type: "success",
        text: "New image uploaded and updated successfully!",
      });
    } catch (error) {
      setGlobalMessage({
        type: "error",
        text: "Image upload failed. Please try again.",
      });
    } finally {
      setImageUploading(false);
    }
  };

  // ================= Client Side Form Validation =================
  const validateForm = () => {
    const newErrors = {};

    if (!recipeName.trim()) newErrors.recipeName = "Recipe name is required";
    if (recipeName.length > 100)
      newErrors.recipeName = "Maximum 100 characters allowed";
    if (!recipeImage) newErrors.recipeImage = "Recipe image is required";

    const selectedCategory = Array.from(category)[0];
    if (!selectedCategory)
      newErrors.category = "Category Selection is required";

    if (!cuisineType.trim()) newErrors.cuisineType = "Cuisine type is required";

    const selectedDifficulty = Array.from(difficultyLevel)[0];
    if (!selectedDifficulty)
      newErrors.difficultyLevel = "Difficulty level is required";

    if (!preparationTime) {
      newErrors.preparationTime = "Preparation time is required";
    } else if (parseInt(preparationTime, 10) <= 0) {
      newErrors.preparationTime = "Time must be greater than zero";
    }

    const filteredIngredients = ingredients.filter((ing) => ing.trim() !== "");
    if (filteredIngredients.length === 0) {
      newErrors.ingredients = "At least one ingredient is required";
    }

    if (!instructions.trim()) {
      newErrors.instructions = "Instructions are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= Form Submission Code =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setGlobalMessage({
        type: "error",
        text: "Please clear the field validation errors below.",
      });
      return;
    }

    const instructionsArray = instructions
      .split("\n")
      .map((step) => step.trim())
      .filter((step) => step !== "");

    const finalRecipePayload = {
      recipeName: recipeName.trim(),
      recipeImage,
      category: Array.from(category)[0],
      cuisineType: cuisineType.trim(),
      difficultyLevel: Array.from(difficultyLevel)[0],
      preparationTime: parseInt(preparationTime, 10),
      ingredients: ingredients
        .map((ing) => ing.trim())
        .filter((ing) => ing !== ""),
      instructions: instructionsArray,
      updatedAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      setGlobalMessage({ type: "", text: "" });

     
      const updatedRecipe = await updateRecipe(recipeId, finalRecipePayload);
    
      if (updatedRecipe.success) {
        setGlobalMessage({
          type: "success",
          text: "🎉 Recipe updated successfully!",
        });

        setTimeout(() => {
          router.refresh();
          router.replace("/dashboard/user/my-recipes");
        }, 2000);
      }
    } catch (error) {
      console.error("Backend Error Strategy:", error);
      setGlobalMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to update the recipe on the server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= 1. RENDERING HEROUI SKELETON LOADING STATE =================
  if (pageLoading) {
    return (
      <div className="min-h-screen py-12 px-4 max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-9 w-2/5 rounded-xl" />
          <Skeleton className="h-5 w-3/5 rounded-xl" />
        </div>
        <Card className="p-6 sm:p-10 border border-zinc-200/50 dark:border-zinc-800/80 rounded-[2rem]">
          <div className="space-y-6">
            <Skeleton className="h-12 w-full rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </Card>
      </div>
    );
  }

  // ================= 2. RENDERING ERROR/EMPTY NOT FOUND PREMIUM STATE =================
  if (recipeNotFound) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-[70vh] flex flex-cols-center justify-center text-center px-4"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="p-4 bg-rose-500/10 dark:bg-rose-500/5 text-rose-500 rounded-2xl border border-rose-500/20 mb-4 shadow-xl">
          <FiAlertCircle className="w-12 h-12 animate-pulse" />
        </div>
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
          Recipe Not Found
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-md font-medium">
          The requested recipe record configuration either does not exist, or
          you lack authentication clearance profiles to view it.
        </p>
        <Button
          variant="flat"
          radius="xl"
          startContent={<FiArrowLeft />}
          onClick={() => router.push("/dashboard/user/my-recipes")}
          className="mt-6 font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:opacity-90"
        >
          Return to My Recipes
        </Button>
      </motion.div>
    );
  }

  // ================= 3. RENDERING EDIT FORM INTERFACE =================
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen py-12 px-4 max-w-4xl mx-auto sm:px-6 lg:px-8 bg-transparent relative"
    >
      {/* Background Radial Glow Decorations */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sms-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200/60 dark:border-zinc-800/60 relative z-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight sm:text-4xl">
            Update Recipe
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Edit your recipe data configuration and keep it up to date.
          </p>
        </div>
      </div>

      {/* Global Toast Alert Mechanism */}
      <AnimatePresence mode="wait">
        {globalMessage.text && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold mb-6 border relative z-10 ${
              globalMessage.type === "success" ?
                "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30"
              : "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/30"
            }`}
          >
            {globalMessage.type === "success" ?
              <FiCheckCircle className="w-4 h-4 shrink-0" />
            : <FiAlertCircle className="w-4 h-4 shrink-0" />}
            <span>{globalMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= EDIT FORM CARD ================= */}
      <Card className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 rounded-[2rem] shadow-2xl relative z-10">
        <CardContent className="p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Recipe Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                Recipe Name <span className="text-rose-500">*</span>
              </label>
              <Input
                required
                type="text"
                placeholder="Example: Garlic Butter Salmon"
                variant="bordered"
                radius="xl"
                value={recipeName}
                onChange={(e) => {
                  setRecipeName(e.target.value);
                  if (errors.recipeName)
                    setErrors((prev) => ({ ...prev, recipeName: null }));
                }}
                aria-errormessage={errors.recipeName}
                className="w-full text-zinc-800 dark:text-zinc-100"
              />
            </div>

            {/* 2. Custom Upload & Cloud Preview Grid Area */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                Recipe Image <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4s-center">
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-6 transition-all bg-zinc-50/50 dark:bg-zinc-950/30 flex flex-cols-center justify-center text-center min-h-40 ${
                    errors.recipeImage ? "border-rose-500" : (
                      "border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50"
                    )
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={imageUploading || isSubmitting}
                  />

                  {imageUploading ?
                    <div className="space-y-3 w-full flex flex-cols-center justify-center">
                      <Spinner color="warning" size="md" />
                      <span className="text-[11px] font-bold text-orange-500 block animate-pulse">
                        Uploading Media Array Matrix to Cloud...
                      </span>
                    </div>
                  : <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm inline-flex text-orange-500">
                        <FiUploadCloud className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
                        Select new file to swap image
                      </p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                        Supports PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  }
                </div>

                <div className="relative aspect-video rounded-2xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 overflow-hidden flex items-center justify-center shadow-inner">
                  {recipeImage ?
                    <Image
                      src={recipeImage}
                      alt="Recipe Target Preview"
                      fill
                      priority
                      className="object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
                    />
                  : <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600">
                      No Media Registered
                    </span>
                  }
                </div>
              </div>
              {errors.recipeImage && (
                <p className="text-xs text-rose-500 font-semibold mt-1">
                  {errors.recipeImage}
                </p>
              )}
            </div>

            {/* 3. Dropdowns & Numerical Attribute Grid Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                  Category <span className="text-rose-500">*</span>
                </label>
                <Select
                  selectedKeys={category}
                  onSelectionChange={(keys) => {
                    setCategory(keys);
                    if (errors.category)
                      setErrors((prev) => ({ ...prev, category: null }));
                  }}
                  aria-errormessage={errors.category}
                  className="w-full text-zinc-800 dark:text-zinc-100"
                >
                  <Select.Trigger variant="bordered" radius="xl" isRequired>
                    <Select.Value placeholder="Select Category" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {[
                        "Breakfast",
                        "Lunch",
                        "Dinner",
                        "Dessert",
                        "Snacks",
                        "Drinks",
                        "Vegetarian",
                        "Seafood",
                      ].map((category) => (
                        <ListBox.Item key={category} id={category}>
                          <Label>{category}</Label>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Cuisine Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                  Cuisine Type <span className="text-rose-500">*</span>
                </label>
                <Input
                  required
                  type="text"
                  placeholder="e.g., French, Mexican"
                  variant="bordered"
                  radius="xl"
                  value={cuisineType}
                  onChange={(e) => {
                    setCuisineType(e.target.value);
                    if (errors.cuisineType)
                      setErrors((prev) => ({ ...prev, cuisineType: null }));
                  }}
                  aria-errormessage={errors.cuisineType}
                />
              </div>

              {/* Difficulty Level Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                  Difficulty Level <span className="text-rose-500">*</span>
                </label>
                <Select
                  selectedKeys={difficultyLevel}
                  onSelectionChange={(keys) => {
                    setDifficultyLevel(keys);
                    if (errors.difficultyLevel)
                      setErrors((prev) => ({ ...prev, difficultyLevel: null }));
                  }}
                  aria-errormessage={errors.difficultyLevel}
                  className="w-full text-zinc-800 dark:text-zinc-100"
                >
                  <Select.Trigger variant="bordered" radius="xl" isRequired>
                    <Select.Value placeholder="Select Difficulty" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {["Easy", "Medium", "Hard"].map((lvl) => (
                        <ListBox.Item key={lvl} id={lvl}>
                          <Label>{lvl}</Label>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Prep Time Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                  Preparation Time (Minutes){" "}
                  <span className="text-rose-500">*</span>
                </label>
                <Input
                  required
                  type="number"
                  placeholder="Minutes"
                  variant="bordered"
                  radius="xl"
                  value={preparationTime}
                  onChange={(e) => {
                    setPreparationTime(e.target.value);
                    if (errors.preparationTime)
                      setErrors((prev) => ({ ...prev, preparationTime: null }));
                  }}
                  aria-errormessage={errors.preparationTime}
                />
              </div>
            </div>

            <Separator className="my-2 bg-zinc-200/60 dark:bg-zinc-800/60" />

            {/* 4. Dynamic Ingredients System Map Array */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center gap-2">
                  <FiClock className="text-orange-500" /> Ingredients{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <Button
                  type="button"
                  size="sm"
                  variant="flat"
                  startContent={<FiPlus />}
                  onClick={addIngredientField}
                  className="bg-orange-500/10 text-orange-600 dark:text-orange-400 font-extrabold rounded-xl text-xs uppercase"
                >
                  Add Ingredient
                </Button>
              </div>

              {errors.ingredients && (
                <p className="text-xs text-rose-500 font-bold">
                  {errors.ingredients}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder={`Ingredient #${index + 1}`}
                      variant="bordered"
                      radius="xl"
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      className="w-full"
                    />
                    {ingredients.length > 1 && (
                      <Button
                        type="button"
                        isIconOnly
                        variant="light"
                        color="danger"
                        radius="xl"
                        onClick={() => removeIngredientField(index)}
                        className="text-rose-500 hover:bg-rose-500/10"
                      >
                        <FiTrash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Instructions Processing Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center gap-2">
                  <FiBookOpen className="text-orange-500" /> Instructions /
                  Cooking Steps <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold">
                  Press Enter for each separate step
                </span>
              </div>
              <TextArea
                placeholder="Cook chicken for 15 minutes&#10;Prepare the gravy matrix&#10;Serve hot"
                variant="bordered"
                radius="xl"
                rows={5}
                value={instructions}
                onChange={(e) => {
                  setInstructions(e.target.value);
                  if (errors.instructions)
                    setErrors((prev) => ({ ...prev, instructions: null }));
                }}
                required
                aria-errormessage={errors.instructions}
                className="w-full text-zinc-800 dark:text-zinc-100"
              />
            </div>

            {/* ================= ACTIONS BUTTON TIERS ================= */}
            <div className="flex flex-col sm:flex-rows-center gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || imageUploading}
                className="w-full sm:w-2/3 order-2 sm:order-1 bg-linear-to-r from-orange-500 to-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl h-12 shadow-lg shadow-orange-500/20 hover:opacity-95 disabled:opacity-50 transition-all active:scale-[0.99] flex items-center justify-center gap-2 mx-auto"
              >
                {isSubmitting ?
                  <div className="flexs-center gap-2">
                    <Spinner color="white" size="sm" />
                    <span>Updating Recipe...</span>
                  </div>
                : "Update Recipe"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
