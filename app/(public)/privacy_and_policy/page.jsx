import React from "react";
import Headers from "./_partials/headers";
import PrivacyPolicy from "./_partials/privacy_policy";

export const metadata = {
  title: "My Top Arts | Privacy Policy",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = () => {
  return (
    <div className="container mx-auto my-20">
      <Headers></Headers>
      <PrivacyPolicy></PrivacyPolicy>
    </div>
  );
};

export default page;
