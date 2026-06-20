"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { FiLogOut, FiMenu, FiAlertCircle, FiX } from "react-icons/fi";
import { dashboardNavItems } from "../../../config/dashboardNav";

export default function DashboardSidebar({
  role = "user",
  isPremium = false,
  userSession,
}) {
  const pathname = usePathname();
  const navItems = dashboardNavItems[role] || dashboardNavItems.user;

 
  const renderNavLinks = (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="w-full relative group"
          >
            <button
              type="button"
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all relative z-10 ${
                isActive ?
                  "text-white font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              <item.icon
                className={`size-5 transition-transform group-hover:scale-110 ${
                  isActive ? "text-white" : (
                    "text-neutral-400 dark:text-neutral-500"
                  )
                }`}
              />
              <span>{item.label}</span>

              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-linear-to-r from-orange-500 to-rose-600 rounded-xl -z-10 shadow-md shadow-orange-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex flex-col   h-screen w-80 bg-white/80 dark:bg-[#0d1324]/60 border-r border-neutral-200/60 dark:border-neutral-800/50 backdrop-blur-xl p-5 z-30 justify-between">
        <div className="space-y-7 w-full">
        
          <div className="px-3 py-2 flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-linear-to-tr from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-md">
              <FiAlertCircle className="size-4" />
            </div>
            <span className="text-xl font-black bg-linear-to-r from-neutral-900 via-orange-500 to-rose-600 dark:from-white dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent tracking-tight">
              FlavorFlow
            </span>
          </div>

         
          <div className="px-3 py-3 rounded-2xl bg-neutral-100/50 dark:bg-[#161f38]/40 border border-neutral-200/40 dark:border-neutral-800/40 flex items-center gap-3">
            <Avatar
              size="md"
              src={
                userSession?.image ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              }
              className="rounded-xl ring-2 ring-orange-500/20 w-11 h-11 object-cover"
              fallback={userSession?.name?.charAt(0) || "U"}
            />
            <div className="flex flex-col justify-center min-w-0">
              <h2 className="font-bold text-sm text-neutral-800 dark:text-neutral-200 truncate leading-tight">
                {userSession?.name || "User Name"}
              </h2>
              <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mt-0.5">
                {role === "admin" ?
                  "Platform Admin"
                : isPremium ?
                  "Premium Chef"
                : "Free Member"}
              </p>
            </div>
          </div>

         
          {renderNavLinks}
        </div>

        
        <div className="space-y-4 w-full">
          {role === "user" && !isPremium && (
            <div className="relative rounded-2xl p-4 bg-linear-to-br from-neutral-900 via-neutral-900 to-[#1e1415] dark:from-[#131a30] dark:to-[#221215] border border-neutral-200/10 overflow-hidden shadow-xl">
              <p className="text-[10px] font-bold text-orange-400 flex items-center gap-1 uppercase tracking-wider">
                <FiAlertCircle /> Unlimited Access
              </p>
              <h5 className="text-xs font-extrabold text-white mt-1">
                Go Pro Membership
              </h5>
              <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                Unlock unlimited recipe submissions.
              </p>
              <Button
                size="sm"
                className="w-full mt-3 font-bold text-xs bg-linear-to-r from-orange-500 to-rose-600 text-white rounded-xl border-0"
              >
                Upgrade Now
              </Button>
            </div>
          )}

          <Button
            variant="light"
            startContent={<FiLogOut className="size-4" />}
            className="w-full justify-start rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 uppercase tracking-wider"
          >
            Logout App
          </Button>
        </div>
      </aside>

      {/* ================= MOBILE DRAWER MENU ================= */}
      <div className="lg:hidden">
        <Drawer>
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            className="fixed top-3.5 left-4 rounded-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md text-neutral-700 dark:text-neutral-300 z-50 border border-neutral-200/50 dark:border-neutral-700/50"
          >
            <FiMenu className="size-5" />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content
              placement="left"
              className="w-72 max-w-[80vw] bg-white dark:bg-[#0d1324] text-neutral-900 dark:text-white"
            >
              <Drawer.Dialog className="h-full flex flex-col justify-between p-5 outline-none">
                <div className="space-y-6 w-full">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800/60">
                    <Drawer.Header className="p-0">
                      <Drawer.Heading className="text-md font-black bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                        FlavorFlow Menu
                      </Drawer.Heading>
                    </Drawer.Header>
                    <Drawer.CloseTrigger asChild>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        className="rounded-xl"
                      >
                        <FiX className="size-5" />
                      </Button>
                    </Drawer.CloseTrigger>
                  </div>
                  <div className="w-full">{renderNavLinks}</div>
                </div>

                <div className="w-full pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                  <Button
                    variant="light"
                    startContent={<FiLogOut />}
                    className="w-full justify-start text-rose-500 font-bold rounded-xl text-xs uppercase"
                  >
                    Logout App
                  </Button>
                </div>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
