"use client";


import { FaUser, FaCrown, FaGem, FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Chip,
  Separator,
} from "@heroui/react";

// Helper function to get plan icon based on its name
const getPlanIcon = (iconName) => {
  switch (iconName) {
    case "Crown":
      return <FaCrown size={24} />;
    case "Gem":
      return <FaGem size={24} />;
    default:
      return <FaUser size={24} />;
  }
};

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function PricingSection({ plans = [], currentPlan }) {
  const handleStripeCheckout = (planId) => {
    console.log(`Redirecting to Stripe checkout for: ${planId}`);
  };

  return (
    <section className="relative py-24 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-75 h-75 bg-rose-500/10 dark:bg-rose-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Chip
            variant="flat"
            className="bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 font-medium mb-4 px-3 py-1"
          >
            ⭐ Membership Plans
          </Chip>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-default-900 dark:text-white mb-4"
        >
          Choose the Perfect Plan for Your Cooking Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-default-500 dark:text-zinc-400 max-w-2xl mx-auto"
        >
          Unlock the full flavor of FlavorFlow. Premium members can upload
          unlimited recipes and unlock exclusive features.
        </motion.p>
      </div>

      {/* Pricing Cards Grid  */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center"
      >
        {plans.map((plan) => {
          const isUserCurrentPlan = currentPlan === plan.planId;

          
          let cardStyle =
            "bg-white/60 dark:bg-zinc-900/60 border border-default-200/60 dark:border-zinc-800/60 text-default-900 dark:text-white shadow-xl";
          let iconStyle =
            "bg-default-100 dark:bg-zinc-800 text-default-600 dark:text-zinc-300";
          let priceStyle =
            "text-default-900 dark:text-white font-black text-4xl";
          let buttonStyle =
            "w-full h-12 rounded-2xl font-semibold bg-default-100 text-default-400 dark:bg-zinc-800 dark:text-zinc-600";
          let badgeColor = "text-default-500 border-default-200";

          if (plan.isPopular) {
            // Premium Plan
            cardStyle =
              "bg-white/80 dark:bg-[#121624]/80 border-2 border-orange-500/60 shadow-2xl relative";
            iconStyle =
              "bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/20";
            priceStyle =
              "text-4xl font-black bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent";
            buttonStyle =
              "w-full h-12 rounded-2xl font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20";
            badgeColor =
              "bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold";
          } else if (plan.isLifetime) {
            // Lifetime Plan
            cardStyle =
              "bg-zinc-950 text-white border border-amber-500/30 shadow-xl";
            iconStyle = "bg-zinc-900 text-amber-400 border border-amber-500/20";
            priceStyle =
              "text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500";
            buttonStyle =
              "w-full h-12 rounded-2xl font-bold bg-zinc-900 text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-zinc-950 transition-all shadow-md shadow-amber-500/5";
            badgeColor =
              "bg-amber-500/10 text-amber-400 border border-amber-500/20";
          }

          return (
            <motion.div
              key={plan._id || plan.planId}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="h-full relative"
            >
              {plan.isPopular && (
                <div className="absolute inset-0 bg-linear-to-br from-orange-500 to-rose-600 blur-xl opacity-20 rounded-3xl -z-10" />
              )}

              <Card
                className={`h-full flex flex-col justify-between rounded-3xl p-6 backdrop-blur-md transition-all ${cardStyle}`}
              >
                <CardHeader className="flex flex-col items-start gap-2 pb-4">
                  <div className="flex justify-between items-center w-full">
                    <div className={`p-3 rounded-2xl ${iconStyle}`}>
                      {getPlanIcon(plan.icon)}
                    </div>
                    <Chip
                      variant={plan.isPopular ? "solid" : "bordered"}
                      className={`text-xs font-semibold ${badgeColor}`}
                    >
                      {isUserCurrentPlan ? "Current Plan" : plan.buttonText}
                    </Chip>
                  </div>
                  <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={priceStyle}>${plan.price}</span>
                    <span className="text-default-400 dark:text-zinc-500 text-sm">
                      / {plan.billingPeriod}
                    </span>
                  </div>
                </CardHeader>

                <Separator
                  className={
                    plan.isPopular ?
                      "bg-orange-100/50 dark:bg-orange-950/20"
                    : "bg-default-100 dark:bg-zinc-800"
                  }
                />

                <Card.Content className="grow py-4">
                  <ul className="flex flex-col gap-3">
                    {plan.features?.map((feat, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm font-medium"
                      >
                        <span
                          className={`p-0.5 rounded-full ${plan.isPopular ? "bg-orange-500/10 text-orange-500 dark:bg-orange-500/20 dark:text-orange-400" : "bg-default-100 dark:bg-zinc-800 text-default-500"}`}
                        >
                          <FaCheck size={12} />
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </Card.Content>

                <CardFooter>
                  <Button
                    isDisabled={isUserCurrentPlan}
                    onClick={() =>
                      !isUserCurrentPlan && handleStripeCheckout(plan.planId)
                    }
                    className={
                      isUserCurrentPlan ?
                        "w-full h-12 rounded-2xl font-semibold bg-default-100 text-default-400 dark:bg-zinc-800 dark:text-zinc-600"
                      : buttonStyle
                    }
                  >
                    {isUserCurrentPlan ? "Current Plan" : plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
