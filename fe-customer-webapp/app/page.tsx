import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestsellerSection from "@/components/home/BestsellerSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import OffersSection from "@/components/home/OffersSection";
import BrandsSection from "@/components/home/BrandsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <CategoryGrid />
        <BestsellerSection />
        <NewArrivalsSection />
        <OffersSection />
        <BrandsSection />
      </main>
      <Footer />
    </>
  );
}
