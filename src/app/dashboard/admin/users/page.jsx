import { getTotalUsers } from "@/lib/api/recipes";
import ManageUsersPage from "./ManageUser";

const ManageUser = async () => {
  const totalUsers = await getTotalUsers();

 
  const users = totalUsers?.totalUsers || [];


  return <ManageUsersPage totalUsers={users} />;
};

export default ManageUser;
