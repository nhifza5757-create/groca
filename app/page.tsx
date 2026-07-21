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
      <HeroBanner />
      <CategoryBanners />

      <SectionHeading
        title="Our Products"
        subtitle="Fresh picks, handpicked for you every day"
      />
      <CategoryIcons />
      <FeaturedProducts />

      <SpecialDiscount />
      <SpecialProducts />
      <Testimonials />
      <LatestBlog />
      <Newsletter />
      <PartnerLogos />
      <FeatureBar />
    </>
  );
}