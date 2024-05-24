import React from "react";
import YourSelectionPage from "./_partials/YourSelectionPage";
import Suggestion from "@/components/suggestion/suggestion";

const page = () => {
  return (
    <div className="container mx-auto my-20 flex flex-col gap-20">
      <YourSelectionPage />
      <Suggestion />
    </div>
  );
};

export default page;
