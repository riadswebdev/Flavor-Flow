import {
  FiGrid,
  FiPlusCircle,
  FiBookOpen,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiUsers,
  FiAlertTriangle,
  FiDollarSign,
} from "react-icons/fi";

export const dashboardNavItems = {
  user: [
    { label: "Overview", href: "/dashboard/user", icon: FiGrid },
    {
      label: "Add Recipe",
      href: "/dashboard/user/add-recipe",
      icon: FiPlusCircle,
    },
    {
      label: "My Recipes",
      href: "/dashboard/user/my-recipes",
      icon: FiBookOpen,
    },
    {
      label: "My Purchased Recipes",
      href: "/dashboard/user/purchased",
      icon: FiShoppingBag,
    },
    { label: "Favorites", href: "/dashboard/user/favorites", icon: FiHeart },
    { label: "Profile", href: "/dashboard/user/profile", icon: FiUser },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: FiGrid },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: FiUsers },
    {
      label: "Manage Recipes",
      href: "/dashboard/admin/recipes",
      icon: FiBookOpen,
    },
    {
      label: "Reports",
      href: "/dashboard/admin/reports",
      icon: FiAlertTriangle,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: FiDollarSign,
    },
  ],
};
