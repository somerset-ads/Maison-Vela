import Hero from "@/components/home/Hero";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import Benefits from "@/components/home/Benefits";
import LifestyleBanner from "@/components/home/LifestyleBanner";
import Reviews from "@/components/home/Reviews";
import InstagramSection from "@/components/home/InstagramSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <Benefits />
      <LifestyleBanner />
      <Reviews />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}
