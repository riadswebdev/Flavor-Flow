export default function RecipeDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0b0f19] py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        {/* ================= BREADCRUMB SKELETON ================= */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          <div className="h-3 w-3 bg-neutral-200 dark:bg-neutral-800 rounded-sm"></div>
          <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          <div className="h-3 w-3 bg-neutral-200 dark:bg-neutral-800 rounded-sm"></div>
          <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        </div>

        {/* ================= MAIN HERO GRID SKELETON ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Large Hero Image Skeleton (Left Side) */}
          <div className="lg:col-span-7 xl:col-span-8 relative rounded-3xl overflow-hidden shadow-sm border border-neutral-200/60 dark:border-neutral-800/50 bg-neutral-200 dark:bg-neutral-800/60 h-87.5 sm:h-112.5 lg:h-125">
            <div className="absolute bottom-6 left-6 h-10 w-2/3 bg-neutral-300 dark:bg-neutral-700/50 rounded-xl"></div>
          </div>

          {/* Recipe Info & Actions Skeleton (Right Side Card) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white dark:bg-[#131b2e]/70 border border-neutral-200/80 dark:border-neutral-800/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-lg border-b border-neutral-100 dark:border-neutral-800 pb-3"></div>

              {/* Grid Meta Information Skeleton */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 h-17 rounded-xl bg-neutral-100 dark:bg-[#1a233d]/50"></div>
                <div className="h-17 rounded-xl bg-neutral-100 dark:bg-[#1a233d]/50"></div>
                <div className="h-17 rounded-xl bg-neutral-100 dark:bg-[#1a233d]/50"></div>
                <div className="h-17 rounded-xl bg-neutral-100 dark:bg-[#1a233d]/50"></div>
                <div className="h-17 rounded-xl bg-neutral-100 dark:bg-[#1a233d]/50"></div>
              </div>

              {/* Like Count Counter Display Skeleton */}
              <div className="h-9.5 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800/80"></div>
            </div>

            {/* ACTION BUTTONS GROUP SKELETON */}
            <div className="space-y-3 mt-8">
              {/* Buy Button Skeleton */}
              <div className="h-11 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800"></div>

              <div className="grid grid-cols-2 gap-2">
                {/* Favorite & Like Toggle Skeleton */}
                <div className="h-9.5 rounded-xl bg-neutral-200 dark:bg-neutral-800"></div>
                <div className="h-9.5 rounded-xl bg-neutral-200 dark:bg-neutral-800"></div>
              </div>

              {/* Report Button Skeleton */}
              <div className="h-8.5 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800"></div>
            </div>
          </div>
        </div>

        {/* ================= DETAILS TABS SECTION SKELETON ================= */}
        <div className="bg-white dark:bg-[#131b2e]/40 border border-neutral-200/80 dark:border-neutral-800/60 rounded-3xl p-6 sm:p-8 space-y-8 mb-12 shadow-sm">
          {/* About Section */}
          <div>
            <div className="h-7 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
              <div className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
              <div className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients Check List Skeleton */}
            <div>
              <div className="h-7 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-6"></div>
              <ul className="space-y-4">
                {[...Array(6)].map((_, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0"></div>
                    <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Instructions Skeleton */}
            <div>
              <div className="h-7 w-56 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-6"></div>
              <ol className="space-y-6">
                {[...Array(4)].map((_, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0"></div>
                    <div className="space-y-2 w-full pt-1">
                      <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
                      <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* ================= CHEF PROFILE CARD SKELETON ================= */}
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-[#131b2e]/30 shadow-sm mb-12">
          <div className="w-16 h-16 rounded-2xl bg-neutral-200 dark:bg-neutral-800 shrink-0"></div>
          <div className="flex flex-col items-center sm:items-start space-y-2 w-full sm:w-1/3">
            <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            <div className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
            <div className="h-3 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
