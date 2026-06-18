import AboutSection from "@/components/home/AboutSection";
import BannerSection from "@/components/home/BannerSection";
import ContactSection from "@/components/home/ContactSection";

export const metadata = {
  title: "Flavor Flow - Home",
  description:
    "Discover and share your favorite flavor combinations with Flavor Flow.",
};

export default function Home() {
  return (
    <>
      <BannerSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
