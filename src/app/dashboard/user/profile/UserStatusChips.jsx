import React from "react";
import { Chip } from "@heroui/react";

// Lightweight inline SVGs ensuring zero external icon dependency and instant compilation

// Minimalist User Icon for Free Tier
const UserIcon = () => (
  <svg
    className="w-3.5 h-3.5 mr-1 text-zinc-500 dark:text-zinc-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

// Radiant Crown Icon for Premium Tier
const CrownIcon = () => (
  <svg
    className="w-3.5 h-3.5 mr-1 text-white animate-pulse"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4M7.5 8.25h9m-9 3h9m-9 3h9m-11.25-6a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H3.75z"
    />
  </svg>
);

// Sparking Diamond Gem Icon for Lifetime Tier
const GemIcon = () => (
  <svg
    className="w-3.5 h-3.5 mr-1 text-amber-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4M7.5 8.25h9m-9 3h9m-9 3h9m-11.25-6a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H3.75z"
    />
  </svg>
);

export function FreeBadge({ size = "md" }) {
  return (
    <Chip
      color="default"
      size={size}
      variant="soft"
      className="border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900/60 font-semibold tracking-wide"
    >
      <div className="flex items-center">
        <UserIcon />
        <Chip.Label className="text-zinc-600 dark:text-zinc-300 text-xs font-bold uppercase tracking-wider">
          Free Member
        </Chip.Label>
      </div>
    </Chip>
  );
}

export function PremiumBadge({ size = "md" }) {
  return (
    <Chip
      color="danger"
      size={size}
      variant="primary"
      className="bg-linear-to-r from-orange-500 via-rose-500 to-red-600 text-white font-extrabold tracking-wide border-none shadow-md shadow-orange-500/20"
    >
      <div className="flex items-center">
        <CrownIcon />
        <Chip.Label className="text-white text-xs font-black uppercase tracking-widest">
          Premium Chef
        </Chip.Label>
      </div>
    </Chip>
  );
}

export function LifetimeBadge({ size = "md" }) {
  return (
    <Chip
      color="warning"
      size={size}
      variant="soft"
      className="bg-zinc-950 text-amber-400 border border-amber-500/30 font-extrabold tracking-wide shadow-sm shadow-amber-500/5"
    >
      <div className="flex items-center">
        <GemIcon />
        <Chip.Label className="text-amber-400 text-xs font-black uppercase tracking-widest">
          Lifetime Member
        </Chip.Label>
      </div>
    </Chip>
  );
}

/**
 * Master Chip Component that dynamically renders the correct membership badge
 * based on the user's planId.
 *
 * @param {string} planId - The active status code ("free", "premium", "lifetime")
 * @param {string} size - Size of the chip ("sm", "md", "lg")
 */
export default function UserStatusBadge({ planId = "free", size = "md" }) {
  switch (planId?.toLowerCase()) {
    case "premium":
      return <PremiumBadge size={size} />;
    case "lifetime":
      return <LifetimeBadge size={size} />;
    case "free":
    default:
      return <FreeBadge size={size} />;
  }
}
