import HeroBanner from "@/components/home/HeroBanner";
import CategoryBanners from "@/components/home/CategoryBanners";
import CategoryIcons from "@/components/home/CategoryIcons";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SpecialDiscount from "@/components/home/SpecialDiscount";
import SpecialProducts from "@/components/home/SpecialProducts";
import Testimonials from "@/components/home/Testimonials";
import LatestBlog from "@/components/home/LatestBlog";
import Newsletter from "@/components/home/Newsletter";
import PartnerLogos from "@/components/home/PartnersLogos";
import FeatureBar from "@/components/home/FeatureBar";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <>
      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <HeroBanner />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <CategoryBanners />
      </div>

      <SectionHeading
        title="Our Products"
        subtitle="Fresh picks, handpicked for you every day"
      />

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <CategoryIcons />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <FeaturedProducts />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <SpecialDiscount />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <SpecialProducts />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <Testimonials />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <LatestBlog />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <Newsletter />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <PartnerLogos />
      </div>

      <div className="transition-transform duration-500 hover:scale-[1.01]">
        <FeatureBar />
      </div>
    </>
  );
}
