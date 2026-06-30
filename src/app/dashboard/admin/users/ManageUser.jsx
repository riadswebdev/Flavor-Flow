"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { toggleUserBlockStatus } from "@/lib/actions/user";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

// ================= CUSTOM INLINE SVG ICONS (FOR ZERO COMPILE ERRORS) =================
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

const CrownIcon = ({ className = "w-4 h-4" }) => (
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
      d="M9 12l2 2 4-4M7.5 8.25h9m-9 3h9m-9 3h9m-11.25-6a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H3.75z"
    />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
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
      d="M16 7a4 4 0 110 8 4 4 0 010-8zm-8 11a6 6 0 0112 0v1H8v-1z"
    />
  </svg>
);

const UsersIcon = ({ className = "w-6 h-6" }) => (
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
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const EditIcon = ({ className = "w-4 h-4" }) => (
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
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

const ShieldIcon = ({ className = "w-4 h-4" }) => (
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
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const ShieldOffIcon = ({ className = "w-4 h-4" }) => (
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
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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

const RefreshIcon = ({ className = "w-4 h-4" }) => (
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

const AlertTriangleIcon = ({ className = "w-10 h-10" }) => (
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

const EyeIcon = ({ className = "w-4 h-4" }) => (
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
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

// ================= CUSTOM ACCESSIBLE COMPONENTS =================
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

export default function ManageUsersPage({ totalUsers }) {
  const router = useRouter();

  // States
  const [users, setUsers] = useState(totalUsers);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("");
  // Dropdown states
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [membershipDropdownOpen, setMembershipDropdownOpen] = useState(false);

  // Selected User for View Modal
  const [selectedUser, setSelectedUser] = useState(null);

  // Simulated Database Refresh Handlers
  const fetchUsers = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(totalUsers);
      setLoading(false);
    }, 1000);
  };

  // Block/Unblock toggle handler
  const handleToggleBlock = async (userId) => {
    const result = await toggleUserBlockStatus(userId);

    if (result?.success) {
      router.refresh();
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, isBlocked: result.isBlocked } : u,
        ),
      );
      router.refresh();
      setTimeout(() => {
        toast.success(
          `User ${result.isBlocked ? "blocked" : "unblocked"} successfully!`,
        );
      }, 1000);
    } else {
      toast.error("Failed to update status.");
    }
  };

  // Change Role handler (Toggle Admin/User)
  const handleToggleRole = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u._id === userId ?
          { ...u, role: u.role === "admin" ? "user" : "admin" }
        : u,
      ),
    );
  };

  // Client-side filtering logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter ? user.role === roleFilter : true;

    const matchesMembership =
      membershipFilter ?
        membershipFilter === "premium" ?
          user.planId === "premium" || user.planId === "lifetime"
        : user.planId === "free"
      : true;

    return matchesSearch && matchesRole && matchesMembership;
  });

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.1, duration: 0.4 },
    },
  };

  const glassClass =
    "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-zinc-800/50 shadow-xl rounded-3xl";

  return (
    <motion.div
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 min-h-screen transition-colors duration-300 text-zinc-900 dark:text-zinc-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-row items-center justify-between gap-4 border-b border-gray-200/50 dark:border-zinc-800/50 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Manage Users
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            View and manage all registered users on the FlavorFlow platform.
          </p>
        </div>

        {/* Circular totalUsers Counter Badge */}
        <div className="relative group shrink-0">
          {/* Glow Effect */}
          <div className="absolute inset-0 dark:bg-orange-500/20 rounded-full blur-md opacity-75 group-hover:scale-105 transition-all duration-500" />

          <div className="relative h-14 md:h-16 px-5 rounded-full dark:bg-zinc-900/90 border border-orange-500/40 flex items-center gap-3 text-white shadow-2xl backdrop-blur-sm">
            {/* Icon Container */}
            <div className="p-2 rounded-full bg-orange-500/10 border border-orange-500/20">
              <UsersIcon className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>

            {/* Text Info */}
            <div className="flex flex-col justify-center leading-none">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                Total Users
              </span>
              <span className="text-lg font-black font-mono mt-0.5 tracking-tight text-zinc-500 dark:text-zinc-400">
                {loading ?
                  <span className="animate-pulse">...</span>
                : filteredUsers.length.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PREMIUM TOOLBAR ================= */}
      <div
        className={`${glassClass} p-4 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-md relative z-30`}
      >
        <div className="flex flex-col sm:flex-row w-full gap-3 items-center flex-1">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs flex items-center">
            <span className="absolute left-3.5 text-zinc-400 z-10">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2  text-sm bg-zinc-100 dark:bg-zinc-800 border-none outline-hidden focus:ring-2 focus:ring-orange-500/50 rounded-full h-10 transition-all  dark:text-zinc-150"
            />
          </div>

          {/* Role Filter Select */}
          <div className="relative w-full sm:max-w-40 z-30">
            <button
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setMembershipDropdownOpen(false);
              }}
              className="w-full bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-all rounded-full h-10 px-4 flex items-center justify-between text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 cursor-pointer"
            >
              <span>
                {roleFilter ?
                  roleFilter === "admin" ?
                    "Admin"
                  : "User"
                : "Select Role"}
              </span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${roleDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {roleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-1 z-50 overflow-hidden"
                >
                  <ul className="space-y-0.5">
                    {["admin", "user"].map((opt) => (
                      <li key={opt}>
                        <button
                          onClick={() => {
                            setRoleFilter(opt);
                            setRoleDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-semibold capitalize hover:bg-orange-500/10 hover:text-orange-500 transition-all text-zinc-700 dark:text-zinc-300"
                        >
                          {opt}
                        </button>
                      </li>
                    ))}
                    {roleFilter && (
                      <li className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setRoleFilter("");
                            setRoleDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          Clear Role
                        </button>
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Membership Filter Select */}
          <div className="relative w-full sm:max-w-44 z-30">
            <button
              onClick={() => {
                setMembershipDropdownOpen(!membershipDropdownOpen);
                setRoleDropdownOpen(false);
              }}
              className="w-full bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-all rounded-full h-10 px-4 flex items-center justify-between text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 cursor-pointer"
            >
              <span>
                {membershipFilter ?
                  membershipFilter === "premium" ?
                    "👑 Premium"
                  : "Free"
                : "Membership"}
              </span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${membershipDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {membershipDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-1 z-50 overflow-hidden"
                >
                  <ul className="space-y-0.5">
                    {["premium", "free"].map((opt) => (
                      <li key={opt}>
                        <button
                          onClick={() => {
                            setMembershipFilter(opt);
                            setMembershipDropdownOpen(false);
                          }}
                          className="w-full text-left rounded-xl p-2.5 cursor-pointer text-xs font-semibold capitalize hover:bg-orange-500/10 hover:text-orange-500 transition-all text-zinc-700 dark:text-zinc-300"
                        >
                          {opt === "premium" ? "👑 Premium" : "Free"}
                        </button>
                      </li>
                    ))}
                    {membershipFilter && (
                      <li className="border-t border-zinc-100 dark:border-zinc-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setMembershipFilter("");
                            setMembershipDropdownOpen(false);
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

        <Button
          isIconOnly
          className="bg-orange-50 dark:bg-orange-950/20 text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-950/40 w-10 h-10 flex items-center justify-center transition-colors z-30"
          onClick={fetchUsers}
        >
          <RefreshIcon className={loading ? "animate-spin" : ""} />
        </Button>
      </div>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <div className="overflow-visible relative z-10">
        {loading ?
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-150 dark:border-zinc-800">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </Card>
        : filteredUsers.length === 0 ?
          /* ================= EMPTY STATE CONTAINER ================= */
          <Card className="p-12 flex flex-col items-center justify-center text-center max-w-xl mx-auto border-dashed border-2 border-orange-300/40 relative z-10">
            <div className="p-5 rounded-full bg-linear-to-tr from-orange-100 to-red-100 dark:from-orange-950/20 dark:to-red-950/20 text-orange-500 mb-5">
              <AlertTriangleIcon className="text-4xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100">
              No Registered Users Found
            </h2>
            <p className="text-gray-400 dark:text-zinc-500 text-sm mt-2 max-w-sm">
              Try adjusting your query or filter configurations to search for
              other members.
            </p>
          </Card>
        : /* ================= TABLE LIST VIEW ================= */
          <motion.div
            key="table-data"
            variants={tableVariants}
            className={`${glassClass} overflow-x-auto relative shadow-2xl z-10`}
          >
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-zinc-800/40 border-b border-gray-200/50 dark:border-zinc-800/80">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                    User Info
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                    Email
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 text-center">
                    Role
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 text-center">
                    Membership
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 text-center">
                    Status
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                    Joined Date
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`border-b border-gray-100/60 dark:border-zinc-800/40 transition-colors duration-200 hover:bg-orange-500/5 ${
                      idx % 2 === 0 ?
                        "bg-transparent"
                      : "bg-gray-50/30 dark:bg-zinc-800/10"
                    }`}
                  >
                    {/* User Info with Avatar */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {user.image ?
                            <Image
                              src={user?.image}
                              alt={user?.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full border border-orange-500/20 object-cover shadow-sm"
                            />
                          : <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                              <FiUser className="w-5 h-5" />
                            </div>
                          }
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-zinc-200 tracking-wide">
                          {user?.name}
                        </span>
                      </div>
                    </td>

                    {/* Email address */}
                    <td className="p-4 text-sm text-gray-600 dark:text-zinc-400">
                      {user?.email}
                    </td>

                    {/* Role Status */}
                    <td className="p-4 text-sm text-center">
                      <Chip
                        className={`capitalize font-bold px-3 py-1 rounded-full border ${
                          user.role === "admin" ?
                            "bg-purple-100/60 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border-purple-200"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200/50"
                        }`}
                      >
                        {user?.role}
                      </Chip>
                    </td>

                    {/* Membership Tier Status */}
                    <td className="p-4 text-sm text-center">
                      <div className="flex items-center justify-center">
                        {(
                          user.planId === "premium" ||
                          user.planId === "lifetime"
                        ) ?
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-xs">
                            <CrownIcon className="text-amber-500 animate-pulse shrink-0 w-3.5 h-3.5" />
                            <span>
                              {user?.planId === "lifetime" ?
                                "Lifetime"
                              : "Premium"}
                            </span>
                          </div>
                        : <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            Free
                          </span>
                        }
                      </div>
                    </td>

                    {/* Active/Blocked Status Indicator */}
                    <td className="p-4 text-sm text-center">
                      <Chip
                        className={`font-bold px-3 py-1 rounded-full border ${
                          user?.isBlocked ?
                            "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200"
                          : "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1 ${user?.isBlocked ? "bg-red-500" : "bg-emerald-500"}`}
                        />
                        <span>{user?.isBlocked ? "Blocked" : "Active"}</span>
                      </Chip>
                    </td>

                    {/* Joined Date */}
                    <td className="p-4 text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {user?.createdAt ?
                        new Date(user?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                    </td>

                    {/* Action buttons (View, Edit & Block) */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* VIEW USER BUTTON */}
                        <div className="relative group/tooltip">
                          <Button
                            isIconOnly
                            className="text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 w-8 h-8 rounded-full"
                            onClick={() => setSelectedUser(user)}
                          >
                            <EyeIcon />
                          </Button>
                          <div className="absolute right-0 bottom-10 hidden group-hover/tooltip:block bg-zinc-950 text-white text-[10px] py-1 px-2.5 rounded-md whitespace-nowrap pointer-events-none z-50">
                            View Details
                          </div>
                        </div>

                        {/* Divider */}
                        <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

                        {/* Role Edit Action */}
                        <div className="relative group/tooltip">
                          <Button
                            isIconOnly
                            className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 w-8 h-8 rounded-full"
                            onClick={() => handleToggleRole(user._id)}
                          >
                            <EditIcon />
                          </Button>
                          <div className="absolute right-0 bottom-10 hidden group-hover/tooltip:block bg-zinc-950 text-white text-[10px] py-1 px-2.5 rounded-md whitespace-nowrap pointer-events-none z-50">
                            Toggle Role
                          </div>
                        </div>

                        {/* Divider */}
                        <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

                        {/* Block/Unblock Action */}
                        <div className="relative group/tooltip">
                          <Button
                            isIconOnly
                            className={`w-8 h-8 rounded-full ${
                              user?.isBlocked ?
                                "text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30"
                              : "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                            }`}
                            onClick={() => handleToggleBlock(user?._id)}
                          >
                            {user?.isBlocked ?
                              <ShieldIcon />
                            : <ShieldOffIcon />}
                          </Button>
                          <div className="absolute right-0 bottom-10 hidden group-hover/tooltip:block bg-zinc-950 text-white text-[10px] py-1 px-2.5 rounded-md whitespace-nowrap pointer-events-none z-50">
                            {user.isBlocked ? "Unblock User" : "Block User"}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        }
      </div>

      {/* ================= USER DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {selectedUser?.image ?
                  <Image
                    src={selectedUser?.image}
                    alt={selectedUser?.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full border-2 border-orange-500 object-cover shadow-lg"
                  />
                : <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 border-2 border-orange-500 shadow-lg">
                    <FiUser className="w-10 h-10" />
                  </div>
                }

                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {selectedUser?.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {selectedUser?.email}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-200">
                    Role: {selectedUser?.role}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      (
                        selectedUser?.planId === "premium" ||
                        selectedUser?.planId === "lifetime"
                      ) ?
                        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200/50"
                    }`}
                  >
                    Plan: {selectedUser?.planId}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">User ID:</span>
                  <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                    {selectedUser?._id}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Recipe Upload Limit:</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {selectedUser?.recipeLimit} Recipes
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Plan Expiration:</span>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {selectedUser?.expireAt ?
                      new Date(selectedUser?.expireAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "Never (Free Plan)"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Joined Platform:</span>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {selectedUser?.createdAt ?
                      new Date(selectedUser?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "N/A"}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setSelectedUser(null)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-10 px-6 rounded-full"
                >
                  Close View
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
