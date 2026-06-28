import { Card, Skeleton } from "@heroui/react";
import { motion } from "framer-motion";

const loading = () => {
  
  return (
  
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card className="border-none bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl p-4 shadow-sm">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full p-2"
              >
                <div className="flex items-center gap-3 w-1/3">
                  <Skeleton className="flex rounded-full w-12 h-12" />
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
  );
};

export default loading;
