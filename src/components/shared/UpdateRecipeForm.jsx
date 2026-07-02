"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateRecipe } from "@/lib/actions/recipe";
import { uploadToImgBB } from "@/lib/actions/uploadImage";
import {
  Input,
  Select,
  Button,
  Separator,
  Spinner,
  TextArea,
  ListBox,
  Label,
  Modal,
  toast,
} from "@heroui/react";

import {
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiBookOpen,
  FiEdit2,
} from "react-icons/fi";

// ================= Static Recipe Source (no fetch) =================

export default function UpdateRecipeFormModal({ recipeId, recipe }) {
  const router = useRouter();

  // Single source recipe (static array's first item)
  const [singleRecipe] = useState(recipe);

  // ================= System States =================
  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState({ type: "", text: "" });

  // ================= Form States (initialized directly from static recipe) =================
  const [recipeName, setRecipeName] = useState(singleRecipe.recipeName || "");
  const [category, setCategory] = useState(
    new Set(singleRecipe.category ? [singleRecipe.category] : []),
  );
  const [cuisineType, setCuisineType] = useState(
    singleRecipe.cuisineType || "",
  );
  const [difficultyLevel, setDifficultyLevel] = useState(
    new Set(singleRecipe.difficultyLevel ? [singleRecipe.difficultyLevel] : []),
  );
  const [preparationTime, setPreparationTime] = useState(
    String(singleRecipe.preparationTime || ""),
  );
  const [ingredients, setIngredients] = useState(
    singleRecipe.ingredients && singleRecipe.ingredients.length > 0 ?
      singleRecipe.ingredients
    : [""],
  );
  const [instructions, setInstructions] = useState(
    singleRecipe.instructions ? singleRecipe.instructions.join("\n") : "",
  );
  const [recipeImage, setRecipeImage] = useState(
    singleRecipe.recipeImage || "",
  );

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

    // Only the fields present in this form are sent for update.
    // Fields like likesCount, isFeatured, status, author, createdAt
    // are intentionally NOT touched here — handled on the API/DB side.
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
        toast.success("Recipe updated successfully!");
        setGlobalMessage({
          type: "success",
          text: "🎉 Recipe updated successfully!",
        });

        setTimeout(() => {
          router.refresh();
          router.replace("/dashboard/user/my-recipes");
        }, 1500);
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

  // ================= RENDERING PAGE + EDIT-RECIPE MODAL =================
  return (
    <Modal>
      <Button variant="flat">
        <FiEdit2 />
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-3xl w-full">
            <Modal.CloseTrigger />
            <Modal.Header>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                Update Recipe
              </h2>
            </Modal.Header>

            <Modal.Body className="max-h-[75vh] overflow-y-auto">
              {/* Global Toast Alert Mechanism */}
              <AnimatePresence mode="wait">
                {globalMessage.text && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold mb-6 border ${
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

              <form
                id="update-recipe-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            Uploading image...
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
                          ].map((cat) => (
                            <ListBox.Item key={cat} id={cat}>
                              <Label>{cat}</Label>
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
                          setErrors((prev) => ({
                            ...prev,
                            cuisineType: null,
                          }));
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
                          setErrors((prev) => ({
                            ...prev,
                            difficultyLevel: null,
                          }));
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
                          setErrors((prev) => ({
                            ...prev,
                            preparationTime: null,
                          }));
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
                    placeholder={
                      "Cook chicken for 15 minutes\nPrepare the gravy\nServe hot"
                    }
                    variant="bordered"
                    radius="xl"
                    rows={5}
                    value={instructions}
                    onChange={(e) => {
                      setInstructions(e.target.value);
                      if (errors.instructions)
                        setErrors((prev) => ({
                          ...prev,
                          instructions: null,
                        }));
                    }}
                    required
                    aria-errormessage={errors.instructions}
                    className="w-full text-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="flat"
                slot="close"
                radius="xl"
                disabled={isSubmitting}
                className="w-full sm:w-auto font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="update-recipe-form"
                disabled={isSubmitting || imageUploading}
                slot="close"
                className="w-full sm:flex-1 bg-linear-to-r from-orange-500 to-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl h-12 shadow-lg shadow-orange-500/20 hover:opacity-95 disabled:opacity-50 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isSubmitting ?
                  <div className="flex items-center gap-2">
                    <Spinner color="white" size="sm" />
                    <span>Updating Recipe...</span>
                  </div>
                : "Update Recipe"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
