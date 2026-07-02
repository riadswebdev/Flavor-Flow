"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table } from "@heroui/react";

// ================= CUSTOM LIGHTWEIGHT INLINE SVG ICONS =================
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const RefreshIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18"
    />
  </svg>
);

const DollarIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CreditCardIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const AlertTriangleIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const RepeatIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.13-5.36M20 15a9 9 0 01-14.13 5.36"
    />
  </svg>
);

const ShoppingBagIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z"
    />
  </svg>
);

// ================= CUSTOM LIGHTWEIGHT HEROUI-MIMIC COMPONENTS =================
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl p-5 ${className}`}
  >
    {children}
  </div>
);

const Chip = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold leading-5 ${className}`}
  >
    {children}
  </span>
);

const Button = ({ children, className = "", onClick, isIconOnly = false }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
      isIconOnly ? "p-2 rounded-full" : "px-4 py-2 rounded-2xl"
    } ${className}`}
  >
    {children}
  </button>
);

const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-zinc-200/80 dark:bg-zinc-800/85 rounded-lg ${className}`}
  />
);

export default function TransactionsClient({ initialData }) {
  const [transactions, setTransactions] = useState(initialData);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState(""); // "subscription" | "purchase" | ""

  // Custom dropdown states
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  // Simulated API fetch
  const fetchTransactions = () => {
    setLoading(true);
    setStatusDropdownOpen(false);
    setPlanDropdownOpen(false);
    setTypeDropdownOpen(false);
    setTimeout(() => {
      setTransactions(initialData);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ============= Transaction Type Helper =============
  // Recipe purchases carry `recipeId`, subscriptions carry `planId`.
  // This keeps the distinction in one place so the rest of the UI stays consistent.
  const getTransactionType = (item) => {
    if (item.recipeId) return "purchase";
    if (item.planId) return "subscription";
    return "unknown";
  };

  const typeMeta = {
    subscription: {
      label: "Subscription",
      icon: <RepeatIcon />,
      badgeClass:
        "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200/50",
    },
    purchase: {
      label: "Purchase",
      icon: <ShoppingBagIcon />,
      badgeClass:
        "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-200/50",
    },
    unknown: {
      label: "Unknown",
      icon: null,
      badgeClass:
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50",
    },
  };

  // Date Formatter Helper
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amps = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day} ${month} ${year} • ${hours.toString().padStart(2, "0")}:${minutes} ${amps}`;
  };

  // Metrics Calculations
  const totalRevenue = transactions
    .filter((t) => t.paymentStatus?.toLowerCase() === "paid")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const subscriptionRevenue = transactions
    .filter(
      (t) =>
        t.paymentStatus?.toLowerCase() === "paid" &&
        getTransactionType(t) === "subscription",
    )
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const purchaseRevenue = transactions
    .filter(
      (t) =>
        t.paymentStatus?.toLowerCase() === "paid" &&
        getTransactionType(t) === "purchase",
    )
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const premiumMembersCount = new Set(
    transactions.filter((t) => t.planId === "premium").map((t) => t.userId),
  ).size;

  const successfulPaymentsCount = transactions.filter(
    (t) => t.paymentStatus?.toLowerCase() === "paid",
  ).length;

  // Search & Filter Logic
  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipeName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter ?
        item.paymentStatus?.toLowerCase() === statusFilter.toLowerCase()
      : true;
    const matchesPlan =
      planFilter ?
        item.planId?.toLowerCase() === planFilter.toLowerCase()
      : true;
    const matchesType =
      typeFilter ? getTransactionType(item) === typeFilter : true;
    return matchesSearch && matchesStatus && matchesPlan && matchesType;
  });

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const glassClass =
    "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800/50 shadow-xl rounded-3xl";

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen text-zinc-900 dark:text-zinc-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Transactions
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 mt-1 text-sm font-medium">
            View and monitor all subscription and recipe purchase transactions.
          </p>
        </div>
        <Chip className="bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/50 font-semibold px-4 py-2">
          Total Transactions: {transactions.length}
        </Chip>
      </div>

      {/* ================= SUMMARY STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {[
          {
            title: "Total Transactions",
            value:
              loading ? <Skeleton className="w-12 h-6" /> : transactions.length,
            icon: <CreditCardIcon className="text-xl" />,
            color: "from-blue-500 to-indigo-600",
          },
          {
            title: "Subscription Revenue",
            value:
              loading ?
                <Skeleton className="w-20 h-6" />
              : `$${subscriptionRevenue.toFixed(2)}`,
            icon: <RepeatIcon className="w-5 h-5" />,
            color: "from-blue-500 to-cyan-600",
          },
          {
            title: "Recipe Purchase Revenue",
            value:
              loading ?
                <Skeleton className="w-20 h-6" />
              : `$${purchaseRevenue.toFixed(2)}`,
            icon: <ShoppingBagIcon className="w-5 h-5" />,
            color: "from-purple-500 to-pink-600",
          },
          {
            title: "Successful Payments",
            value:
              loading ?
                <Skeleton className="w-12 h-6" />
              : successfulPaymentsCount,
            icon: <CheckCircleIcon className="text-xl" />,
            color: "from-emerald-500 to-teal-600",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            variants={itemVariants}
          >
            <Card className="overflow-hidden relative group border-none shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                    {card.title}
                  </p>
                  <div className="text-2xl font-black text-gray-800 dark:text-zinc-200 mt-2 font-mono">
                    {card.value}
                  </div>
                </div>
                <div
                  className={`p-3.5 rounded-2xl bg-linear-to-r ${card.color}  shadow-lg`}
                >
                  {card.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ================= TOOLBAR & SEARCH FILTERS (Crucial z-20 stacking) ================= */}
      <div
        className={`${glassClass} p-4 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-md relative z-20`}
      >
        <div className="flex flex-col sm:flex-row w-full gap-3 items-center flex-1 flex-wrap">
          {/* Search Input Box */}
          <div className="relative w-full sm:max-w-xs flex items-center">
            <span className="absolute left-3.5 text-zinc-400 z-10">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by user email or recipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 border-none outline-hidden focus:ring-2 focus:ring-orange-500/50 rounded-full h-10 transition-all  dark:text-zinc-150"
            />
          </div>

          {/* Transaction Type Filter (Subscription vs Recipe Purchase) */}
          <div className="relative w-full sm:max-w-44 z-30">
            <button
              onClick={() => {
                setTypeDropdownOpen(!typeDropdownOpen);
                setStatusDropdownOpen(false);
                setPlanDropdownOpen(false);
              }}
              className="w-full dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all rounded-full h-10 px-4 flex items-center justify-between text-sm font-semibold border-none text-zinc-700 dark:text-zinc-250 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                {typeFilter && typeMeta[typeFilter]?.icon}
                {typeFilter ? typeMeta[typeFilter]?.label : "Transaction Type"}
              </span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${typeDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {typeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 rounded-2xl shadow-2xl p-1 z-50 overflow-hidden"
                >
                  <ul className="space-y-0.5">
                    {["subscription", "purchase"].map((opt) => (
                      <li key={opt}>
                        <button
                          onClick={() => {
                            setTypeFilter(opt);
                            setTypeDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-semibold hover:bg-orange-500/10 hover:text-orange-500 transition-all text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
                        >
                          {typeMeta[opt].icon}
                          {typeMeta[opt].label}
                        </button>
                      </li>
                    ))}
                    {typeFilter && (
                      <li className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setTypeFilter("");
                            setTypeDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          Clear Type
                        </button>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status Select Filter Component */}
          <div className="relative w-full sm:max-w-40 z-30">
            <button
              onClick={() => {
                setStatusDropdownOpen(!statusDropdownOpen);
                setPlanDropdownOpen(false);
                setTypeDropdownOpen(false);
              }}
              className="w-full dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all rounded-full h-10 px-4 flex items-center justify-between text-sm font-semibold border-none text-zinc-700 dark:text-zinc-250 cursor-pointer"
            >
              <span>
                {statusFilter ?
                  statusFilter === "paid" ?
                    "Paid"
                  : statusFilter === "pending" ?
                    "Pending"
                  : "Failed"
                : "Select Status"}
              </span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${statusDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {statusDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 rounded-2xl shadow-2xl p-1 z-50 overflow-hidden"
                >
                  <ul className="space-y-0.5">
                    {["paid", "pending", "failed"].map((opt) => (
                      <li key={opt}>
                        <button
                          onClick={() => {
                            setStatusFilter(opt);
                            setStatusDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-semibold capitalize hover:bg-orange-500/10 hover:text-orange-500 transition-all text-zinc-700 dark:text-zinc-300"
                        >
                          {opt}
                        </button>
                      </li>
                    ))}
                    {statusFilter && (
                      <li className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setStatusFilter("");
                            setStatusDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          Clear Status
                        </button>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Plan Select Filter Component (only relevant for subscriptions) */}
          <div className="relative w-full sm:max-w-40 z-30">
            <button
              onClick={() => {
                setPlanDropdownOpen(!planDropdownOpen);
                setStatusDropdownOpen(false);
                setTypeDropdownOpen(false);
              }}
              className="w-full dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all rounded-full h-10 px-4 flex items-center justify-between text-sm font-semibold border-none text-zinc-700 dark:text-zinc-250 cursor-pointer"
            >
              <span>
                {planFilter ?
                  planFilter === "premium" ?
                    "Premium"
                  : "Free"
                : "Membership"}
              </span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${planDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {planDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 rounded-2xl shadow-2xl p-1 z-50 overflow-hidden"
                >
                  <ul className="space-y-0.5">
                    {["premium", "free"].map((opt) => (
                      <li key={opt}>
                        <button
                          onClick={() => {
                            setPlanFilter(opt);
                            setPlanDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-semibold capitalize hover:bg-orange-500/10 hover:text-orange-500 transition-all text-zinc-700 dark:text-zinc-300"
                        >
                          {opt}
                        </button>
                      </li>
                    ))}
                    {planFilter && (
                      <li className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setPlanFilter("");
                            setPlanDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          Clear Filter
                        </button>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Refresh Action Trigger */}
        <Button
          isIconOnly
          onClick={fetchTransactions}
          className="bg-orange-50 dark:bg-orange-950/20 text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-950/40 w-10 h-10 flex items-center justify-center transition-colors z-30"
        >
          <RefreshIcon
            className={`text-base ${loading ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      {/* ================= TRANSACTIONS DATATABLE GRID (Crucial z-10 stacking) ================= */}
      <motion.div
        variants={itemVariants}
        className="overflow-visible relative z-10"
      >
        {loading ?
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-24" />
              ))}
            </div>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-zinc-100/50 dark:border-zinc-850/50"
              >
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-5 w-36" />
              </div>
            ))}
          </Card>
        : filteredTransactions.length === 0 ?
          /* ================= EMPTY STATE CONTAINER ================= */
          <Card className="p-12 flex flex-col items-center justify-center text-center max-w-xl mx-auto border-dashed border-2 border-orange-300/40 relative z-10">
            <div className="p-5 rounded-full bg-linear-to-tr from-orange-100 to-red-100 dark:from-orange-950/20 dark:to-red-950/20 text-orange-500 mb-5">
              <AlertTriangleIcon className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100">
              No Transactions Match Filters
            </h2>
            <p className="text-gray-400 dark:text-zinc-500 text-sm mt-2 max-w-sm">
              Try adjusting your type, plan, transaction status, or keyword
              search query filters.
            </p>
          </Card>
        : /* ================= THE STYLED PREMIUM RESPONSIVE TABLE ================= */
          <div
            className={`${glassClass} overflow-x-auto relative shadow-2xl z-10`}
          >
            <Table aria-label="Transactions table">
              <Table.ScrollContainer>
                <Table.Content aria-label="Transactions table">
                  <Table.Header>
                    <Table.Column isRowHeader>User (Email)</Table.Column>
                    <Table.Column>Type</Table.Column>
                    <Table.Column>Plan / Item</Table.Column>
                    <Table.Column>Amount</Table.Column>
                    <Table.Column>Payment Date</Table.Column>
                    <Table.Column>Payment Status</Table.Column>
                    <Table.Column>Transaction ID</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {filteredTransactions.map((item) => {
                      const type = getTransactionType(item);
                      const meta = typeMeta[type];
                      return (
                        <Table.Row key={item._id || item.transactionId}>
                          {/* User Email */}
                          <Table.Cell className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
                            {item.userEmail}
                          </Table.Cell>

                          {/* Transaction Type Badge (Subscription vs Recipe Purchase) */}
                          <Table.Cell>
                            <Chip className={meta.badgeClass}>
                              {meta.icon}
                              {meta.label}
                            </Chip>
                          </Table.Cell>

                          {/* Plan / Item — plan name for subscriptions, recipe name for purchases */}
                          <Table.Cell>
                            {type === "subscription" ?
                              <span className="capitalize px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                {item.planId}
                              </span>
                            : type === "purchase" ?
                              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                Recipe
                              </span>
                            : <span className="text-zinc-400">—</span>}
                          </Table.Cell>

                          {/* Amount */}
                          <Table.Cell className="text-sm font-bold font-mono text-gray-800 dark:text-zinc-200">
                            ${item.amount?.toFixed(2)}
                          </Table.Cell>

                          {/* Payment Date */}
                          <Table.Cell className="text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                            {formatDate(item.createdAt)}
                          </Table.Cell>

                          {/* Payment Status */}
                          <Table.Cell>
                            <Chip
                              className={`capitalize font-bold px-3 py-1 rounded-full border ${
                                item.paymentStatus?.toLowerCase() === "paid" ?
                                  "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/50"
                                : (
                                  item.paymentStatus?.toLowerCase() ===
                                  "pending"
                                ) ?
                                  "bg-warning-50 dark:bg-warning-950/30 text-warning-600 dark:text-warning-400 border-warning-200/50"
                                : "bg-danger-50 dark:bg-danger-950/30 text-danger-600 dark:text-danger-400 border-danger-200/50"
                              }`}
                            >
                              {item.paymentStatus || "Unknown"}
                            </Chip>
                          </Table.Cell>

                          {/* Transaction ID with native title tooltip */}
                          <Table.Cell
                            className="text-sm font-mono text-gray-400 dark:text-zinc-500 whitespace-nowrap"
                            title={item.transactionId}
                          >
                            <span className="cursor-help border-b border-dashed border-gray-300 dark:border-zinc-700 pb-0.5">
                              {(
                                item.transactionId &&
                                item.transactionId.length > 20
                              ) ?
                                `${item.transactionId.substring(0, 19)}...`
                              : item.transactionId}
                            </span>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        }
      </motion.div>
    </motion.div>
  );
}
