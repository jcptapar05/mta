import React from "react";
import RoomTypes from "./_partials/RoomTypes";
import Link from "next/link";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";

const page = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Room Types"
        createLink="room_types"
        buttonName="Add new room type"
      ></AdminPagesHeader>
      <RoomTypes></RoomTypes>
    </div>
  );
};

export default page;
