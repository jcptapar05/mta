import React from "react";
import Visitors from "./_partials/visitors";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";

const VisitorsPage = () => {
  return (
    <div>
      <AdminPagesHeader title="Visitors"></AdminPagesHeader>
      <Visitors></Visitors>
    </div>
  );
};

export default VisitorsPage;
