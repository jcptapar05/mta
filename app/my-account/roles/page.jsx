import React from "react";
import Roles from "./_partials/Roles";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";

const RolesPage = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Roles"
        createLink="roles"
        buttonName="Add new roles"
      ></AdminPagesHeader>
      <Roles></Roles>
    </div>
  );
};

export default RolesPage;
