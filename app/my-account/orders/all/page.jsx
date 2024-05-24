import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import React from "react";
import AllOrders from "./_partials/AllOrders";

const page = () => {
  return (
    <div>
      <AdminPagesHeader title="My Non - Binding Purchase Orders"></AdminPagesHeader>
      <AllOrders></AllOrders>
    </div>
  );
};

export default page;
