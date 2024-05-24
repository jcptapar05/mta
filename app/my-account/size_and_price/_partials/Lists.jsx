"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import CreateSizeAndPrice from "./CreateSizeAndPrice";
import EditSizeAndPrice from "./EditSizeAndPrice";
import getURL from "@/middleware/getUrl";
import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete";

const Lists = () => {
  const [sizeAndPirce, setSizeAndPrice] = useState([]);

  const deleteFaq = async (id) => {
    const res = await fetch(getURL(`/api/v1/admin/faq/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 0,
      },
    });

    const data = await res.json();

    if (res.ok && data.message == "Successfully deleted!") {
      window.location.reload();
    }
  };

  useEffect(() => {
    const getSizeAndPrice = async () => {
      try {
        const response = await fetch(getURL("/api/v1/admin/size_and_price"), {
          method: "GET",
          cache: "no-cache",
        });
        const data = await response.json();
        setSizeAndPrice((prev) => (prev = data.size_and_price));
      } catch (error) {
        console.log(error);
      }
    };

    getSizeAndPrice();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-14">
        <CreateSizeAndPrice></CreateSizeAndPrice>
      </div>
      <ul className="max-w-[700px] mx-auto">
        {sizeAndPirce.length > 0 ? (
          sizeAndPirce.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center gap-20 py-1 border-b"
            >
              <p>{item.name}</p>
              <div>
                <EditSizeAndPrice item={item}></EditSizeAndPrice>
                {/* <ConfirmDelete
                  id={item.id}
                  confirmDelete={deleteFaq}
                /> */}
              </div>
            </li>
          ))
        ) : (
          <p>No Item Found!</p>
        )}
      </ul>
    </div>
  );
};

export default Lists;
