import { getAllReports } from "@/lib/api/report";
import RecipeReportsPage from "./ReportsPage";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reports - FlavorFlow Admin Dashboard",
  description: "Manage and review user-submitted reports on FlavorFlow.",
};

const Reports = async () => {

   const user = await getUserSession();
    
      if (!user || user?.role !== "admin") {
        redirect("/unauthorized");
      }
  const reports = await getAllReports();
  const initialReports = reports?.totalReports;

  return <RecipeReportsPage initialReports={initialReports} />;
};

export default Reports;
