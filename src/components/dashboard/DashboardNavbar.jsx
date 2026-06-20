"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button, Dropdown, Avatar, Badge, Label } from "@heroui/react";
import {
  Sun,
  Moon,
  User,
  LayoutDashboard,
  LogOut,
  Bell,
  ChevronDown,

 
} from "lucide-react";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { signOut } from "@/app/lib/auth-client";

export default function DashboardNavbar({ role = "user" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

 
    const getPageTitle = () => {
      
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 2) return "Overview";
    const rawTitle = segments[segments.length - 1];
    return (
      rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1).replace(/-/g, " ")
    );
  };
    const handleLogOutBtn = async () => {
     await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.replace("/login");
            },
          },
        });
}
    
  return (
    <header className="sticky top-0 h-20 shrink-0 border-b border-neutral-200/50 dark:border-neutral-800/40 bg-white/40 dark:bg-[#0b0f19]/30 backdrop-blur-md flex items-center justify-between px-6 pl-16 lg:pl-10 sm:px-10 z-20 w-full">
     
      <div className="flex flex-col justify-center">
        <nav className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-0.5">
          <FiHome className="size-3" />
          <FiChevronRight size={10} />
          <span>Dashboard</span>
          <FiChevronRight size={10} />
          <span className="text-orange-500 dark:text-orange-400">{role}</span>
        </nav>
        <h2 className="text-lg font-black tracking-tight text-neutral-800 dark:text-neutral-100">
          {getPageTitle()}
        </h2>
      </div>

      
      <div className="flex items-center gap-3.5">
       
        <Button
          isIconOnly
          variant="light"
          radius="full"
          size="sm"
          className="text-foreground/70 hover:text-orange-500 transition-colors"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {mounted && theme === "light" ?
            <Sun className="h-4 w-4 text-amber-500" />
          : <Moon className="h-4 w-4 text-indigo-400" />}
        </Button>

    
        <Badge
          content=""
          color="danger"
          shape="circle"
          placement="top-right"
          size="sm"
        >
          <Button
            isIconOnly
            variant="light"
            radius="full"
            size="sm"
            className="text-foreground/70 hover:text-orange-500"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </Badge>

        <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800" />

         {/* HeroUI v3  */}
        <Dropdown placement="bottom-end" backdrop="blur">
          <Dropdown.Trigger className="rounded-full outline-none">
            <div className="flex items-center gap-1.5 group cursor-pointer">
              <Avatar
                size="sm"
                className="w-8 h-8 text-xs ring-2 ring-orange-500/10"
                src="https://ik.imagekit.io/i455l48ls/profile-photoaidcom-cropped%20(1).png?updatedAt=1780659702199"
                fallback="M"
              />
              <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-neutral-600 transition-colors hidden sm:block" />
            </div>
          </Dropdown.Trigger>

          <Dropdown.Popover className="border border-default-200/60 bg-background/90 backdrop-blur-md shadow-xl min-w-50 rounded-xl">
            <div className="px-4 pt-4 pb-2 border-b border-default-200/40">
              <p className="font-normal text-[10px] text-neutral-400 uppercase tracking-wider">
                Signed in as
              </p>
              <p className="font-bold text-xs text-orange-500 truncate">
                djriad157764@gmail.com
              </p>
            </div>

            <Dropdown.Menu aria-label="User navigation choices">
              <Dropdown.Item
                id="home"
                textValue="Back to Website"
                as={Link}
                href="/"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <Label className="cursor-pointer font-normal text-xs">
                    Back to Website
                  </Label>
                  <LayoutDashboard className="w-3.5 h-3.5 text-default-500" />
                </div>
              </Dropdown.Item>

              <Dropdown.Item
                id="profile"
                textValue="My Profile"
                as={Link}
                href="/dashboard/user/profile"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <Label className="cursor-pointer font-normal text-xs">
                    My Profile
                  </Label>
                  <User className="w-3.5 h-3.5 text-default-500" />
                </div>
              </Dropdown.Item>

              <Dropdown.Item id="logout" textValue="Log Out" variant="danger">
                <div onProgress={handleLogOutBtn} className="flex w-full items-center justify-between gap-2">
                  <Label className="text-danger cursor-pointer font-normal text-xs">
                    Log Out
                  </Label>
                  <LogOut className="w-3.5 h-3.5 text-danger" />
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </header>
  );
}
