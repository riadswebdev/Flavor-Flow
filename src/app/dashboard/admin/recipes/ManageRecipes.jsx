"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  Table,
  Chip,
  Button,
  Tooltip,
  Input,
  Skeleton,
  Avatar,
  Pagination,
} from "@heroui/react";
import { Dropdown, Label } from "@heroui/react";
import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiEdit2,
  FiStar,
  FiAlertTriangle,
  FiHeart,
  FiBookOpen,
  FiInbox,
  FiSearch,
} from "react-icons/fi";
import Image from "next/image";
import { DeleteRecipe } from "../../user/my-recipes/[updateRecipe]/DeleteRecipe";
import { recipeFeatureUnFeatured } from "@/lib/actions/recipe";

// ─── Mock Data ───────────────────────────────────────────────────────────────
// const MOCK_RECIPES = [
//   {
//     _id: "1",
//     recipeName: "Butter Chicken",
//     recipeImage:
//       "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=120&q=80",
//     category: "Dinner",
//     cuisineType: "Indian",
//     difficultyLevel: "Medium",
//     preparationTime: 45,
//     likesCount: 850,
//     isFeatured: true,
//     status: "published",
//     author: {
//       id: "user_023",
//       name: "Amit Patel",
//       email: "amit@example.com",
//       avatar: "https://randomuser.me/api/portraits/men/23.jpg",
//     },
//     createdAt: "2026-06-13T18:30:00Z",
//   },
//   {
//     _id: "2",
//     recipeName: "Margherita Pizza",
//     recipeImage:
//       "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=120&q=80",
//     category: "Lunch",
//     cuisineType: "Italian",
//     difficultyLevel: "Easy",
//     preparationTime: 30,
//     likesCount: 620,
//     isFeatured: false,
//     status: "published",
//     author: {
//       id: "user_041",
//       name: "Sofia Rossi",
//       email: "sofia@example.com",
//       avatar: "https://randomuser.me/api/portraits/women/41.jpg",
//     },
//     createdAt: "2026-06-15T10:00:00Z",
//   },
//   {
//     _id: "3",
//     recipeName: "Chicken Shawarma",
//     recipeImage:
//       "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=120&q=80",
//     category: "Dinner",
//     cuisineType: "Middle Eastern",
//     difficultyLevel: "Medium",
//     preparationTime: 60,
//     likesCount: 1240,
//     isFeatured: true,
//     status: "published",
//     author: {
//       id: "user_007",
//       name: "Layla Hassan",
//       email: "layla@example.com",
//       avatar: "https://randomuser.me/api/portraits/women/7.jpg",
//     },
//     createdAt: "2026-06-17T14:15:00Z",
//   },
//   {
//     _id: "4",
//     recipeName: "Beef Tacos",
//     recipeImage:
//       "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=120&q=80",
//     category: "Lunch",
//     cuisineType: "Mexican",
//     difficultyLevel: "Easy",
//     preparationTime: 25,
//     likesCount: 390,
//     isFeatured: false,
//     status: "published",
//     author: {
//       id: "user_055",
//       name: "Carlos Mendez",
//       email: "carlos@example.com",
//       avatar: "https://randomuser.me/api/portraits/men/55.jpg",
//     },
//     createdAt: "2026-06-20T09:45:00Z",
//   },
//   {
//     _id: "5",
//     recipeName: "Chocolate Lava Cake",
//     recipeImage:
//       "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=120&q=80",
//     category: "Dessert",
//     cuisineType: "French",
//     difficultyLevel: "Hard",
//     preparationTime: 90,
//     likesCount: 2100,
//     isFeatured: true,
//     status: "published",
//     author: {
//       id: "user_012",
//       name: "Marie Dupont",
//       email: "marie@example.com",
//       avatar: "https://randomuser.me/api/portraits/women/12.jpg",
//     },
//     createdAt: "2026-06-22T20:00:00Z",
//   },
// ];

// ─── Options ─────────────────────────────────────────────────────────────────
const categoryOptions = [
  { key: "all", label: "All Categories" },
  { key: "Breakfast", label: "Breakfast" },
  { key: "Lunch", label: "Lunch" },
  { key: "Dinner", label: "Dinner" },
  { key: "Dessert", label: "Dessert" },
  { key: "Snack", label: "Snack" },
];

const cuisineOptions = [
  { key: "all", label: "All Cuisines" },
  { key: "Indian", label: "Indian" },
  { key: "Italian", label: "Italian" },
  { key: "Mexican", label: "Mexican" },
  { key: "Middle Eastern", label: "Middle Eastern" },
  { key: "French", label: "French" },
];

const featuredOptions = [
  { key: "all", label: "All Recipes" },
  { key: "featured", label: "⭐ Featured" },
  { key: "normal", label: "Normal" },
];

// ─── Animations ───────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${day} ${month} ${year} • ${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};

export default function ManageRecipesPage({ allRecipes }) {
  const [isMounted, setIsMounted] = useState(false);
  const [recipes, setRecipes] = useState(allRecipes || []);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(new Set(["all"]));
  const [selectedCuisine, setSelectedCuisine] = useState(new Set(["all"]));
  const [selectedFeatured, setSelectedFeatured] = useState(new Set(["all"]));
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setRecipes(allRecipes);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    fetchRecipes();
  }, []);

  const stats = useMemo(
    () => ({
      total: recipes.length,
      featured: recipes.filter((r) => r.isFeatured).length,
      published: recipes.filter((r) => r.status === "published").length,
      totalLikes: recipes.reduce((sum, r) => sum + r.likesCount, 0),
    }),
    [recipes],
  );

  // ─── Filter Logic ──────────────────────────────────────────────────────────
  const filteredRecipes = useMemo(() => {
    const cat = Array.from(selectedCategory)[0];
    const cui = Array.from(selectedCuisine)[0];
    const feat = Array.from(selectedFeatured)[0];

    return recipes.filter((r) => {
      const matchSearch = r.recipeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchCat = cat === "all" || r.category === cat;
      const matchCui = cui === "all" || r.cuisineType === cui;
      const matchFeat =
        feat === "all" ||
        (feat === "featured" && r.isFeatured) ||
        (feat === "normal" && !r.isFeatured);
      return matchSearch && matchCat && matchCui && matchFeat;
    });
  }, [
    recipes,
    searchQuery,
    selectedCategory,
    selectedCuisine,
    selectedFeatured,
  ]);

  const pages = Math.ceil(filteredRecipes.length / rowsPerPage);

  // ─── FIX 2: Added .map() to inject the dynamic tracking 'id' required by HeroUI Table ───
  const paginatedRecipes = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredRecipes
      .slice(start, start + rowsPerPage)
      .map((r) => ({ ...r, id: r._id }));
  }, [filteredRecipes, page]);

  const handleEdit = (id) =>
    toast.info(`Edit recipe with ID: ${id} (functionality not implemented)`);

  const handleFeature = async (id) => {
    console.log("Toggle featured for recipe ID:", id);
    setRecipes((prev) =>
      prev.map((r) => (r._id === id ? { ...r, isFeatured: !r.isFeatured } : r)),
    );

    const res = await recipeFeatureUnFeatured(id);
    console.log("Toggle featured response:", res);
  };

  if (!isMounted) return null;

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8 space-y-8 bg-neutral-50/50 dark:bg-zinc-950/40 text-zinc-800 dark:text-zinc-100 transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Manage Recipes
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
            Manage all recipes submitted by users across the FlavorFlow
            platform.
          </p>
        </div>
        <Chip
          variant="flat"
          className="bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/20 px-3 py-4 rounded-full shadow-sm shrink-0"
        >
          Total Recipes: {stats.total}
        </Chip>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {[
          {
            title: "Total Recipes",
            value: stats.total,
            desc: "All submitted recipes",
            icon: <FiBookOpen className="text-xl" />,
            color: "from-orange-500 to-red-500",
          },
          {
            title: "Featured Recipes",
            value: stats.featured,
            desc: "Highlighted on homepage",
            icon: <FiStar className="text-xl" />,
            color: "from-amber-400 to-orange-500",
          },
          {
            title: "Published Recipes",
            value: stats.published,
            desc: "Live and visible to users",
            icon: <FiAlertTriangle className="text-xl" />,
            color: "from-emerald-500 to-teal-600",
          },
          {
            title: "Total Likes",
            value: stats.totalLikes.toLocaleString(),
            desc: "Across all recipes",
            icon: <FiHeart className="text-xl" />,
            color: "from-rose-500 to-pink-600",
          },
        ].map((card, idx) => (
          <Card
            key={idx}
            className="border border-white/20 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-neutral-200/30 dark:shadow-none hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-6 flex flex-row items-center gap-5">
              <div
                className={`p-4 rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg shrink-0`}
              >
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 truncate">
                  {card.title}
                </p>
                <h3 className="text-2xl font-black mt-0.5 tracking-tight">
                  {card.value}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium mt-0.5 truncate">
                  {card.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Toolbar */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 p-4 border border-white/20 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 flex-wrap">
          <div className="relative w-full sm:max-w-xs flex items-center ">
            <FiSearch className="absolute left-1 text-zinc-400 z-10 " />
            <Input
              type="text"
              className="w-full pl-6"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              variant="flat"
              radius="lg"
            />
          </div>

          {/* FIX 1: Dropdown.Item-এ id={item.key} যুক্ত করা হয়েছে */}
          {/* Category Filter */}
          <Dropdown>
            <Button variant="flat" className="capitalize w-full sm:w-auto">
              {Array.from(selectedCategory)[0] === "all" ?
                "All Categories"
              : Array.from(selectedCategory)[0]}
            </Button>

            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Filter by Category"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedCategory}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0];
                  setSelectedCategory(new Set([value]));
                  setPage(1);
                }}
              >
                {categoryOptions.map((item) => (
                  <Dropdown.Item key={item.key} id={item.key}>
                    <Label>{item.label}</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* Cuisine Filter */}
          <Dropdown>
            <Button variant="flat" className="capitalize w-full sm:w-auto">
              {Array.from(selectedCuisine)[0] === "all" ?
                "All Cuisines"
              : Array.from(selectedCuisine)[0]}
            </Button>

            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Filter by Cuisine"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedCuisine}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0];
                  setSelectedCuisine(new Set([value]));
                  setPage(1);
                }}
              >
                {cuisineOptions.map((item) => (
                  <Dropdown.Item key={item.key} id={item.key}>
                    <Label>{item.label}</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* Featured Filter */}
          <Dropdown>
            <Button variant="flat" className="capitalize w-full sm:w-auto">
              {Array.from(selectedFeatured)[0] === "all" ?
                "All Recipes"
              : Array.from(selectedFeatured)[0] === "featured" ?
                "⭐ Featured"
              : "Normal"}
            </Button>

            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Filter by Featured Status"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedFeatured}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0];
                  setSelectedFeatured(new Set([value]));
                  setPage(1);
                }}
              >
                {featuredOptions.map((item) => (
                  <Dropdown.Item key={item.key} id={item.key}>
                    <Label>{item.label}</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>

        {/* Refresh */}
        <div className="flex items-center justify-end shrink-0">
          <Tooltip content="Refresh" closeDelay={100}>
            <Button
              isIconOnly
              variant="flat"
              radius="lg"
              onClick={fetchRecipes}
              className="bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
            >
              <FiRefreshCw className="text-base" />
            </Button>
          </Tooltip>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants} className="overflow-hidden">
        {isLoading ?
          <div className="w-full space-y-4 border border-white/20 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-3xl p-6">
            <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <Skeleton key={i} className="h-6 w-full rounded-lg" />
              ))}
            </div>
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex gap-4 pt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
                  <Skeleton key={col} className="h-14 w-full rounded-xl" />
                ))}
              </div>
            ))}
          </div>
        : <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-zinc-800/60 rounded-3xl p-3 shadow-xl overflow-x-auto">
            <Table>
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="FlavorFlow Manage Recipes Table"
                  className="min-w-full"
                >
                  <Table.Header>
                    <Table.Column className="w-16">IMAGE</Table.Column>
                    <Table.Column isRowHeader className="min-w-40">
                      RECIPE NAME
                    </Table.Column>
                    <Table.Column className="min-w-[100px]">
                      CATEGORY
                    </Table.Column>
                    <Table.Column className="min-w-[120px]">
                      CUISINE
                    </Table.Column>
                    <Table.Column className="min-w-[180px]">
                      AUTHOR
                    </Table.Column>
                    <Table.Column className="w-20">LIKES</Table.Column>
                    <Table.Column className="w-24">FEATURED</Table.Column>
                    <Table.Column className="min-w-[160px]">
                      CREATED DATE
                    </Table.Column>
                    <Table.Column className="w-28 text-center">
                      ACTIONS
                    </Table.Column>
                  </Table.Header>

                  <Table.Body
                    items={paginatedRecipes}
                    renderEmptyState={() => (
                      <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
                        <div className="p-5 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-zinc-800 dark:to-zinc-800 rounded-full text-zinc-400 dark:text-zinc-500 shadow-inner">
                          <FiInbox className="text-5xl" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-2xl font-bold tracking-tight">
                            No Recipes Found
                          </h3>
                          <p className="text-zinc-400 dark:text-zinc-500 font-medium max-w-xs mx-auto">
                            Try adjusting your keyword search or filters.
                          </p>
                        </div>
                      </div>
                    )}
                  >
                    {(recipe) => (
                      <Table.Row key={recipe?.id} id={recipe?.id}>
                        <Table.Cell>
                          <div className="w-[60px] h-[60px] rounded-2xl overflow-hidden shadow-md shrink-0">
                            <Image
                              src={recipe?.recipeImage}
                              alt={recipe?.recipeName}
                              width={60}
                              height={60}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm tracking-tight">
                              {recipe.recipeName}
                            </p>
                            <p className="text-xs font-normal text-zinc-400 dark:text-zinc-500 mt-0.5">
                              {recipe?.difficultyLevel} ·{" "}
                              {recipe?.preparationTime} min
                            </p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Chip
                            size="sm"
                            variant="flat"
                            color="primary"
                            className="text-xs font-semibold"
                          >
                            {recipe?.category}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium whitespace-nowrap">
                            {recipe?.cuisineType}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Avatar size="sm" className="shrink-0">
                              <Avatar.Image
                                alt={recipe?.author?.name}
                                src={recipe?.author?.avatar}
                              />
                              <Avatar.Fallback>
                                {recipe?.author?.name ?
                                  recipe?.author?.name.charAt(0)
                                : "U"}
                              </Avatar.Fallback>
                            </Avatar>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                                {recipe?.author?.name}
                              </p>
                              <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                                {recipe?.author?.email}
                              </p>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="flex items-center gap-1 text-sm font-semibold text-rose-500">
                            <FiHeart className="text-base" />{" "}
                            {recipe.likesCount.toLocaleString()}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          {recipe.isFeatured ?
                            <Chip
                              size="sm"
                              variant="flat"
                              color="warning"
                              className="font-semibold text-xs flex items-center gap-1 px-2"
                            >
                              <span>⭐</span>
                              Featured
                            </Chip>
                          : <Chip
                              size="sm"
                              variant="flat"
                              color="default"
                              className="font-semibold text-xs"
                            >
                              Normal
                            </Chip>
                          }
                        </Table.Cell>
                        <Table.Cell>
                          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap">
                            {formatDate(recipe.createdAt)}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center justify-center gap-1">
                            <Tooltip
                              content="Edit Recipe"
                              color="primary"
                              closeDelay={100}
                            >
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="primary"
                                onClick={() => handleEdit(recipe._id)}
                                className="hover:bg-primary-500/10 rounded-xl text-lg transition-all"
                              >
                                <FiEdit2 />
                              </Button>
                            </Tooltip>
                            <Tooltip
                              className="mr-7"
                              content="Delete Recipe"
                              color="danger"
                              closeDelay={100}
                            >
                              <DeleteRecipe
                                recipeId={recipe._id}
                                recipeName={recipe?.recipeName}
                                path="/recipes"
                              />
                            </Tooltip>

                            <Tooltip
                              content="Mark as Featured"
                              color="warning"
                              closeDelay={100}
                            >
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="warning"
                                onClick={() => handleFeature(recipe._id)}
                                className="hover:bg-warning-500/10 rounded-xl text-lg transition-all mx-5"
                              >
                                {recipe.isFeatured ?
                                  <Chip
                                    size="sm"
                                    variant="flat"
                                    color="warning"
                                    className="font-bold text-xs px-2"
                                  >
                                    <span>⭐</span> Featured
                                  </Chip>
                                : <FiStar />}
                              </Button>
                            </Tooltip>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>

              <Table.Footer>
                {pages > 1 && (
                  <div className="flex justify-center py-3">
                    <Pagination>
                      <Pagination.Summary>
                        Showing{" "}
                        {filteredRecipes.length === 0 ?
                          0
                        : (page - 1) * rowsPerPage + 1}
                        -{Math.min(page * rowsPerPage, filteredRecipes.length)}{" "}
                        of {filteredRecipes.length} results
                      </Pagination.Summary>
                      <Pagination.Content>
                        <Pagination.Item>
                          <Pagination.Previous
                            onClick={() =>
                              setPage((prev) => Math.max(prev - 1, 1))
                            }
                            className={
                              page === 1 ?
                                "pointer-events-none opacity-50"
                              : "cursor-pointer"
                            }
                          >
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                          </Pagination.Previous>
                        </Pagination.Item>

                        {Array.from({ length: pages }, (_, i) => i + 1).map(
                          (p) => (
                            <Pagination.Item key={p}>
                              <Pagination.Link
                                isActive={page === p}
                                onClick={() => setPage(p)}
                                className="cursor-pointer"
                              >
                                {p}
                              </Pagination.Link>
                            </Pagination.Item>
                          ),
                        )}

                        <Pagination.Item>
                          <Pagination.Next
                            onClick={() =>
                              setPage((prev) => Math.min(prev + 1, pages))
                            }
                            className={
                              page === pages ?
                                "pointer-events-none opacity-50"
                              : "cursor-pointer"
                            }
                          >
                            <span>Next</span>
                            <Pagination.NextIcon />
                          </Pagination.Next>
                        </Pagination.Item>
                      </Pagination.Content>
                    </Pagination>
                  </div>
                )}
              </Table.Footer>
            </Table>
          </div>
        }
      </motion.div>
    </motion.div>
  );
}
