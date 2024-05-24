import React from "react";
import Registration from "./_partials/Registration";

export const metadata = {
  title: "My Top Arts | Register",
  description:
    "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

const page = async () => {
  return (
    <div className="my-20">
      <Registration></Registration>
    </div>
  );
};

export default page;
