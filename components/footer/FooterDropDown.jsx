import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
const FooterDropDown = () => {
  return (
    <div className="mb-6">
      <Accordion
        type="single"
        collapsible
      >
        <AccordionItem
          value="item-1"
          className=" border-0"
        >
          <AccordionTrigger className="text-[14px] py-2 [&[data-state=closed]>svg]:-rotate-90 [&[data-state=open]>svg]:-rotate-0">
            Product
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 ml-5">
              {/* <Link
                href="/view_all"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                Shop all
              </Link> */}
              <Link
                href="/frame_and_packaging"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                Frame and Packaging
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem
          value="item-2"
          className=" border-0"
        >
          <AccordionTrigger className="text-[14px] py-2 [&[data-state=closed]>svg]:-rotate-90 [&[data-state=open]>svg]:-rotate-0">
            Services
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2  ml-5">
              <Link
                href="/tailor_made_decor"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                Tailor-Made Decor
              </Link>
              <Link
                href="/art_collaboration"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                Art Collaboration
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem> */}
        {/* <AccordionItem
          value="item-3"
          className=" border-0"
        >
          <AccordionTrigger className="text-[14px] py-2 [&[data-state=closed]>svg]:-rotate-90 [&[data-state=open]>svg]:-rotate-0">
            Our Virtual Gallery
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 ml-5">
              <Link
                target="_blank"
                href="https://vr.1clickdesign.com/mta/#autoplay"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                My Top Arts Gallery
              </Link>
              <Link
                target="_blank"
                href="https://vr.1clickdesign.com/mta_hallways/#autoplay"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                My Top Arts (Lobby & Hallways)
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem
          value="item-4"
          className=" border-0"
        >
          <AccordionTrigger className="text-[14px] py-2 [&[data-state=closed]>svg]:-rotate-90 [&[data-state=open]>svg]:-rotate-0">
            About
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2  ml-5">
              <Link
                href="/faqs"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                FAQ
              </Link>
              {/* <Link
                href="/what_we_do_best"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                What we do best?
              </Link> */}
              <Link
                href="/terms_and_condition"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                Terms and Conditions
              </Link>
              <Link
                href="/privacy_and_policy"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                Privacy Policy
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-5"
          className=" border-0"
        >
          <AccordionTrigger className="text-[14px] py-2 [&[data-state=closed]>svg]:-rotate-90 [&[data-state=open]>svg]:-rotate-0">
            Get in Touch
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2  ml-5">
              <Link
                href="/contact_us"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                Contact Us
              </Link>
              {/* <Link
                href="mailto:info@mytoparts.com"
                className="hover:text-orange-400 text-[14px] font-extralight"
              >
                info@mytoparts.com
              </Link>
              <p className=" text-[14px] font-extralight">881-304-4441</p> */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FooterDropDown;
