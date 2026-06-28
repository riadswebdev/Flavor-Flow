import { requireRole } from "@/lib/core/session";

const AdminDashboardPage = async ({ children }) => {
  await requireRole("admin");
  return <>{children}</>;
};

export default AdminDashboardPage;
