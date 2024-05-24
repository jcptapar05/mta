"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./tables/DataTable";
import { columns } from "./tables/columns";
import getURL from "@/middleware/getUrl";

const Visitors = () => {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    const fetchVisitorsData = async () => {
      const response = await fetch(
        getURL("/api/v1/admin/enter_virtual_gallery"),
        {
          next: {
            revalidate: 0,
          },
        },
      );
      const data = await response.json();

      setVisitors(data.virtualGallery);
    };

    fetchVisitorsData();
  }, []);

  return (
    <>
      {visitors && (
        <DataTable
          columns={columns}
          data={visitors}
        />
      )}
    </>
  );
};

export default Visitors;
