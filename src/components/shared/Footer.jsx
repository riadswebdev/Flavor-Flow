import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import { UtensilsCrossed, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-default-100 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 pb-8">
          {/* Column 1: Brand & Social Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-linear-to-r from-orange-500 to-rose-500 text-white">
                <UtensilsCrossed size={20} />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                FlavorFlow
              </span>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Discover, create, and share amazing culinary experiences. Join our
              global community of food lovers today.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="#"
                className="p-2 rounded-lg border border-default-200 text-foreground/60 hover:text-orange-500 hover:border-orange-500/50 transition-colors"
              >
                <FaFacebookF size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg border border-default-200 text-foreground/60 hover:text-rose-500 hover:border-rose-500/50 transition-colors"
              >
                <FaTwitter size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg border border-default-200 text-foreground/60 hover:text-orange-500 hover:border-orange-500/50 transition-colors"
              >
                <FaInstagram size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg border border-default-200 text-foreground/60 hover:text-foreground hover:border-foreground/50 transition-colors"
              >
                <BsGithub size={18} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-foreground/60 hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes"
                  className="text-sm text-foreground/60 hover:text-orange-500 transition-colors"
                >
                  Browse Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-foreground/60 hover:text-orange-500 transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-foreground/60 hover:text-orange-500 transition-colors"
                >
                  Join Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Dashboard / Premium (Assignment Features) */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-foreground/60 hover:text-rose-500 transition-colors"
                >
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/add-recipe"
                  className="text-sm text-foreground/60 hover:text-rose-500 transition-colors"
                >
                  Add Secret Recipe
                </Link>
              </li>
              <li>
                <Link
                  href="/premium"
                  className="text-sm font-medium bg-rose-500/10 px-2 py-0.5 rounded text-rose-500 inline-block transition-colors"
                >
                  Go Premium ⭐
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-foreground/60">
                <Mail size={16} className="text-orange-500 shrink-0" />
                <span className="truncate">support@flavorflow.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/60">
                <Phone size={16} className="text-rose-500 shrink-0" />
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/60">
                <MapPin size={16} className="text-orange-500 shrink-0" />
                <span className="leading-tight">101 Culinary Blvd, NY</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Divider & Copyright */}
        <div className="mt-8 pt-8 border-t border-default-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50 text-center sm:text-left">
            &copy; 2026 FlavorFlow Platform. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 text-center sm:text-right">
            Designed for Passionate Food Enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}
