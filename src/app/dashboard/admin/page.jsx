import { getUserSession } from "@/lib/core/session";
import AdminDashboardOverview from "./AdminDashboardOverview";
import { redirect } from "next/navigation";
import { getAdminDashboardOverviewDataByAdminId } from "@/lib/api/admin";

export const metadata = {
  title: "Admin Dashboard - Overview",
  description: "Overview of the admin dashboard",
};

const AdminDashboardPage = async () => {
  const user = await getUserSession();
  if (!user && user.role !== "admin") return redirect("/login");
  const adminDashboardOverviewData =
    await getAdminDashboardOverviewDataByAdminId(user?.id);

  return <AdminDashboardOverview data={adminDashboardOverviewData} />;
};

export default AdminDashboardPage;
