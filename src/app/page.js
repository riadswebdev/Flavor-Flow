import AboutSection from "@/components/home/AboutSection";
import BannerSection from "@/components/home/BannerSection";
import ContactSection from "@/components/home/ContactSection";
import HomeRecipesContainer from "@/components/home/HomeRecipesContainer";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Flavor Flow - Home",
  description:
    "Discover and share your favorite flavor combinations with Flavor Flow.",
};

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("User session data:", session);

  return (
    <>
      <BannerSection />
      {/* <FeaturedRecipes />
      <PopularRecipes /> */}
      <HomeRecipesContainer />
      <AboutSection />
      <ContactSection />
    </>
  );
}
