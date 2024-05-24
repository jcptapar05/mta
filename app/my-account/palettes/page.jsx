import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";
import Palettes from "./_partials/Palettes";
import Link from "next/link";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";

const page = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Palettes"
        createLink="palettes"
        buttonName="Add new palettes"
      ></AdminPagesHeader>
      <Palettes></Palettes>
    </div>
  );
};

export default page;
