import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { getUserSession } from "@/lib/core/session";

const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();

  return (
    
    <div className="flex h-screen bg-neutral-50 dark:bg-[#0b0f19] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-hidden">
      {/* Sidebar Container */}
      <div className=" shrink-0 h-full">
        <DashboardSidebar
          role={user?.role}
          isPremium={user?.isPremium}
          userSession={user}
        />
      </div>

      {/* Right Side Content Container (Navbar + Main Content) */}
     
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar">
        <DashboardNavbar user={user} />

        <main className="flex-1 p-6 sm:p-10 relative z-10">
          {/* Background Blurs */}
          <div className="absolute top-10 left-10 size-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 right-10 size-96 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

          <div className="w-full max-w-6xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
