import Latest from "@/components/homepage/partials/latestArts/Latest";
import Slider from "@/components/slider/Slider";
import { Separator } from "@/components/ui/separator";
import ExploreGallery from "@/components/homepage/partials/exploreGallery/ExploreGallery";
import FeaturedArts from "@/components/homepage/partials/featured/FeaturedArts";
import BrowseOurGallery from "@/components/homepage/partials/browseOurGallery/BrowseOurGallery";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import Monthly_introductions from "@/components/monthly_introductions/Monthly_introductions";

export const metadata = {
  title: "My Top Arts | Home",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

export default function Home() {
  return (
    <>
      <Slider></Slider>
      <div className="space-x-4">
        <Latest></Latest>
      </div>

      <div className="container lg:px-8 px-5 my-6">
        <Separator className="border-[#C8C8C8] h-0.5"></Separator>
      </div>
      <FeaturedArts></FeaturedArts>
      <ExploreGallery></ExploreGallery>
      <Monthly_introductions></Monthly_introductions>
      <BrowseOurGallery></BrowseOurGallery>
      <div className="my-28 text-center mta-button">
        <Link
          href="/view_all"
          className="p-4 h-full border border-black w-full"
        >
          <span className="me-4 transition-all">VIEW ALL</span>{" "}
          <AiOutlineArrowRight className="inline-block" />
        </Link>
      </div>
    </>
  );
}
