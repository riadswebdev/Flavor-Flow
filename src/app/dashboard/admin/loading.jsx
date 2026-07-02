import { Card, Separator, Skeleton } from "@heroui/react";

const metadata = {
  title: "Dashboard Loading",
  description: "Loading state for the dashboard",
};

// 5. Global Loader Grid Skeleton (HeroUI Structure Match)
export default function DashboardSkeleton() {
  return (
    <div className="space-y-10 p-4 max-w-[1600px] mx-auto animate-pulse">
      <div className="space-y-3">
        <Skeleton className="h-8 w-64 rounded-xl" />
        <Skeleton className="h-4 w-96 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="rounded-3xl p-5 space-y-4 border border-default-100"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2 w-1/2">
                <Skeleton className="h-3 w-16 rounded-md" />
                <Skeleton className="h-7 w-24 rounded-lg" />
              </div>
              <Skeleton className="h-12 w-12 rounded-2xl" />
            </div>
            <Skeleton className="h-3 w-32 rounded-md" />
            <Skeleton className="h-8 w-full rounded-2xl mt-2" />
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-5 w-32 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card
              key={i}
              className="rounded-2xl p-4 flex flex-row items-center gap-3 border border-default-100"
            >
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-2.5 w-32 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-3xl p-6 space-y-4 border border-default-100">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-36 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
          <Separator />
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b border-default-100"
              >
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-3xl p-6 space-y-4 border border-default-100">
          <Skeleton className="h-5 w-36 rounded-md" />
          <Separator />
          <div className="space-y-4 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-2.5 w-16 rounded-md" />
                  <Skeleton className="h-3.5 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
