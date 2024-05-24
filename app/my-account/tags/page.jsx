import React from "react";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import Tags from "./_partials/Tags";

const page = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Tags"
        createLink="tags"
        buttonName="Add new tag"
      ></AdminPagesHeader>
      <Tags></Tags>
    </div>
  );
};

export default page;
