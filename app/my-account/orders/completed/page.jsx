import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import React from "react";
import CompletedOrders from "./_partials/CompletedOrders";

const page = () => {
  return (
    <div>
      <AdminPagesHeader title="My Non - Binding Purchase Orders"></AdminPagesHeader>
      <CompletedOrders></CompletedOrders>
    </div>
  );
};

export default page;
