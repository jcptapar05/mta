import React, { useEffect, useState } from "react";
import getURL from "@/middleware/getUrl";
import { manrope } from "@/app/fonts";
import { TbCurrencyDollar } from "react-icons/tb";

const TotalSalesCompleted = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalUsers = async () => {
      const response = await fetch(getURL("/api/v1/admin/total_sales"), {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();
      setTotal(data.products._sum.cartTotalPrice);
    };

    getTotalUsers();
  }, []);

  return (
    <div className="border w-full p-10 h-full rounded-lg flex items-center">
      <div>
        <p className="uppercase font-semibold">Total Sales</p>
        <h3 className={`flex items-center text-4xl ${manrope.className}`}>
          <TbCurrencyDollar className="text-5xl" /> {Number(total).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default TotalSalesCompleted;
