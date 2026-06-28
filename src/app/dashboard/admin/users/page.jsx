import { getTotalUsers } from "@/lib/api/recipes";
import ManageUsersPage from "./ManageUser";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Manage Users - Admin Dashboard",
  description: "Manage users in the admin dashboard",
};

const ManageUser = async () => {
  const user = await getUserSession();

  const totalUsers = await getTotalUsers();

  const users = totalUsers?.totalUsers || [];

  return <ManageUsersPage totalUsers={users} user={user} />;
};

export default ManageUser;
