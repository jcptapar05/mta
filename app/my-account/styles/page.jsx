import React from "react";
import Styles from "./_partials/Styles";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";

const StylesPage = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Styles"
        createLink="styles"
        buttonName="Add new style"
      ></AdminPagesHeader>
      <Styles></Styles>
    </div>
  );
};

export default StylesPage;
