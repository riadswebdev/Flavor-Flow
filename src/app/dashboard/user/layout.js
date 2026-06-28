import { getUserSession, requireRole } from "@/lib/core/session";
import { redirect } from "next/navigation";

const UserDashboardPage = async ({ children }) => {
  const user = await getUserSession();
 if (!user || user?.role !== "user") {
     redirect("/unauthorized");
   }
  return <>{children}</>;
};

export default UserDashboardPage;
