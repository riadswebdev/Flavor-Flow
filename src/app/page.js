import AboutSection from "@/components/home/AboutSection";
import BannerSection from "@/components/home/BannerSection";
import ContactSection from "@/components/home/ContactSection";
import PopularPage from "./popular/page";
import FeaturedPage from "./featured/page";

export const metadata = {
  title: "Flavor Flow - Home",
  description:
    "Discover and share your favorite flavor combinations with Flavor Flow.",
};

export default async function Home() {
  return (
    <>
      <BannerSection />
      <FeaturedPage />
      <PopularPage />
      <AboutSection />
      <ContactSection />
    </>
  );
}
