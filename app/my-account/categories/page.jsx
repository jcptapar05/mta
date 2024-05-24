import React from "react";
import Categories from "./_partials/Categories";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";

const page = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Categories"
        createLink="categories"
        buttonName="Add new category"
      ></AdminPagesHeader>
      <Categories></Categories>
    </div>
  );
};

export default page;
