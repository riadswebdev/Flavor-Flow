"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadToImgBB } from "@/lib/actions/uploadImage";

import {
  Card,
  CardContent,
  Input,
  Select,
  ListBox,
  Button,
  Chip,
  Separator,
  Spinner,
  TextArea,
} from "@heroui/react";
import {
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiZap,
  FiActivity,
  FiBookOpen,
} from "react-icons/fi";

const userStats = {
  recipeCount: 1, // ২ বা তার বেশি হলে সাবমিট বাটন লক হয়ে প্রিমিয়াম কার্ড শো করবে
  plan: "free",
};

export default function AddRecipeForm({ loggedInUser }) {
  const router = useRouter();

  // ================= Form States =================
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState(new Set([]));
  const [cuisineType, setCuisineType] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(new Set([]));
  const [preparationTime, setPreparationTime] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [recipeImage, setRecipeImage] = useState("");

  // System States
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState({ type: "", text: "" });

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

  // ================= Image Upload to ImgBB =================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploading(true);
      setUploadProgress(0);
      setGlobalMessage({ type: "", text: "" });

      const imageUrl = await uploadToImgBB(file);

      setRecipeImage(imageUrl);
      setErrors((prev) => ({ ...prev, recipeImage: null }));
      setGlobalMessage({
        type: "success",
        text: "Image uploaded successfully!",
      });
    } catch (error) {
      console.error("Imgbb Upload Error:", error);
      setGlobalMessage({
        type: "error",
        text: "Image upload failed. Please check connection or API key.",
      });
    } finally {
      setImageUploading(false);
    }
  };

  // ================= Client-Side Manual Validation =================
  const validateForm = () => {
    const newErrors = {};

    if (!recipeName.trim()) newErrors.recipeName = "Recipe name is required";
    if (recipeName.length > 100)
      newErrors.recipeName = "Maximum 100 characters allowed";
    if (!recipeImage) newErrors.recipeImage = "Recipe image upload is required";

    const selectedCategory = Array.from(category)[0];
    if (!selectedCategory) newErrors.category = "Category is required";

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

  // ================= Form Submission Logic =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setGlobalMessage({
        type: "error",
        text: "Please fix the validation errors below.",
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
      likesCount: 0,
      isFeatured: false,
      status: "published",
      author: {
        id: loggedInUser.id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        avatar: loggedInUser.image,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      setGlobalMessage({ type: "", text: "" });
      console.log(finalRecipePayload, "all data");
      const response = { status: 201 };

      if (response.status === 201 || response.status === 200) {
        setGlobalMessage({
          type: "success",
          text: "🎉 Recipe published successfully!",
        });

        setRecipeName("");
        setCategory(new Set([]));
        setCuisineType("");
        setDifficultyLevel(new Set([]));
        setPreparationTime("");
        setIngredients([""]);
        setInstructions("");
        setRecipeImage("");
        setErrors({});

        setTimeout(() => {
          // router.push("/dashboard/my-recipes");
        }, 2000);
      }
    } catch (error) {
      console.error("Backend Error:", error);
      setGlobalMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to publish recipe to server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (
    userStats.recipeLimit !== -1 &&
    userStats.recipesCount >= userStats.recipeLimit
  ) {
    //  redirect("/plans");
  }
  const isLimitReached =
    userStats.plan !== "free" && userStats.recipeCount >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen py-12 px-4 max-w-4xl mx-auto sm:px-6 lg:px-8 bg-transparent relative"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200/60 dark:border-zinc-800/60 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight sm:text-4xl">
              Add New Recipe
            </h1>
            {userStats.plan === "premium" ?
              <Chip className="bg-linear-to-r from-orange-500 to-rose-500 text-white font-black text-[10px] uppercase border-0 px-2.5 shadow-md shadow-orange-500/20">
                Premium Member
              </Chip>
            : <Chip
                size="sm"
                variant="flat"
                className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold"
              >
                Free Tier ({userStats.recipeCount}/2)
              </Chip>
            }
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Share your favorite recipe with the FlavorFlow community.
          </p>
        </div>
      </div>

      {/* Alerts Toast System */}
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

      {/* ================= RECIPE FORM CARD ================= */}
      <Card className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 rounded-[2rem] shadow-2xl relative z-10 overflow-visible">
        <CardContent className="p-6 sm:p-10 overflow-visible">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Recipe Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                Recipe Name <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Example: Butter Chicken"
                variant="bordered"
                radius="xl"
                value={recipeName}
                onChange={(e) => {
                  setRecipeName(e.target.value);
                  if (errors.recipeName)
                    setErrors((prev) => ({ ...prev, recipeName: null }));
                }}
                errorMessage={errors.recipeName}
                className="w-full text-zinc-800 dark:text-zinc-100"
              />
            </div>

            {/* 2. Drag & Drop Image Upload Component Area */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                Recipe Image Upload <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-6 transition-all bg-zinc-50/50 dark:bg-zinc-950/30 flex flex-col items-center justify-center text-center min-h-40 ${
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
                    <div className="space-y-3 w-full max-w-[200px]">
                      <Spinner color="warning" size="sm" />
                      <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-linear-to-r from-orange-500 to-rose-500 h-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-orange-500 block">
                        {uploadProgress}% Uploading...
                      </span>
                    </div>
                  : <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm inline-flex text-orange-500">
                        <FiUploadCloud className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
                        Drag & drop or browse image
                      </p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                        Supports PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  }
                </div>

                <div className="relative aspect-video rounded-2xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 overflow-hidden flex items-center justify-center">
                  {recipeImage ?
                    <Image
                      src={recipeImage}
                      alt="Recipe Preview"
                      fill
                      className="object-cover rounded-2xl animate-fadeIn"
                    />
                  : <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600">
                      Image preview will appear here
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

            {/* 3. Core Meta Fields (Dropdowns and Inputs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category Select */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                  Category <span className="text-rose-500">*</span>
                </label>

                <Select
                  placeholder="Select Category"
                  variant="bordered"
                  radius="xl"
                  selectedKeys={category}
                  onSelectionChange={(keys) => {
                    setCategory(keys);
                    if (errors.category)
                      setErrors((prev) => ({ ...prev, category: null }));
                  }}
                  isInvalid={!!errors.category}
                  errorMessage={errors.category}
                >
                  <Select.Trigger>
                    <Select.Value />
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
                      ].map((item) => (
                        <ListBox.Item key={item} id={item} textValue={item}>
                          {item}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Cuisine Type */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                  Cuisine Type <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Indian, Italian"
                  variant="bordered"
                  radius="xl"
                  value={cuisineType}
                  onChange={(e) => {
                    setCuisineType(e.target.value);
                    if (errors.cuisineType)
                      setErrors((prev) => ({ ...prev, cuisineType: null }));
                  }}
                  isInvalid={!!errors.cuisineType}
                  errorMessage={errors.cuisineType}
                />
              </div>

              {/* Difficulty Level */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                  Difficulty Level <span className="text-rose-500">*</span>
                </label>

                <Select
                  placeholder="Select Difficulty"
                  variant="bordered"
                  radius="xl"
                  selectedKeys={difficultyLevel}
                  onSelectionChange={(keys) => {
                    setDifficultyLevel(keys);
                    if (errors.difficultyLevel)
                      setErrors((prev) => ({ ...prev, difficultyLevel: null }));
                  }}
                  isInvalid={!!errors.difficultyLevel}
                  errorMessage={errors.difficultyLevel}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {["Easy", "Medium", "Hard"].map((lvl) => (
                        <ListBox.Item key={lvl} id={lvl} textValue={lvl}>
                          {lvl}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Preparation Time */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider">
                  Preparation Time (Minutes){" "}
                  <span className="text-rose-500">*</span>
                </label>
                <Input
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
                  isInvalid={!!errors.preparationTime}
                  errorMessage={errors.preparationTime}
                />
              </div>
            </div>

            <Separator className="my-2 bg-zinc-200/60 dark:bg-zinc-800/60" />

            {/* 4. Dynamic Ingredients List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300 tracking-wider flex items-center gap-2">
                  <FiActivity className="text-orange-500" /> Ingredients{" "}
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

            {/* 5. Instructions Area */}
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
                placeholder="Cook chicken for 15 minutes&#10;Prepare the gravy&#10;Combine everything together"
                variant="bordered"
                radius="xl"
                minRows={4}
                value={instructions}
                onChange={(e) => {
                  setInstructions(e.target.value);
                  if (errors.instructions)
                    setErrors((prev) => ({ ...prev, instructions: null }));
                }}
                isInvalid={!!errors.instructions}
                errorMessage={errors.instructions}
                className="w-full text-zinc-800 dark:text-zinc-100"
              />
            </div>

            {/* ================= UPGRADE CARD / SUBMIT TIERS ================= */}
            <div className="pt-4">
              {isLimitReached ?
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-linear-to-br from-zinc-900 via-zinc-950 to-orange-950/40 dark:from-zinc-950 dark:via-zinc-950 dark:to-orange-950/20 border border-orange-500/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
                >
                  <div className="space-y-2 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider">
                      <FiZap className="w-3.5 h-3.5 fill-current" /> ⭐ Recipe
                      Limit Reached
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                      Free members can create up to 2 recipes.
                    </h4>
                    <p className="text-xs text-zinc-400 font-medium max-w-xl">
                      Upgrade to Premium to unlock unlimited recipe uploads,
                      front-page algorithmic exposure, and custom cooking
                      analytics.
                    </p>
                  </div>
                  <Button className="w-full md:w-auto bg-linear-to-r from-orange-500 to-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl px-8 h-12 shadow-lg shadow-orange-500/20 active:scale-[0.96] transition-transform shrink-0">
                    Upgrade Now
                  </Button>
                </motion.div>
              : <Button
                  type="submit"
                  disabled={isSubmitting || imageUploading}
                  className="w-full bg-linear-to-r from-orange-500 to-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl h-12 shadow-lg shadow-orange-500/20 hover:opacity-95 disabled:opacity-50 transition-all active:scale-[0.99]"
                >
                  {isSubmitting ?
                    <div className="flex items-center gap-2">
                      <Spinner color="white" size="sm" />
                      <span>Publishing...</span>
                    </div>
                  : "Publish Recipe"}
                </Button>
              }
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
