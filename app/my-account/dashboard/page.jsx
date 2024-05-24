"use client";

import React, { useEffect, useState } from "react";
import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import { useSession } from "next-auth/react";
import TotalSales from "./_partials/admin/TotalSales";
import TotalOrders from "./_partials/admin/TotalOrders";
import TopArtworks from "./_partials/admin/TopArtworks";
import SalesHistory from "./_partials/admin/SalesHistory";
import TotalLikes from "./_partials/admin/TotalLikes";
import getURL from "@/middleware/getUrl";
import TotalUsers from "./_partials/admin/TotalUsers";
import TotalArtWorks from "./_partials/admin/TotalWallArts";
import TotalSalesCompleted from "./_partials/admin/TotalSalesCompleted";

const DashboardPage = () => {
  const { data: session } = useSession();

  const [totalPurchaseOrders, setTotalPurchaseOrders] = useState(0);

  useEffect(() => {
    const getTotalPurchaseOrders = async () => {
      const response = await fetch(getURL("/api/v1/admin/total_orders"), {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();
      setTotalPurchaseOrders(data.products._sum.total_sold);
    };
    getTotalPurchaseOrders();
  }, []);

  return (
    <>
      <AdminPagesHeader title="My Dashboard"></AdminPagesHeader>
      <div className="w-[100%] flex flex-col md:flex-row md:space-x-4 lg:space-x-8 md:items-stretch space-y-4 md:space-y-0">
        <div className="w-[100%] md:w-8/12">
          <TotalOrders totalPurchaseOrders={totalPurchaseOrders}></TotalOrders>
          <div className="mt-8 flex flex-col lg:flex-row w-full md:justify-between lg:space-x-6 mb-4 space-y-4 lg:space-y-0">
            {/* <TotalSales></TotalSales> */}
            <div className="flex flex-col w-full space-y-7">
              <TotalSalesCompleted></TotalSalesCompleted>
              <TotalUsers></TotalUsers>
              <TotalArtWorks></TotalArtWorks>
            </div>

            <TotalLikes></TotalLikes>
          </div>
          {/* <SalesHistory></SalesHistory> */}
        </div>
        <div className="w-[100%] md:w-4/12">
          <TopArtworks></TopArtworks>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
