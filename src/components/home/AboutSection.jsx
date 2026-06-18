"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, ShieldCheck, Utensils } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: <Utensils className="w-6 h-6 text-orange-500" />,
      title: "Share Your Culinary Art",
      description:
        "Post your personal recipes with detailed steps, ingredients, and gorgeous photos to inspire foodies worldwide.",
    },
    {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: "Vibrant Foodie Community",
      description:
        "Connect with passionate home cooks and professional chefs. Like, report, and unlock exclusive recipes.",
    },
    {
      icon: <Heart className="w-6 h-6 text-orange-500" />,
      title: "Save Your Favorites",
      description:
        "Keep a personalized virtual cookbook by favoriting recipes you love, ready to cook whenever you are.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      title: "Premium Culinary Content",
      description:
        "Unlock unlimited recipe publishing privileges and showcase a verification badge via secure premium upgrades.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold tracking-wide">
            <Heart size={14} className="fill-orange-500/20" /> About FlavorFlow
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Where Every Recipe Tells a{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Delicious Story
            </span>
          </h2>
          <p className="text-foreground/70 leading-relaxed text-medium">
            FlavorFlow is a central haven built for home cooks, experimental
            bakers, and professional culinary artists alike. We believe that
            food brings people together, and sharing a recipe is sharing a piece
            of culture, tradition, and love.
          </p>
          <p className="text-foreground/60 text-sm leading-relaxed">
            Whether your goal is to map out your household secrets, build a
            digital audience, or hunt down the perfect weekend brunch
            inspiration, our platform provides the tools to discover and
            organize flavors flawlessly.
          </p>
        </div>

        {/* Right Column: Grid features animated with Framer Motion */}
        <motion.div
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 rounded-2xl border border-default-200/60 bg-background/50 backdrop-blur-sm shadow-md shadow-default-100/5 hover:border-orange-500/30 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-default-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
