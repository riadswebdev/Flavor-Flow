import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/core/session";

const UserDashboardPage = async ({ children }) => {
  const user = await getUserSession();
  if (!user || user?.role !== "user") {
    redirect("/unauthorized");
  }
  return <>{children}</>;
};

export default UserDashboardPage;
