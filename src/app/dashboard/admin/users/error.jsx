"use client";

import { Button, Card, CardContent } from "@heroui/react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

const error = () => {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-12"
    >
      <Card className="max-w-md mx-auto border border-red-200 dark:border-red-950/30 bg-red-50/50 dark:bg-red-950/10 backdrop-blur-md rounded-3xl p-6">
        <CardContent className="flex flex-col items-center gap-3">
          <FiAlertCircle className="text-red-500 h-10 w-10" />
          <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
            Data Fetching Failed
          </h3>
          <p className="text-sm text-red-600 dark:text-red-400/80">
            An error occurred while fetching user data.
          </p>
          <Button
            className="mt-2 bg-linear-to-r from-orange-500 to-red-600 text-white font-medium rounded-full"
            onPress={() => window.location.reload()}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default error;
