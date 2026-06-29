import { getTotalUsers } from "@/lib/api/user";
import ManageUsersPage from "./ManageUser";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Manage Users - Admin Dashboard",
  description: "Manage users in the admin dashboard",
};

const ManageUser = async () => {
  const user = await getUserSession();

  if (!user || user?.role !== "admin") {
    redirect("/unauthorized");
  }
  const totalUsers = await getTotalUsers();

  const users = totalUsers?.totalUsers || [];

  return <ManageUsersPage totalUsers={users} />;
};

export default ManageUser;
