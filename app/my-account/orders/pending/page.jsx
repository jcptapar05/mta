import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import React from "react";
import PendingOrders from "./_partials/PendingOrders";

const page = () => {
  return (
    <div>
      <AdminPagesHeader title="My Non - Binding Purchase Orders"></AdminPagesHeader>
      <PendingOrders></PendingOrders>
    </div>
  );
};

export default page;
