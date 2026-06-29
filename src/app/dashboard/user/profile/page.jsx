import { getUserSession } from "@/lib/core/session";
import UserProfile from "./UserProfile";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Flavor Flow - Dashboard - Profile",
  description: "View and update your profile information on Flavor Flow.",
};
const ProfilePage = async () => {
  const user = await getUserSession();

  if (!user || user?.role !== "user") {
    redirect("/unauthorized");
  }

  return <UserProfile data={user} />;
};

export default ProfilePage;
