import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import React from "react";
import CancelledOrders from "./_partials/CancelledOrders";

const page = () => {
  return (
    <div>
      <AdminPagesHeader title="My Non - Binding Purchase Orders"></AdminPagesHeader>
      <CancelledOrders></CancelledOrders>
    </div>
  );
};

export default page;
