import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const ExploreOurGallery = () => {
  return (
    <div className="container my-20">
      <div className="text-center max-w-[800px] mx-auto">
        <p>
          We're thrilled to collaborate with you, transforming your interior
          spaces with captivating art that leaves a lasting impression. Don't
          hesitate to explore our gallery and reach out for further assistance.
          We're here to make your art journey seamless and unforgettable.
        </p>

        {/* <div className="mt-10 mta-button">
          <Link
            href="/virtual_gallery"
            className="p-4 h-full border border-black w-full"
          >
            <span className="me-4 transition-all">EXPLORE OUR GALLERY</span>{" "}
            <AiOutlineArrowRight className="inline-block" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ExploreOurGallery;
