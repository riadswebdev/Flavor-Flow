"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Chip,
  Button,
  Tooltip,
  Input,
  Dropdown,
  Skeleton,
  Spinner,
  Separator,
  Label,
} from "@heroui/react";
import {
  FiShoppingBag,
  FiDollarSign,
  FiCheckCircle,
  FiCreditCard,
  FiSearch,
  FiRefreshCw,
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiInbox,
} from "react-icons/fi";

export default function MyPurchasedRecipes({ purchasesData }) {
  const router = useRouter();

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(new Set(["all"]));
  const [selectedMethod, setSelectedMethod] = useState(new Set(["all"]));

  // Simulates loading cycle using the static array to maintain dashboard micro-interactions
  const fetchPurchases = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        setPurchases(purchasesData);
      } catch (err) {
        setError("Something went wrong while loading your recipes.");
      } finally {
        setLoading(false);
      }
    }, 800); // 800ms presentation delay for professional skeleton layout transition
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const filteredPurchases = purchases.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.recipeName?.toLowerCase().includes(searchQuery.toLowerCase());

    const statusValue = Array.from(selectedStatus)[0];
    const matchesStatus =
      !statusValue ||
      statusValue === "all" ||
      item.paymentStatus?.toLowerCase() === statusValue.toLowerCase();

    const methodValue = Array.from(selectedMethod)[0];
    const matchesMethod =
      !methodValue ||
      methodValue === "all" ||
      (item.paymentMethod || "card").toLowerCase() ===
        methodValue.toLowerCase();

    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Dynamic Statistics Calculations from Hardcoded Data
  const totalPurchased = filteredPurchases.length;

  const totalSpent = filteredPurchases.reduce((sum, item) => {
    if (item.paymentStatus === "paid") return sum + (item.amount || 0);
    return sum;
  }, 0);

  const successfulPayments = filteredPurchases.filter(
    (item) => item.paymentStatus === "paid",
  ).length;

  const getPrimaryPaymentMethod = () => {
    if (filteredPurchases.length === 0) return "None";
    const methods = filteredPurchases.map((p) => p.paymentMethod || "card");
    const counts = methods.reduce((acc, m) => {
      acc[m] = (acc[m] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).reduce(
      (a, b) => (counts[a] > counts[b] ? a : b),
      "card",
    );
  };

  const primaryMethod = getPrimaryPaymentMethod();

  // Framer Motion Animation Triggers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Status Chip Badge Utility
  const renderStatusChip = (status) => {
    const config = {
      paid: { color: "success", text: "Paid" },
      pending: { color: "warning", text: "Pending" },
      failed: { color: "danger", text: "Failed" },
    };
    const current = config[status?.toLowerCase()] || {
      color: "default",
      text: status,
    };

    return (
      <Chip
        variant="flat"
        color={current.color}
        size="sm"
        className="capitalize font-semibold"
      >
        {current.text}
      </Chip>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-8 space-y-8 bg-linear-to-b from-transparent to-orange-50/10 dark:to-orange-950/5"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-zinc-800/50 shadow-sm shadow-black/5">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-linear-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent">
            My Purchased Recipes
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm md:text-base">
            Access all the premium recipes you've purchased in one place.
          </p>
        </div>
        <div>
          <Chip
            variant="linear"
            className="bg-linear-to-r from-orange-500 to-red-500 text-white border-none px-3 py-4 shadow-md rounded-2xl font-medium text-sm"
          >
            <FiShoppingBag className="mx-1" />
            Total Purchased Recipes: {totalPurchased}
          </Chip>
        </div>
      </div>

      {/* Statistics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Purchased Count */}
        <Card className="rounded-3xl border border-white/20 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm shadow-black/5">
          <CardContent className="flex flex-row items-center gap-4 p-5">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
              {loading ?
                <Spinner size="sm" color="warning" />
              : <FiShoppingBag size={24} />}
            </div>
            <div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
                Total Purchased
              </p>
              <h3 className="text-2xl font-bold mt-0.5 text-zinc-800 dark:text-zinc-100">
                {loading ? "..." : totalPurchased}
              </h3>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Combined Financial Spend */}
        <Card className="rounded-3xl border border-white/20 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm shadow-black/5">
          <CardContent className="flex flex-row items-center gap-4 p-5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
              {loading ?
                <Spinner size="sm" color="success" />
              : <FiDollarSign size={24} />}
            </div>
            <div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
                Total Amount Spent
              </p>
              <h3 className="text-2xl font-bold mt-0.5 text-zinc-800 dark:text-zinc-100">
                {loading ? "..." : `$${totalSpent}`}
              </h3>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Cleared Operations */}
        <Card className="rounded-3xl border border-white/20 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm shadow-black/5">
          <CardContent className="flex flex-row items-center gap-4 p-5">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              {loading ?
                <Spinner size="sm" color="primary" />
              : <FiCheckCircle size={24} />}
            </div>
            <div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
                Successful Payments
              </p>
              <h3 className="text-2xl font-bold mt-0.5 text-zinc-800 dark:text-zinc-100">
                {loading ? "..." : successfulPayments}
              </h3>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Top Channel Medium */}
        <Card className="rounded-3xl border border-white/20 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm shadow-black/5">
          <CardContent className="flex flex-row items-center gap-4 p-5">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
              {loading ?
                <Spinner size="sm" color="secondary" />
              : <FiCreditCard size={24} />}
            </div>
            <div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
                Payment Method
              </p>
              <h3 className="text-xl font-bold mt-1 text-zinc-800 dark:text-zinc-100 capitalize">
                {loading ? "..." : primaryMethod}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar Controls Structure */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-white/10 dark:border-zinc-800/40">
        {/* Search Input */}
        <div className="w-full sm:max-w-md flex items-center gap-2 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-2xl px-3 py-2 shadow-sm">
          <FiSearch className="text-zinc-400 pointer-events-none" />
          <Input
            radius="2xl"
            className=" w-full focus:border-none focus:ring-0 shadow-inner"
            placeholder="Search by recipe name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex w-full sm:w-auto items-center justify-end gap-2">
          {/* Payment Status Dropdown Filter */}
          <Dropdown>
            <Dropdown.Trigger
              variant="flat"
              radius="2xl"
              className="capitalize bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm p-1 rounded-md"
            >
              Status: {Array.from(selectedStatus)[0]}
            </Dropdown.Trigger>

            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Filter by payment status"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedStatus}
                onSelectionChange={setSelectedStatus}
              >
                <Dropdown.Item id="all">
                  <Label>All Statuses</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="paid">
                  <Label>Paid</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="pending">
                  <Label>Pending</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="failed">
                  <Label>Failed</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* Payment Method Dropdown Filter */}
          <Dropdown>
            <Dropdown.Trigger
              variant="flat"
              radius="2xl"
              className="capitalize bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm p-1 rounded-md"
            >
              Method: {Array.from(selectedMethod)[0]}
            </Dropdown.Trigger>

            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Filter by payment method"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedMethod}
                onSelectionChange={setSelectedMethod}
              >
                <Dropdown.Item id="all">
                  <Label>All Methods</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="card">
                  <Label>Card</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="paypal">
                  <Label>PayPal</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="crypto">
                  <Label>Crypto</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* Trigger Static Re-Load */}
          <Tooltip content="Refresh Data">
            <Button
              isIconOnly
              variant="flat"
              radius="2xl"
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 shadow-sm"
              onClick={fetchPurchases}
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Main Grid Render State Machine */}
      {loading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <Card
              key={idx}
              className="rounded-3xl p-4 space-y-4 border border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70"
            >
              <Skeleton className="rounded-2xl ratio-video aspect-video w-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-1/3 rounded-md" />
                <Skeleton className="h-9 w-1/3 rounded-xl" />
              </div>
            </Card>
          ))}
        </div>
      : error ?
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white/40 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-red-500/30">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <Button
            color="danger"
            radius="xl"
            variant="flat"
            onClick={fetchPurchases}
          >
            Try Again
          </Button>
        </div>
      : filteredPurchases.length === 0 ?
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center p-12 md:p-20 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-white/20 dark:border-zinc-800/50 shadow-xl max-w-2xl mx-auto"
        >
          <div className="p-6 rounded-full bg-linear-to-tr from-orange-500/10 to-red-500/10 text-orange-500 mb-6 shadow-inner">
            <FiInbox size={48} className="stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">
            No Purchased Recipes Yet
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm text-sm md:text-base leading-relaxed">
            You haven&apos;t purchased any recipes yet. Explore our premium
            collection and unlock delicious culinary masterclasses.
          </p>
          <Button
            className="mt-8 px-8 font-semibold text-white bg-linear-to-r from-orange-500 to-red-500 hover:opacity-90 shadow-lg shadow-orange-500/20"
            radius="3xl"
            size="lg"
            onClick={() => router.push("/recipes")}
          >
            Browse Recipes
          </Button>
        </motion.div>
      : <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPurchases.map((item, index) => (
            <motion.div
              key={`${item.transactionId}-${index}`}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group"
            >
              <Card className="h-full rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/20 dark:border-zinc-800/40 shadow-md group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Recipe Cover Art Context */}
                <CardHeader className="p-0 relative overflow-hidden aspect-video">
                  <Image
                    fill
                    alt={item.recipeName}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    src={
                      item.recipeImage ||
                      "https://images.unsplash.com/photo-1495521821757-a1efb6729352"
                    }
                    fill
                    radius="none"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent z-10 opacity-60" />

                  {/* High Quality Context Badges */}
                  <div className="absolute top-3 left-3 z-20">
                    <Chip
                      className="bg-linear-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider border-none shadow-md"
                      size="sm"
                    >
                      <FiAward size={12} className="mr-0.5" />
                      Premium
                    </Chip>
                  </div>

                  <div className="absolute top-3 right-3 z-20">
                    <Chip
                      className="bg-black/60 backdrop-blur-md text-white font-bold border border-white/10"
                      size="sm"
                    >
                      ${item.amount}
                    </Chip>
                  </div>
                </CardHeader>

                {/* Info Text Metrics Layout */}
                <CardContent className="p-5 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 line-clamp-1 group-hover:text-orange-500 transition-colors">
                      {item.recipeName}
                    </h3>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-zinc-400">
                          Method:
                        </span>
                        <span className="capitalize bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md font-semibold text-zinc-600 dark:text-zinc-300">
                          {item.paymentMethod || "card"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 justify-end">
                        {renderStatusChip(item.paymentStatus)}
                      </div>
                    </div>
                  </div>

                  <Separator className="opacity-60" />

                  {/* Tooltip and Meta-Log Details */}
                  <div className="space-y-1 text-xs text-zinc-400 dark:text-zinc-500">
                    <div className="flex items-center justify-between">
                      <span>Transaction ID:</span>
                      <Tooltip
                        content={item.transactionId}
                        placement="top"
                        closeDelay={150}
                      >
                        <span className="font-mono text-zinc-600 dark:text-zinc-300 cursor-help underline decoration-dotted decoration-zinc-400">
                          {item.transactionId ?
                            `${item.transactionId.slice(0, 12)}...${item.transactionId.slice(-6)}`
                          : "N/A"}
                        </span>
                      </Tooltip>
                    </div>

                    {item.purchaseDate && (
                      <div className="flex items-center justify-between pt-1">
                        <span className="flex items-center gap-1">
                          <FiCalendar size={12} /> Purchased:
                        </span>
                        <span className="font-medium text-zinc-600 dark:text-zinc-300">
                          {item.purchaseDate}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>

                {/* Dashboard Navigation Activation Action */}
                <CardFooter className="p-5 pt-0">
                  <Button
                    className="w-full font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-linear-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-300 shadow-sm"
                    radius="2xl"
                    onClick={() => router.push(`/recipes/${item.recipeId}`)}
                  >
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      }
    </motion.div>
  );
}
