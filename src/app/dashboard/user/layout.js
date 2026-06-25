import { requireRole } from "@/lib/core/session";

const UserDashboardPage = ({ children }) => {
  requireRole("admin")
  return <>{children}</>;
};

export default UserDashboardPage;
