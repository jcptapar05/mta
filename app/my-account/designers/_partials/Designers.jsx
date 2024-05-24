"use client";
import React, { useEffect, useState } from "react";
import { columns } from "./tables/columns";
import { DataTable } from "./tables/DataTable";
import getURL from "@/middleware/getUrl";

const Desginers = () => {
  const [designers, setDesigners] = useState(null);

  useEffect(() => {
    const fetchDesignersData = async () => {
      const response = await fetch(getURL("/api/v1/admin/designers"));
      const data = await response.json();

      setDesigners(data.designers);
    };

    fetchDesignersData();
  }, []);

  return (
    <>
      {designers && (
        <DataTable
          columns={columns}
          data={designers}
        />
      )}
    </>
  );
};

export default Desginers;
