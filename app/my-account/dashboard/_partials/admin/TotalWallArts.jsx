import React, { useEffect, useState } from "react";
import getURL from "@/middleware/getUrl";
import { manrope } from "@/app/fonts";

const TotalArtWorks = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalArtworks = async () => {
      const response = await fetch(getURL("/api/v1/admin/products"), {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();

      setTotal(data.products.length);
    };

    getTotalArtworks();
  }, []);

  return (
    <div className="border w-full h-full p-10 rounded-lg flex items-center">
      <div>
        <p className="uppercase font-semibold">Total Wallarts</p>
        <h3 className={`flex items-center text-4xl ${manrope.className}`}>
          {total}
        </h3>
      </div>
    </div>
  );
};

export default TotalArtWorks;
