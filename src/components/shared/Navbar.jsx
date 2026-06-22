"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button, Dropdown, Avatar, Badge, Label } from "@heroui/react";
import { signOut, useSession } from "@/app/lib/auth-client";
import {
  Sun,
  Moon,
  User,
  LayoutDashboard,
  LogOut,
  Bell,
  ChevronDown,
  UtensilsCrossed,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending, error } = useSession();

  // Prevent hydration mismatch by waiting until component is mounted
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const user = session?.user;

  const isActive = (path) => pathname === path;

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Browse Recipes", path: "/recipes" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLogOutBtn = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
        },
      },
    });
  };

  return (
    <div className="w-full sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-default-200/50 bg-background/60 shadow-lg shadow-default-100/10 backdrop-blur-md transition-all duration-300">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left Side: Logo Area */}
          <div className="flex justify-start items-center flex-1 md:flex-initial">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105">
                <UtensilsCrossed size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Flavor<span className="text-orange-500">Flow</span>
              </span>
            </Link>
          </div>

          {/* Center Side: Desktop Routes */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <div key={item.path} className="relative py-2">
                  <Link
                    href={item.path}
                    className={`relative text-sm font-medium transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-md px-1 ${
                      active ?
                        "text-orange-500 font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-orange-500 to-rose-500 rounded-full" />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Side: Theme, Actions & Profile */}
          <div className="flex justify-end items-center gap-3 flex-1 md:flex-initial">
            {/* Theme Toggle */}
            <Button
              isIconOnly
              variant="light"
              radius="full"
              size="sm"
              aria-label="Toggle theme"
              className="text-foreground/70 hover:text-orange-500 hover:bg-default-100 transition-colors"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {mounted && theme === "light" ?
                <Sun className="h-5 w-5 transition-transform duration-300 scale-100 text-amber-500" />
              : <Moon className="h-5 w-5 transition-transform duration-300 scale-100 text-indigo-500" />
              }
            </Button>

            {/* Conditional Layout: Authenticated vs Unauthenticated */}
            {user ?
              <>
               

              
                {/* User Dropdown Profile  */}
                <Dropdown placement="bottom-end" backdrop="blur">
                  <Dropdown.Trigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
                    {/* Changed from <button> to <div> to prevent nested button elements */}
                    <div className="flex items-center gap-1.5 group rounded-full p-0.5 transition-opacity hover:opacity-90 cursor-pointer">
                      <Avatar
                        color="warning"
                        radius="full"
                        size="sm"
                        className="w-8 h-8 text-xs ring-offset-background"
                      >
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback delayMs={600}>
                          {user?.name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                      <ChevronDown className="w-3.5 h-3.5 text-foreground/50 group-hover:text-foreground transition-colors hidden sm:block" />
                    </div>
                  </Dropdown.Trigger>

                  <Dropdown.Popover className="border border-default-200/60 bg-background/90 backdrop-blur-md shadow-xl min-w-50 rounded-xl">
                    <div className="px-4 pt-4 pb-2 border-b border-default-200/40">
                      <p className="font-normal text-xs text-foreground/50">
                        Signed in as
                      </p>
                      <p className="font-semibold text-sm text-orange-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Dropdown.Menu aria-label="User navigation choices">
                      <Dropdown.Item
                        id="profile"
                        textValue="Profile"
                        as={Link}
                        href="/profile"
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <Label className="cursor-pointer font-normal">
                            Profile
                          </Label>
                          <User className="w-4 h-4 text-default-500" />
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        id="dashboard"
                        textValue="Dashboard"
                        as={Link}
                        href="/dashboard/user"
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <Label className="cursor-pointer font-normal">
                            Dashboard
                          </Label>
                          <LayoutDashboard className="w-4 h-4 text-default-500" />
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        id="logout"
                        textValue="Log Out"
                        variant="danger"
                        onClick={handleLogOutBtn}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <Label className="text-danger cursor-pointer font-normal">
                            Log Out
                          </Label>
                          <LogOut className="w-4 h-4 text-danger" />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </>
            : <>
                <div className="hidden sm:flex">
                  <Link href="/login" className="mr-2">
                    <Button
                      variant="light"
                      radius="xl"
                      size="sm"
                      className="font-medium text-foreground/80 hover:text-foreground"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
                <div className="hidden sm:flex">
                  <Link href="/register">
                    <Button
                      color="warning"
                      radius="xl"
                      size="sm"
                      className="font-medium bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20 hover:opacity-95"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              </>
            }

            {/* Mobile Hamburger Menu Toggle Action */}
            <Button
              isIconOnly
              variant="light"
              radius="full"
              size="sm"
              className="md:hidden text-foreground/70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ?
                <X className="h-5 w-5" />
              : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Panel Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/80 backdrop-blur-lg pt-2 pb-6 px-4 flex flex-col gap-3 border-t border-default-200/40 rounded-b-2xl">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <div key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex w-full py-3 px-4 rounded-xl text-base font-medium transition-all ${
                      active ?
                        "bg-orange-500/10 text-orange-500 font-semibold"
                      : "text-foreground/70 hover:bg-default-100 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}

            <div className="my-2 border-t border-default-200/60 mx-2" />

            {user ?
              <div className="flex flex-col gap-1">
                <div>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-base font-medium text-foreground/70 hover:bg-default-100"
                  >
                    <User className="w-5 h-5 text-default-500" /> My Profile
                  </Link>
                </div>
                <div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-base font-medium text-foreground/70 hover:bg-default-100"
                  >
                    <LayoutDashboard className="w-5 h-5 text-default-500" />{" "}
                    Dashboard
                  </Link>
                </div>
                <div>
                  <button
                    onClick={handleLogOutBtn}
                    className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-base font-medium text-danger hover:bg-danger/10 text-left"
                  >
                    <LogOut className="w-5 h-5" /> Log Out
                  </button>
                </div>
              </div>
            : <div className="flex flex-col gap-2 pt-2">
                <Link href="/login">
                  <Button
                    variant="bordered"
                    radius="xl"
                    fullWidth
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    radius="xl"
                    fullWidth
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-lg"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            }
          </div>
        )}
      </nav>
    </div>
  );
}
