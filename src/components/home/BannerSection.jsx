import { Button } from "@heroui/react";
import { ArrowRight, Flame, Clock, Star, Play } from "lucide-react";
import Image from "next/image";

export default function BannerSection() {
  return (
    <section className="relative w-full bg-background overflow-hidden py-12 sm:py-20 lg:py-24">
      {/* Background Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trending Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <Flame size={14} className="animate-pulse" />
              #1 Trending Recipe of the Week
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Savor the Perfect{" "}
              <span className="bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Roasted Sausage
              </span>{" "}
              Traybake
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A heartwarming, effortless dish featuring succulent roasted
              sausages, crispy gold potatoes, and caramelized root vegetables.
              Perfect for busy weeknights or cozy family gatherings.
            </p>

            {/* Necessary Quick Info Metrics */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-sm text-foreground/70">
              <div className="flex items-center gap-2 bg-default-50 px-3 py-1.5 rounded-xl border border-default-100">
                <Clock size={16} className="text-rose-500" />
                <span>
                  Ready in <b>45 Mins</b>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-default-50 px-3 py-1.5 rounded-xl border border-default-100">
                <Flame size={16} className="text-orange-500" />
                <span>
                  Calories: <b>420 kcal</b>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-default-50 px-3 py-1.5 rounded-xl border border-default-100">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span>
                  Rating: <b>4.9 (2.4k)</b>
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button
                size="lg"
                radius="xl"
                className="w-full sm:w-auto font-medium bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-xl shadow-orange-500/20 hover:opacity-95 transition-all"
                endContent={<ArrowRight size={18} />}
                as="a"
                href="https://www.bbc.co.uk/food/recipes/roasted_sausage_and_39127"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Recipe
              </Button>
              <Button
                size="lg"
                radius="xl"
                variant="bordered"
                className="w-full sm:w-auto font-medium border-default-200 hover:bg-default-100 transition-all text-foreground"
                startContent={
                  <Play
                    size={16}
                    className="fill-current text-rose-500 border-none"
                  />
                }
              >
                Watch Video Guide
              </Button>
            </div>
          </div>

          {/* Right Column: Recipe Image Container */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-110 aspect-square sm:aspect-4/3 lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-background group">
              {/* Recipe Image */}
              <Image
                unoptimized
                width={500}
                height={500}
                src="https://ik.imagekit.io/i455l48ls/banner.webp"
                alt="Roasted Sausage and Potato Traybake"
                className="w-full h-[90%] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* linear Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Floating Chef Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70 font-medium">
                    Recipe Source
                  </p>
                  <p className="text-sm font-bold tracking-tight">
                    BBC Food Collection
                  </p>
                </div>
                <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-lg border border-white/10">
                  Easy Level
                </span>
              </div>
            </div>

            {/* Decorative Background Element */}
            <div className="absolute -inset-2 rounded-[32px] border-2 border-dashed border-default-200 -z-20 pointer-events-none scale-95 opacity-65 lg:block hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
