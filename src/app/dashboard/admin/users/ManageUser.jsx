"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Input,
  Select,
  Tooltip,
  Separator,
  ListBox,
} from "@heroui/react";
import {
  FiEdit2,
  FiShield,
  FiShieldOff,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { AiFillCrown } from "react-icons/ai";

export default function ManageUsersPage({ totalUsers = [] }) {
  // States
  const [users, setUsers] = useState(totalUsers);


  // UI Controls (State preserved for future logic)
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("");

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
      transition: { delay: 0.2, duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 min-h-screen transition-colors duration-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200/50 dark:border-zinc-800/50 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Manage Users
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            View and manage all registered users on the FlavorFlow platform.
          </p>
        </div>

        <Chip
          variant="flat"
          className="bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold border border-orange-200/50 dark:border-orange-900/30 px-3 py-4 text-sm rounded-full"
        >
          <FiUsers size={14} className="mx-1" />
          Total Users:{" "}
          {/* {loading ?
            <Spinner size="sm" color="warning" />
          : totalUsers.length || users.length} */}
        </Chip>
      </div>

      {/* ================= PREMIUM TOOLBAR ================= */}
      <Card className="border-none bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl shadow-gray-100/40 dark:shadow-none rounded-3xl p-2">
        <CardContent className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row w-full gap-3 items-center flex-1">
            {/* ================= SEARCH INPUT ================= */}
            <Input
              className="w-full sm:max-w-xs text-sm"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
              radius="xl"
              variant="flat"
            />

            {/* ================= ROLE FILTER SELECT ================= */}
            <Select
              className="w-full sm:max-w-37.5"
              selectedKeys={roleFilter ? [roleFilter] : []}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0];
                setRoleFilter(value || "");
              }}
            >
              <Select.Trigger className="w-full bg-gray-100 dark:bg-zinc-800/80 hover:bg-gray-200 dark:hover:bg-zinc-700/80 transition-all duration-200 rounded-full h-10 px-4 flex items-center justify-between text-sm text-gray-700 dark:text-zinc-300 border-none outline-none">
                <Select.Value>
                  {roleFilter ?
                    roleFilter === "admin" ?
                      "Admin"
                    : "User"
                  : "Select Role"}
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-gray-100 dark:border-zinc-800/80 rounded-2xl shadow-xl p-1 min-w-[150px]">
                <ListBox aria-label="Role Filter Options">
                  <ListBox.Item
                    key="admin"
                    className="rounded-xl data-[hover=true]:bg-orange-50 dark:data-[hover=true]:bg-orange-950/40 data-[hover=true]:text-orange-600 dark:data-[hover=true]:text-orange-400 p-2.5 cursor-pointer text-sm font-medium transition-colors duration-150"
                  >
                    Admin
                  </ListBox.Item>
                  <ListBox.Item
                    key="user"
                    className="rounded-xl data-[hover=true]:bg-orange-50 dark:data-[hover=true]:bg-orange-950/40 data-[hover=true]:text-orange-600 dark:data-[hover=true]:text-orange-400 p-2.5 cursor-pointer text-sm font-medium transition-colors duration-150"
                  >
                    User
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* ================= MEMBERSHIP FILTER SELECT ================= */}
            <Select
              className="w-full sm:max-w-[170px]"
              selectedKeys={membershipFilter ? [membershipFilter] : []}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0];
                setMembershipFilter(value || "");
              }}
            >
              <Select.Trigger className="w-full bg-gray-100 dark:bg-zinc-800/80 hover:bg-gray-200 dark:hover:bg-zinc-700/80 transition-all duration-200 rounded-full h-10 px-4 flex items-center justify-between text-sm text-gray-700 dark:text-zinc-300 border-none outline-none">
                <Select.Value>
                  {membershipFilter ?
                    membershipFilter === "premium" ?
                      "👑 Premium"
                    : "Free"
                  : "Membership"}
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-gray-100 dark:border-zinc-800/80 rounded-2xl shadow-xl p-1 min-w-[170px]">
                <ListBox aria-label="Membership Filter Options">
                  <ListBox.Item
                    key="premium"
                    className="rounded-xl data-[hover=true]:bg-orange-50 dark:data-[hover=true]:bg-orange-950/40 data-[hover=true]:text-orange-600 dark:data-[hover=true]:text-orange-400 p-2.5 cursor-pointer text-sm font-medium transition-colors duration-150"
                  >
                    👑 Premium
                  </ListBox.Item>
                  <ListBox.Item
                    key="free"
                    className="rounded-xl data-[hover=true]:bg-orange-50 dark:data-[hover=true]:bg-orange-950/40 data-[hover=true]:text-orange-600 dark:data-[hover=true]:text-orange-400 p-2.5 cursor-pointer text-sm font-medium transition-colors duration-150"
                  >
                    Free
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <Button
            isIconOnly
            className="bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded-full min-w-10 h-10 transition-all duration-300"
            onClick={"fetchUsers"}
            // disabled={loading}
            aria-label="Refresh data"
          >
            {/* <FiRefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            /> */}
          </Button>
        </CardContent>
      </Card>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <AnimatePresence mode="wait">
        {
          users.length === 0 ?
            // EMPTY STATE
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center py-20 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-dashed border-gray-300 dark:border-zinc-800"
            >
              <div className="p-4 bg-orange-50 dark:bg-zinc-800 rounded-full text-orange-500 mb-4 animate-bounce">
                <FiUsers size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-200">
                No Users Found
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm mt-1">
                There are currently no registered users platform-wide.
              </p>
            </motion.div>
            // USERS DATA TABLE
          : <motion.div key="table-data" variants={tableVariants}>
              <Table
                aria-label="FlavorFlow Registered Users"
                className="rounded-3xl shadow-xl shadow-gray-100/30 dark:shadow-none overflow-x-auto"
                classNames={{
                  wrapper:
                    "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl p-4 rounded-3xl border border-white/40 dark:border-zinc-800/50",
                  th: "bg-gray-50/80 dark:bg-zinc-800/60 text-gray-600 dark:text-zinc-300 font-bold uppercase text-xs tracking-wider border-b border-gray-100 dark:border-zinc-800 py-4",
                  td: "py-4 border-b border-gray-100/50 dark:border-zinc-800/30 text-sm",
                }}
              >
                <TableHeader>
                  <TableColumn>User Info</TableColumn>
                  <TableColumn>Email</TableColumn>
                  <TableColumn align="center">Role</TableColumn>
                  <TableColumn align="center">Membership</TableColumn>
                  <TableColumn align="center">Status</TableColumn>
                  <TableColumn>Joined Date</TableColumn>
                  <TableColumn align="center">Actions</TableColumn>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-200"
                    >
                      {/* Avatar & Name */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={user.image}
                            name={user.name}
                            size="md"
                            className="border border-orange-500/20 shadow-sm"
                            showFallback
                            fallback={
                              <FiUser className="w-5 h-5 text-gray-400" />
                            }
                          />
                          <span className="font-semibold text-gray-800 dark:text-zinc-200 tracking-wide">
                            {user.name}
                          </span>
                        </div>
                      </TableCell>

                      {/* Email */}
                      <TableCell className="text-gray-600 dark:text-zinc-400">
                        {user.email}
                      </TableCell>

                      {/* Role */}
                      <TableCell>
                        <Chip
                          className="capitalize font-medium text-xs border px-1"
                          size="sm"
                          variant="flat"
                          color={
                            user.role === "admin" ? "secondary" : "default"
                          }
                        >
                          {user.role}
                        </Chip>
                      </TableCell>

                      {/* Membership */}
                      <TableCell>
                        {user.isPremium ?
                          <Chip
                            className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-200/50 dark:border-amber-900/30 pr-2 pl-1"
                            size="sm"
                          >
                            <AiFillCrown
                              size={12}
                              className="ml-1 text-amber-500 fill-amber-500"
                            />
                            Premium
                          </Chip>
                        : <Chip
                            className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 font-medium text-xs"
                            size="sm"
                          >
                            Free
                          </Chip>
                        }
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Chip
                          className="font-semibold text-xs px-1"
                          color={user.isBlocked ? "danger" : "success"}
                          size="sm"
                          variant="dot"
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </Chip>
                      </TableCell>

                      {/* Joined Date */}
                      <TableCell className="text-gray-500 dark:text-zinc-400 text-xs">
                        {user.createdAt ?
                          new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                      </TableCell>

                      {/* Actions Buttons Container */}
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          {/* EDIT BUTTON */}
                          <Tooltip content="Edit User Profile" closeDelay={100}>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-full"
                                onClick={() => {
                                  // TODO: Implement Open Edit Modal or Navigation Logic
                                  console.log("Edit requested for:", user._id);
                                }}
                              >
                                <FiEdit2 size={16} />
                              </Button>
                            </motion.div>
                          </Tooltip>

                          <Separator
                            orientation="vertical"
                            className="h-4 bg-gray-200 dark:bg-zinc-800"
                          />

                          {/* BLOCK / UNBLOCK BUTTON */}
                          <Tooltip
                            content={
                              user.isBlocked ? "Unblock User" : "Block User"
                            }
                            color={user.isBlocked ? "success" : "danger"}
                            closeDelay={100}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className={`rounded-full ${
                                  user.isBlocked ?
                                    "text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30"
                                  : "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                }`}
                                onClick={() => {
                                  // TODO: Implement Block / Unblock API PUT Request functionality later
                                  console.log(
                                    `Toggle Block/Unblock status for: ${user._id}`,
                                  );
                                }}
                              >
                                {user.isBlocked ?
                                  <FiShield size={16} />
                                : <FiShieldOff size={16} />}
                              </Button>
                            </motion.div>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>

        }
      </AnimatePresence>
    </motion.div>
  );
}
