import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import React from "react";
import Survey from "./_partials/Survey";

const page = () => {
  return (
    <div>
      <AdminPagesHeader title="Product Survey"></AdminPagesHeader>
      <Survey></Survey>
    </div>
  );
};

export default page;
