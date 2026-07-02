"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Chip,
  Separator,
} from "@heroui/react";
import {
  FaUsers,
  FaBookOpen,
  FaCrown,
  FaFlag,
  FaArrowRight,
  FaExchangeAlt,
  FaHeart,
  FaStar,
  FaUserPlus,
  FaInbox,
} from "react-icons/fa";

// Framer Motion Variants for Staggered Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function AdminDashboardOverview({ data }) {
  // Safely fallback if data arrays are missing
  const reports = data?.recentReports || [];
  const router = useRouter();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10 p-4 max-w-[1600px] mx-auto relative overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-60 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10" />

      {/* Page Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-2">
          Welcome back, Admin 👋
        </h1>
        <p className="text-default-500 max-w-2xl text-sm md:text-base">
          Manage users, recipes, reports, and monitor the overall FlavorFlow
          platform.
        </p>
      </motion.div>

      {/* Dashboard Statistics Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Stat 1: Total Users */}
        <StatCard
          title="Total Users"
          value={data?.totalUsers || 0}
          description="Registered on platform"
          icon={<FaUsers className="text-orange-500" size={24} />}
          btnText="View Users"
          onClick={() => router.push("/dashboard/admin/users")}
        />

        {/* Stat 2: Total Recipes */}
        <StatCard
          title="Total Recipes"
          value={data?.totalRecipes || 0}
          description="Published content"
          icon={<FaBookOpen className="text-rose-500" size={22} />}
          btnText="Manage Recipes"
          onClick={() => router.push("/dashboard/admin/recipes")}
        />

        {/* Stat 3: Premium Members */}
        <StatCard
          title="Premium Members"
          value={data?.totalPremiumMembers || 0}
          description="Active tier subscribers"
          icon={<FaCrown className="text-amber-500" size={22} />}
          btnText="View Premium Users"
          // onClick={() =>
          //   router.push("/dashboard/admin/manage-users?filter=premium")
          // }
        />

        {/* Stat 4: Total Reports */}
        <StatCard
          title="Total Reports"
          value={data?.totalReports || 0}
          description="Pending item reviews"
          icon={<FaFlag className="text-red-500" size={20} />}
          btnText="Review Reports"
          onClick={() => router.push("/dashboard/admin/reports")}
        />
      </motion.div>

      {/* Quick Actions Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold text-foreground px-1">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Manage Users"
            desc="Control user access and roles"
            icon={<FaUsers size={20} />}
            onClick={() => router.push("/dashboard/admin/users")}
          />
          <QuickActionCard
            title="Manage Recipes"
            desc="Review and moderate food recipes"
            icon={<FaBookOpen size={18} />}
            onClick={() => router.push("/dashboard/admin/recipes")}
          />
          <QuickActionCard
            title="Review Reports"
            desc="Investigate user flagged issues"
            icon={<FaFlag size={18} />}
            onClick={() => router.push("/dashboard/admin/reports")}
          />
          <QuickActionCard
            title="View Transactions"
            desc="Track billing and operations logs"
            icon={<FaExchangeAlt size={18} />}
            onClick={() => router.push("/dashboard/admin/transactions")}
          />
        </div>
      </motion.div>

      {/* Recent Reports & Platform Insights Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Recent Reports Table Container */}
        <motion.div variants={itemVariants} className="lg:col-span-2 h-full">
          <Card className="bg-background/40 backdrop-blur-xl border border-default-200/60 rounded-3xl shadow-xl h-full flex flex-col justify-between">
            <CardHeader className="flex items-center justify-between px-6 pt-6">
              <h3 className="text-lg font-bold text-foreground">
                Recent Reports
              </h3>
              {reports.length > 0 && (
                <Button
                  size="sm"
                  variant="light"
                  className="text-orange-500 font-semibold"
                  onClick={() => router.push("/dashboard/admin/reports")}
                >
                  View All Reports
                </Button>
              )}
            </CardHeader>
            <Separator className="opacity-60" />

            <CardContent className="p-0 overflow-x-auto">
              {reports.length === 0 ?
                <EmptyReportsState />
              : <table className="w-full text-left border-collapse min-w-125">
                  <thead>
                    <tr className="border-b border-default-100 bg-default-50/50">
                      <th className="p-4 text-xs font-semibold text-default-500 uppercase">
                        Recipe Name
                      </th>
                      <th className="p-4 text-xs font-semibold text-default-500 uppercase">
                        Reporter
                      </th>
                      <th className="p-4 text-xs font-semibold text-default-500 uppercase">
                        Reason
                      </th>
                      <th className="p-4 text-xs font-semibold text-default-500 uppercase">
                        Status
                      </th>
                      <th className="p-4 text-xs font-semibold text-default-500 uppercase">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr
                        key={report.id || report._id}
                        className="border-b border-default-100/60 hover:bg-default-50/30 transition-colors"
                      >
                        <td className="p-4 text-sm font-medium text-foreground">
                          {report.recipeName}
                        </td>
                        <td className="p-4 text-sm text-default-600">
                          {report.reporterEmail}
                        </td>
                        <td className="p-4 text-sm text-default-500 truncate max-w-37.5">
                          {report.reason}
                        </td>
                        <td className="p-4">
                          <Chip
                            size="sm"
                            variant="flat"
                            color={
                              report.status === "Pending" ? "warning"
                              : report.status === "Reviewed" ?
                                "success"
                              : "default"
                            }
                            className="font-medium"
                          >
                            {report.status}
                          </Chip>
                        </td>
                        <td className="p-4 text-sm text-default-400">
                          {new Date(
                            report.date || report.createdAt,
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
            </CardContent>
          </Card>
        </motion.div>

        {/* Platform Insights Panel */}
        <motion.div variants={itemVariants} className="h-full">
          <Card className="bg-background/40 backdrop-blur-xl border border-default-200/60 rounded-3xl shadow-xl h-full">
            <CardHeader className="px-6 pt-6">
              <h3 className="text-lg font-bold text-foreground">
                Platform Insights
              </h3>
            </CardHeader>
            <Separator className="opacity-60" />
            <CardContent className="p-6 space-y-5">
              <InsightItem
                icon={<FaHeart className="text-rose-500" />}
                label="Most Liked Recipe"
                value={data?.mostLikedRecipe || "N/A"}
              />
              <InsightItem
                icon={<FaStar className="text-amber-500" />}
                label="Featured Recipes Count"
                value={data?.featuredRecipes || 0}
              />
              <InsightItem
                icon={<FaUserPlus className="text-blue-500" />}
                label="Latest Registered User"
                value={data?.latestUser || "N/A"}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   REUSABLE SUB-COMPONENTS (Clean & Controlled Architecture)
   ========================================================================== */

// 1. Statistics Card Component
function StatCard({ title, value, description, icon, btnText, onClick }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="bg-background/40 backdrop-blur-xl border border-default-200/60 rounded-3xl shadow-xl p-5 flex flex-col justify-between h-full group transition-all duration-300">
        <CardContent className="p-0 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                {title}
              </p>
              <h4 className="text-3xl font-extrabold text-foreground tracking-tight">
                {value}
              </h4>
            </div>
            <div className="p-3 bg-default-100 dark:bg-default-50/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
          <p className="text-xs text-default-500 font-medium">{description}</p>
        </CardContent>
        <CardFooter className="p-0 pt-4">
          <Button
            onClick={onClick}
            className="w-full text-xs font-bold bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/10 hover:opacity-95 rounded-2xl"
          >
            <FaArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
            {btnText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// 2. Quick Action Card Component
function QuickActionCard({ title, desc, icon, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="bg-background/30 backdrop-blur-lg border border-default-200/50 rounded-2xl p-4 hover:border-orange-500/40 transition-all shadow-md group text-left w-full"
    >
      <CardContent className="p-0 flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-linear-to-br from-orange-500/10 to-rose-500/10 text-orange-500 rounded-xl group-hover:scale-105 transition-transform">
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">{title}</h4>
            <p className="text-xs text-default-400 line-clamp-1">{desc}</p>
          </div>
        </div>
        <FaArrowRight
          size={12}
          className="text-default-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all shrink-0"
        />
      </CardContent>
    </Card>
  );
}

// 3. Platform Insight Item Layout
function InsightItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-default-50/40 border border-default-100/40 rounded-2xl">
      <div className="p-3 bg-background dark:bg-default-50/10 rounded-xl shadow-xs">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-default-400 uppercase tracking-wider">
          {label}
        </p>
        <h4 className="text-sm font-bold text-foreground truncate mt-0.5">
          {value}
        </h4>
      </div>
    </div>
  );
}

// 4. Empty State for Reports
function EmptyReportsState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-3 min-h-62.5">
      <div className="p-4 bg-green-500/10 text-green-500 rounded-full">
        <FaInbox size={32} />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-foreground">
          No Reports Available
        </h4>
        <p className="text-xs text-default-400 max-w-xs">
          Everything looks great! No reports require your attention right now.
        </p>
      </div>
    </div>
  );
}
