"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Label,
  Chip,
  Tooltip,
  Card,
  Skeleton,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiChevronDown,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiHeart,
  FiCalendar,
  FiInbox,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Difficulty & Status Styling Maps
const difficultyColorMap = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger",
};

const statusColorMap = {
  published: "success",
  draft: "default",
  featured: "secondary",
};

const UserTotalRecipe = ({ initialRecipes = [], userId }) => {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedRecipeToDelete, setSelectedRecipeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // States for Toolbar Filters
  const [filterValue, setFilterValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortDescriptor, setSortDescriptor] = useState("latest");

  // Simulate Initial Load State for Skeleton
  useEffect(() => {
    if (initialRecipes) {
      setRecipes(initialRecipes);
      setIsLoading(false);
    }
  }, [initialRecipes]);

  const categories = useMemo(() => {
    const list = new Set(recipes.map((r) => r.category).filter(Boolean));
    return ["all", ...Array.from(list)];
  }, [recipes]);

  // Search, Filter, and Sort Logic
  const filteredItems = useMemo(() => {
    let filteredRecipes = [...recipes];

    if (filterValue) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.recipeName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (categoryFilter !== "all") {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.category === categoryFilter,
      );
    }
    if (statusFilter !== "all") {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.status === statusFilter,
      );
    }

    // Sorting functionality
    filteredRecipes.sort((a, b) => {
      const first = new Date(a.createdAt).getTime();
      const second = new Date(b.createdAt).getTime();
      return sortDescriptor === "latest" ? second - first : first - second;
    });

    return filteredRecipes;
  }, [recipes, filterValue, categoryFilter, statusFilter, sortDescriptor]);

  // Modal Open Trigger
  const requestDelete = (recipe) => {
    setSelectedRecipeToDelete(recipe);
    if (typeof onOpen === "function") onOpen();
  };

  // Express API Delete Handler
  const handleDelete = async () => {
    if (!selectedRecipeToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/recipes/${selectedRecipeToDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRecipes((prev) =>
          prev.filter((r) => r._id !== selectedRecipeToDelete._id),
        );
        router.refresh();
        if (typeof onOpenChange === "function") onOpenChange(false);
      }
    } catch (error) {
      console.error("Failed to delete recipe", error);
    } finally {
      setIsDeleting(false);
      setSelectedRecipeToDelete(null);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md border border-default-200/50 p-6 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            My Recipes
          </h1>
          <p className="text-default-500 mt-1 text-sm sm:text-base">
            Manage, edit, and organize all recipes you've created.
          </p>
        </div>
        <Link href="/dashboard/user/add-recipe">
          <Button className="bg-linear-to-r from-orange-500 to-red-600 text-white font-bold shadow-lg shadow-orange-500/20 hover:scale-105 hover:shadow-xl transition-all rounded-2xl flex items-center gap-2">
            <span>Add Recipe</span>
            <FiPlus className="text-lg" />
          </Button>
        </Link>
      </div>

      {/* Top Toolbar */}
      <div className="flex flex-col gap-4 bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md border border-default-200/50 p-4 rounded-3xl shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-2xl">
            <Input
              className="w-full sm:max-w-xs"
              placeholder="Search recipes..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />

            {/* Category Filter */}
            <Dropdown>
              <Dropdown.Trigger>
                <div
                  role="button"
                  tabIndex={0}
                  className="capitalize flex items-center gap-2 bg-default-100 hover:bg-default-200 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
                >
                  <span>Category: {categoryFilter}</span>
                  <FiChevronDown />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu
                  aria-label="Category Filter Options"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={new Set([categoryFilter])}
                  onSelectionChange={(keys) =>
                    setCategoryFilter(Array.from(keys)[0])
                  }
                >
                  {categories.map((cat) => (
                    <Dropdown.Item key={cat} className="capitalize">
                      {cat}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            {/* Status Filter */}
            <Dropdown>
              <Dropdown.Trigger>
                <div
                  role="button"
                  tabIndex={0}
                  className="capitalize flex items-center gap-2 bg-default-100 hover:bg-default-200 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
                >
                  <span>Status: {statusFilter}</span>
                  <FiChevronDown />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu
                  aria-label="Status Filter Options"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={new Set([statusFilter])}
                  onSelectionChange={(keys) =>
                    setStatusFilter(Array.from(keys)[0])
                  }
                >
                  <Dropdown.Item key="all">All Status</Dropdown.Item>
                  <Dropdown.Item key="published">Published</Dropdown.Item>
                  <Dropdown.Item key="draft">Draft</Dropdown.Item>
                  <Dropdown.Item key="featured">Featured</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>

          <div className="flex items-center gap-4 justify-between w-full lg:w-auto">
            <Chip color="warning" variant="flat" className="font-semibold">
              Showing {filteredItems.length} Recipes
            </Chip>

            <Dropdown>
              <Dropdown.Trigger>
                <div
                  role="button"
                  tabIndex={0}
                  className="capitalize flex items-center gap-2 border border-default-200 hover:bg-default-50 px-2 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
                >
                  <span>Sort: {sortDescriptor}</span>
                  <FiChevronDown />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu
                  aria-label="Sorting Options"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={[sortDescriptor]}
                  onSelectionChange={(keys) =>
                    setSortDescriptor(Array.from(keys)[0])
                  }
                >
                  <Dropdown.Item key="latest">
                    <Label>Latest</Label>
                  </Dropdown.Item>
                  <Dropdown.Item key="oldest">
                    <Label>Oldest</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Dynamic Render: Loading -> Empty -> Content */}
      {isLoading ?
        <div className="space-y-4">
          <Skeleton className="w-full h-16 rounded-3xl" />
          <Skeleton className="w-full h-48 rounded-3xl" />
        </div>
      : filteredItems.length === 0 ?
        <Card className="border border-default-200/50 bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md rounded-3xl py-12 shadow-xl">
          <Card.Content className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="p-4 bg-default-100 dark:bg-zinc-800 rounded-full text-default-400">
              <FiInbox className="text-6xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">No Recipes Found</h3>
              <p className="text-default-400 text-sm mt-1 max-w-sm">
                You haven&apos;t published any recipes matching the filters yet.
              </p>
            </div>
            <Link href="/dashboard/add-recipe">
              <Button className="bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold rounded-2xl">
                Create Your First Recipe
              </Button>
            </Link>
          </Card.Content>
        </Card>
      : <>
          {/* Desktop Table View Layout */}
          <div className="hidden md:block bg-white/5 dark:bg-zinc-900/10 backdrop-blur-md border border-default-200/50 rounded-3xl p-4 shadow-xl overflow-hidden">
            <Table aria-label="Recipe Management Table">
              <Table.ScrollContainer>
                <Table.Content>
                  <Table.Header>
                    <Table.Column>RECIPE IMAGE</Table.Column>
                    <Table.Column isRowHeader>RECIPE NAME</Table.Column>
                    <Table.Column>CATEGORY</Table.Column>
                    <Table.Column>CUISINE</Table.Column>
                    <Table.Column>DIFFICULTY</Table.Column>
                    <Table.Column>LIKES</Table.Column>
                    <Table.Column>STATUS</Table.Column>
                    <Table.Column>CREATED AT</Table.Column>
                    <Table.Column align="center">ACTIONS</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {filteredItems.map((recipe) => (
                      <Table.Row
                        key={recipe._id}
                        className="hover:bg-default-100/40 dark:hover:bg-default-100/10 transition-colors border-b border-default-100/50"
                      >
                        <Table.Cell>
                          <Image
                            src={recipe.recipeImage || "/placeholder.png"}
                            alt={recipe.recipeName || "recipe image"}
                            width={64}
                            height={64}
                            className="object-cover border border-default-200 rounded-xl"
                            style={{ display: "block" }}
                          />
                        </Table.Cell>
                        <Table.Cell className="font-bold text-default-800 dark:text-default-200">
                          {recipe.recipeName}
                        </Table.Cell>
                        <Table.Cell>
                          <Chip
                            size="sm"
                            variant="flat"
                            color="warning"
                            className="font-medium capitalize"
                          >
                            {recipe.category}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell className="text-sm text-default-600 dark:text-default-300 font-medium">
                          {recipe.cuisineType}
                        </Table.Cell>
                        <Table.Cell>
                          <Chip
                            size="sm"
                            color={
                              difficultyColorMap[recipe.difficultyLevel] ||
                              "default"
                            }
                            variant="dot"
                            className="font-semibold"
                          >
                            {recipe.difficultyLevel}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-1 text-sm font-semibold text-red-500">
                            <FiHeart className="fill-current" />{" "}
                            {recipe.likesCount || 0}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Chip
                            size="sm"
                            color={statusColorMap[recipe.status] || "default"}
                            variant="flat"
                            className="capitalize font-bold"
                          >
                            {recipe.status}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell className="text-xs text-default-400 font-medium">
                          {new Date(recipe.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="relative flex items-center justify-center gap-2">
                            <Tooltip content="View Details">
                              <Link href={`/recipes/${recipe._id}`}>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-default-400 hover:text-warning text-lg"
                                >
                                  <FiEye />
                                </Button>
                              </Link>
                            </Tooltip>
                            <Tooltip content="Edit Recipe">
                              <Link
                                href={`/dashboard/user/my-recipes/${recipe._id}`}
                              >
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-default-400 hover:text-secondary text-lg"
                                >
                                  <FiEdit2 />
                                </Button>
                              </Link>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete Recipe">
                              <Button
                                onClick={() => requestDelete(recipe)}
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-default-400 hover:text-danger text-lg"
                              >
                                <FiTrash2 />
                              </Button>
                            </Tooltip>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>

          {/* Mobile Card Responsive Layout */}
          <div className="grid gap-4 md:hidden">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((recipe) => (
                <motion.div
                  key={recipe._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md border border-default-200/50 rounded-3xl p-5 shadow-lg flex flex-col gap-4 hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={recipe.recipeImage || "/placeholder.png"}
                      alt={recipe.recipeName}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-2xl border border-default-200 shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <h4 className="font-bold text-lg truncate text-default-800 dark:text-default-200">
                        {recipe.recipeName}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        <Chip
                          size="sm"
                          variant="flat"
                          color="warning"
                          className="capitalize text-xs"
                        >
                          {recipe.category}
                        </Chip>
                        <Chip
                          size="sm"
                          color={statusColorMap[recipe.status] || "default"}
                          variant="flat"
                          className="capitalize text-xs font-bold"
                        >
                          {recipe.status}
                        </Chip>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-default-100/50 py-3 text-default-500">
                    <div>
                      Cuisine:{" "}
                      <span className="font-semibold text-default-700 dark:text-default-300">
                        {recipe.cuisineType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      Likes:{" "}
                      <span className="font-semibold text-red-500 flex items-center gap-0.5">
                        <FiHeart className="fill-current" />{" "}
                        {recipe.likesCount || 0}
                      </span>
                    </div>
                    <div>
                      Difficulty:{" "}
                      <span className="font-semibold capitalize">
                        {recipe.difficultyLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar />{" "}
                      {new Date(recipe.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Link href={`/recipes/${recipe._id}`}>
                      <Button
                        size="sm"
                        variant="flat"
                        className="font-semibold rounded-xl w-full"
                      >
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/user/my-recipes/${recipe._id}`}>
                      <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        className="font-semibold rounded-xl w-full"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => requestDelete(recipe)}
                      size="sm"
                      variant="flat"
                      color="danger"
                      className="font-semibold rounded-xl w-full"
                    >
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      }
    </motion.section>
  );
};

export default UserTotalRecipe;