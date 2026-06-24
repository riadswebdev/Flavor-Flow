import { getFavoriteRecipes, getRecipesByUserId } from "@/lib/api/recipes";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { Card, CardContent, Chip } from "@heroui/react";
import {
  FaBookOpen,
  FaHeart,
  FaRegBookmark,
  FaCrown,
  FaUtensils,
  FaClock,
} from "react-icons/fa";
import Link from "next/link";

const UserDashboard = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }
  const totalFavRecipes = await getFavoriteRecipes(user.id);

  const usersRecipes = await getRecipesByUserId(user.id);

  const recipes = usersRecipes?.data || [];

  const totalRecipes = recipes.length;

  const totalLikes = recipes.reduce(
    (total, recipe) => total + (recipe.likesCount || 0),
    0,
  );

  // Replace with API later
  const totalFavorites = totalFavRecipes?.length || 0;

  // Replace with DB value later
  const isPremium = user?.isPremium || false;

  const stats = [
    {
      title: "Total Recipes",
      value: totalRecipes,
      icon: <FaBookOpen className="text-3xl text-orange-500" />,
      hasButton: true,
      buttonText: "View Recipes",
      link: "/dashboard/user/my-recipes",
    },
    {
      title: "Total Likes",
      value: totalLikes,
      icon: <FaHeart className="text-3xl text-red-500" />,
      hasButton: false,
    },
    {
      title: "Favorites",
      value: totalFavorites,
      icon: <FaRegBookmark className="text-3xl text-yellow-500" />,
      hasButton: true,
      buttonText: "View Favorites",
      link: "/dashboard/user/favorites",
    },
  ];

  // Hardcoded Recent Activities
  const recentActivities = [
    {
      id: 1,
      text: "You added a new recipe 'Spaghetti Carbonara'",
      time: "2 hours ago",
    },
    {
      id: 2,
      text: "Someone liked your 'Beef Biryani' recipe",
      time: "5 hours ago",
    },
    {
      id: 3,
      text: "You added 'Chocolate Fudge Cake' to favorites",
      time: "Yesterday",
    },
  ];

  // Hardcoded Cooking Tips
  const cookingTips = [
    "To make your transition smoother, always prep your ingredients (Mise en Place) before you turn on the stove.",
    "Rest your meat for 5-10 minutes after cooking to keep it juicy and tender.",
  ];

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user.name} 👋</h1>
        <p className="text-default-500 mt-2">
          Manage your recipes and track your activity.
        </p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card
            key={item.title}
            className="border border-default-200 shadow-lg hover:shadow-xl transition-all"
          >
            <CardContent className="flex flex-col justify-between p-6 h-full gap-4">
              <div className="flex flex-row items-center justify-between w-full">
                <div>
                  <p className="text-default-500">{item.title}</p>
                  <h2 className="mt-2 text-4xl font-bold">{item.value}</h2>
                </div>
                {item.icon}
              </div>

              {item.hasButton ?
                <Link
                  href={item.link}
                  size="sm"
                  variant="flat"
                  color="warning"
                  className="w-full font-bold mt-2 flex items-center justify-center gap-2"
                >
                  <span>{item.buttonText}</span>
                  <FiArrowRight className="text-base" />
                </Link>
              : <div className="h-8" />}
            </CardContent>
          </Card>
        ))}

        {/* Membership Card */}
        <Card className="border border-warning-300 bg-warning-50 dark:bg-warning-950 shadow-lg">
          <CardContent className="flex items-center justify-between p-6 h-full">
            <div>
              <p className="text-default-500">Membership</p>
              <Chip color={isPremium ? "warning" : "default"} className="mt-3">
                {isPremium ? "Premium Member" : "Free Member"}
              </Chip>
            </div>
            <FaCrown className="text-4xl text-warning" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Activity Section */}
        <Card className="md:col-span-2 border border-default-200 shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-default-100 pb-3">
              <FaClock className="text-xl text-default-500" />
              <h3 className="text-lg font-bold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {recentActivities?.map((act) => (
                <div
                  key={act.id}
                  className="flex justify-between items-center text-sm p-2 rounded-lg bg-default-50 dark:bg-default-100/40"
                >
                  <span className="text-default-700">{act.text}</span>
                  <span className="text-xs text-default-400">{act.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chef Tips Section */}
        <Card className="border border-default-200 shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-default-100 pb-3">
              <FaUtensils className="text-xl text-orange-500" />
              <h3 className="text-lg font-bold">Quick Kitchen Tips</h3>
            </div>
            <div className="space-y-3">
              {cookingTips?.map((tip, idx) => (
                <p
                  key={idx}
                  className="text-xs text-default-500 italic bg-orange-50/50 dark:bg-orange-950/20 p-2.5 rounded-lg border-l-2 border-orange-500"
                >
                  {tip}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UserDashboard;
