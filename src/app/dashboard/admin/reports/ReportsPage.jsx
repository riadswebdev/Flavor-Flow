"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  Table,
  Chip,
  Button,
  Dropdown,
  Input,
  Skeleton,
  Label,
  toast,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiAlertTriangle,
  FiClock,
  FiShield,
  FiCopy,
} from "react-icons/fi";
import { DeleteRecipe } from "./Delete";
import { deleteReport } from "@/lib/actions/report";
import { useRouter } from "next/navigation";

// Color Mappings
const reasonColorMap = {
  Spam: "danger",
  "Offensive Content": "warning",
  "Copyright Issue": "secondary",
};

const statusColorMap = {
  Pending: "warning",
  Removed: "danger",
  Dismissed: "success",
};

// Filter Dropdown Static Items
const reasonOptions = [
  { key: "all", label: "All Reasons" },
  { key: "Spam", label: "Spam" },
  { key: "Offensive Content", label: "Offensive Content" },
  { key: "Copyright Issue", label: "Copyright Issue" },
];

const statusOptions = [
  { key: "all", label: "All Statuses" },
  { key: "Pending", label: "Pending" },
  { key: "Removed", label: "Removed" },
  { key: "Dismissed", label: "Dismissed" },
];

export default function RecipeReportsPage({ initialReports }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [reports, setReports] = useState(initialReports);
  const [isLoading, setIsLoading] = useState(true);

  // Toolbar and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReason, setSelectedReason] = useState(new Set(["all"]));
  const [selectedStatus, setSelectedStatus] = useState(new Set(["all"]));

  // Mount effect to prevent hydration errors with dates
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic Statistics
  const stats = useMemo(() => {
    return {
      total: reports.length,
      pending: reports.filter((r) => r.status === "Pending").length,
      spam: reports.filter((r) => r.reason === "Spam").length,
      copyright: reports.filter((r) => r.reason === "Copyright Issue").length,
    };
  }, [reports]);

  // Client-Side Filter Implementation
  const filteredReports = useMemo(() => {
    const reasonValue = Array.from(selectedReason)[0];
    const statusValue = Array.from(selectedStatus)[0];

    return reports.filter((report) => {
      const matchesSearch = report.recipeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesReason =
        reasonValue === "all" || report.reason === reasonValue;
      const matchesStatus =
        statusValue === "all" || report.status === statusValue;
      return matchesSearch && matchesReason && matchesStatus;
    });
  }, [reports, searchQuery, selectedReason, selectedStatus]);

  // Date Formatter
  const formatReportDate = (dateString) => {
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
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;

    return `${day} ${month} ${year} • ${strTime}`;
  };

  const handleDismissReport = async (id) => {
    const result = await deleteReport(id);

    if (result.success) {
      setReports((prevReports) => prevReports.filter((r) => r._id !== id));
      router.refresh();
      toast.success("Report dismissed successfully");
    }
  };

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

  if (!isMounted) return null;

  return (
    <motion.div
      className="min-h-screen p-4 md:p-8 space-y-8 bg-neutral-50/50 dark:bg-zinc-950/40 text-zinc-800 dark:text-zinc-100 transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Header Layout */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Recipe Reports
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
            Review user-submitted reports and moderate reported recipes.
          </p>
        </div>
        <Chip
          variant="flat"
          className="bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/20 px-3 py-4 rounded-full shadow-sm"
        >
          Total Reports: {stats.total}
        </Chip>
      </motion.div>

      {/* Dynamic Statistics Grid Section */}

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {[
          {
            title: "Total Reports",
            value: stats.total,
            desc: "All logged complaints",
            icon: <FiAlertTriangle className="text-xl" />,
            color: "from-orange-500 to-red-500",
          },
          {
            title: "Pending Reports",
            value: stats.pending,
            desc: "Awaiting administration",
            icon: <FiClock className="text-xl" />,
            color: "from-amber-500 to-orange-500",
          },
          {
            title: "Spam Reports",
            value: stats.spam,
            desc: "Flagged advertisement or junk",
            icon: <FiShield className="text-xl" />,
            color: "from-red-500 to-rose-600",
          },
          {
            title: "Copyright Reports",
            value: stats.copyright,
            desc: "Intellectual property matches",
            icon: <FiCopy className="text-xl" />,
            color: "from-purple-500 to-indigo-600",
          },
        ].map((card, idx) => (
          <Card
            key={idx}
            className="border border-white/20 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-neutral-200/30 dark:shadow-none hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-6 flex flex-row items-center gap-5">
              <div
                className={`p-4 rounded-2xl bg-linear-to-br ${card.color} text-white shadow-lg shrink-0`}
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

      {/* Control Premium Toolbar */}

      <motion.div
        variants={itemVariants}
        className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 p-4 border border-white/20 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-stretch gap-3 flex-1">
          <Input
            type="text"
            className="w-full sm:max-w-xs"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="flat"
            radius="xl"
          />

          {/* Reason Filter Dropdown */}
          <Dropdown>
            <Dropdown.Trigger
              variant="flat"
              className="capitalize w-full sm:w-auto"
            >
              {Array.from(selectedReason)[0] === "all" ?
                "Filter by Reason"
              : Array.from(selectedReason)[0]}
            </Dropdown.Trigger>

            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Filter by Reason"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedReason}
                onSelectionChange={setSelectedReason}
              >
                {reasonOptions.map((item) => (
                  <Dropdown.Item key={item.key}>
                    <Label>{item.label}</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* Status Filter Dropdown */}
          <Dropdown>
            <Dropdown.Trigger
              variant="flat"
              className="capitalize w-full sm:w-auto"
            >
              {Array.from(selectedStatus)[0] === "all" ?
                "Filter by Status"
              : Array.from(selectedStatus)[0]}
            </Dropdown.Trigger>

            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Filter by Status"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={selectedStatus}
                onSelectionChange={setSelectedStatus}
              >
                {statusOptions.map((item) => (
                  <Dropdown.Item key={item.key}>
                    <Label>{item.label}</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>

        {/* Refresh Button */}
        <div className="flex items-center justify-end">
          <Button
            isIconOnly
            variant="flat"
            radius="xl"
            className="bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
            title="Refresh View"
          >
            <FiRefreshCw className="text-base" />
          </Button>
        </div>
      </motion.div>

      {/* Dynamic Data Table */}
      <motion.div variants={itemVariants} className="overflow-hidden">
        {isLoading ?
          <div className="w-full space-y-4 border border-white/20 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-3xl p-6">
            <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-6 w-full rounded-lg" />
              ))}
            </div>
            {[1, 2, 3].map((row) => (
              <div key={row} className="flex gap-4 pt-2">
                {[1, 2, 3, 4, 5, 6].map((col) => (
                  <Skeleton key={col} className="h-12 w-full rounded-xl" />
                ))}
              </div>
            ))}
          </div>
        : <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/20 dark:border-zinc-800/60 rounded-3xl p-3 shadow-xl overflow-x-auto">
            <Table
              aria-label="FlavorFlow Recipe Moderation Content Reports Table"
              className="min-w-full"
            >
              <Table.ScrollContainer>
                <Table.Content>
                  <Table.Header>
                    <Table.Column key="recipeName" isRowHeader>
                      RECIPE NAME
                    </Table.Column>
                    <Table.Column key="reporterEmail">
                      REPORTER EMAIL
                    </Table.Column>
                    <Table.Column key="reason">REPORT REASON</Table.Column>
                    <Table.Column key="status">STATUS</Table.Column>
                    <Table.Column key="date">REPORT DATE</Table.Column>
                    <Table.Column key="actions">ACTIONS</Table.Column>
                  </Table.Header>

                  <Table.Body
                    items={filteredReports}
                    emptyContent={"No reports found."}
                  >
                    {(report) => (
                      <Table.Row key={report._id}>
                        <Table.Cell>{report.recipeName}</Table.Cell>
                        <Table.Cell>{report.reporterEmail}</Table.Cell>
                        <Table.Cell>
                          <Chip
                            variant="flat"
                            color={reasonColorMap[report.reason]}
                          >
                            {report.reason}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell>
                          <Chip
                            variant="dot"
                            color={statusColorMap[report.status]}
                          >
                            {report.status}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell>
                          {formatReportDate(report.createdAt)}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex gap-2">
                            <DeleteRecipe
                              recipeId={report?.recipeId}
                              recipeName={report?.recipeName}
                              reportId={report._id}
                              path="/dashboard/admin/reports"
                            />

                            <Button
                              size="sm"
                              variant="light"
                              onClick={() => handleDismissReport(report._id)}
                            >
                              Dismiss Report
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
              <Table.Footer />
            </Table>
          </div>
        }
      </motion.div>
    </motion.div>
  );
}
