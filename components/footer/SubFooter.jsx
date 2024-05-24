import React from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
const SubFooter = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:flex-row w-full gap-x-5 justify-between">
      <div className="flex flex-col md:flex-row w-full items-center md:items-start gap-x-4 justify-between">
        <Link
          href="/faqs"
          className={`${
            pathname === "/faqs" && "text-orange-400"
          } hover:text-orange-400 text-[14px] font-extralight`}
        >
          FAQ
        </Link>
        <Link
          href="/contact_us"
          className={`${
            pathname === "/contact_us" && "text-orange-400"
          } hover:text-orange-400 text-[14px] font-extralight`}
        >
          Contact Us
        </Link>
        <Link
          href="/frame_and_packaging"
          className={`${
            pathname === "/frame_and_packaging" && "text-orange-400"
          } hover:text-orange-400 text-[14px] font-extralight`}
        >
          Frame and Packaging
        </Link>
        <Link
          href="/terms_and_conditions"
          className={`${
            pathname === "/terms_and_condition" && "text-orange-400"
          } hover:text-orange-400 text-[14px] font-extralight`}
        >
          Terms and Conditions
        </Link>
        <Link
          href="/privacy_policy"
          className={`${
            pathname === "/privacy_policy" && "text-orange-400"
          } hover:text-orange-400 text-[14px] font-extralight`}
        >
          Privacy Policy
        </Link>
      </div>
      <Separator className="my-6 w-full md:hidden"></Separator>
      <div className="flex w-full items-center justify-center md:justify-end">
        <p className="text-[14px]  font-extralight">
          Copyright &copy; 2024 My Top Arts. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SubFooter;
