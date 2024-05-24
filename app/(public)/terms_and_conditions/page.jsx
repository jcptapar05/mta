import React from "react";
import Headers from "./_partials/headers";
import TermsAndCondition from "./_partials/terms_and_condition";

export const metadata = {
  title: "My Top Arts | Terms and Conditions",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="container mx-auto  mb-20 mt-10 md:mt-20">
      <Headers></Headers>
      <TermsAndCondition></TermsAndCondition>
    </div>
  );
};

export default page;
