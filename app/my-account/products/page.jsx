import React from "react";
import Products from "./_partials/Products";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";

const page = () => {
  return (
    <div>
      <AdminPagesHeader title="Products"></AdminPagesHeader>
      <Products></Products>
    </div>
  );
};

export default page;
