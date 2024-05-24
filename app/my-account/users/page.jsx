import React from "react";
import Users from "./_partials/Users";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";

const page = async () => {
  return (
    <div>
      <AdminPagesHeader
        title="Users"
        createLink="users"
        buttonName="Add new user"
      ></AdminPagesHeader>
      <Users />
    </div>
  );
};

export default page;
