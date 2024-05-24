"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./tables/DataTable";
import { columns } from "./tables/columns";
import getURL from "@/middleware/getUrl";

const Tags = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await fetch(getURL("/api/v1/admin/products"), {
        cache: "no-cache",
      });
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProductsData();
  }, []);

  return (
    <>
      {products && (
        <DataTable
          columns={columns}
          data={products}
        />
      )}
    </>
  );
};

export default Tags;
