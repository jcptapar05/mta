"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import CreateFaq from "./CreateFaq";
import EditFaq from "./EditFaq";
import getURL from "@/middleware/getUrl";
import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete";

const Lists = () => {
  const [faqs, setFaqs] = useState([]);

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
    const getFaqs = async () => {
      try {
        const response = await fetch(getURL("/api/v1/admin/faq"), {
          method: "GET",
          cache: "no-cache",
        });
        const data = await response.json();
        setFaqs((prev) => (prev = data.faqs));
      } catch (error) {
        console.log(error);
      }
    };

    getFaqs();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-14">
        <CreateFaq></CreateFaq>
      </div>
      <ul className="max-w-[700px] mx-auto">
        {faqs.length > 0 ? (
          faqs.map((faq) => (
            <li
              key={faq.id}
              className="flex justify-between items-center gap-20 py-1 border-b"
            >
              <p>{faq.title}</p>
              <div>
                <EditFaq faq={faq}></EditFaq>
                <ConfirmDelete
                  id={faq.id}
                  confirmDelete={deleteFaq}
                />
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
