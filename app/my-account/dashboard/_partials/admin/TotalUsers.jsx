import React, { useEffect, useState } from "react";
import getURL from "@/middleware/getUrl";
import { manrope } from "@/app/fonts";

const TotalUsers = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalUsers = async () => {
      const response = await fetch(getURL("/api/v1/admin/users"), {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();

      setTotal(data.users.length);
    };

    getTotalUsers();
  }, []);

  return (
    <div className="border w-full h-full p-10 rounded-lg flex items-center">
      <div>
        <p className="uppercase font-semibold">Total Users</p>
        <h3 className={`flex items-center text-4xl ${manrope.className}`}>
          {total}
        </h3>
      </div>
    </div>
  );
};

export default TotalUsers;
