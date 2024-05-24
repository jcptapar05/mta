import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import FrameSizes from "./_partials/FrameSizes";

const page = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Frame Sizes"
        createLink="frame_sizes"
        buttonName="Add new frame size"
      ></AdminPagesHeader>
      <FrameSizes></FrameSizes>
    </div>
  );
};

export default page;
