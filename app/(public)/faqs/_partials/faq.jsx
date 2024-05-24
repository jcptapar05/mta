"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import getURL from "@/middleware/getUrl";

const Faq = () => {
  const accordionItems = [
    {
      id: 1,
      trigger: "What types of wall art does MTA offer?",
      content:
        "At MTA, we specialize in offering decorative wall arts in acrylic, available in three different sizes. Our collection includes prints of professional photography capturing diverse places, people, animals, objects, and more, or paintings by talented artists reproduced on canvas and acrylic. Please note, we focus on decorative wall art and do not offer fine art pieces.",
    },
    {
      id: 2,
      trigger: "Can MTA provide customized sizes beyond the standard options?",
      content:
        "Absolutely! While our standard offerings include three sizes, we can accommodate custom size requirements upon request to suit your specific space dimensions.",
    },
    {
      id: 3,
      trigger: "How can we buy art from MTA?",
      content:
        "The purchasing process is straightforward. Browse our collection, select your desired wall arts, and indicate the quantity. Our sales team will then reach out to discuss the Purchase Order proposal and delivery times.",
    },
    {
      id: 4,
      trigger: "What are the terms for leasing artwork from MTA?",
      content:
        "Our flexible lease options allow you to enjoy the artwork with lease payments over 5-7 years. At the end of the lease, there's an option to purchase the art.",
    },
    {
      id: 5,
      trigger:
        "Can artists submit their artwork for consideration and mass production?",
      content:
        "Absolutely! Artists can upload their artwork for our consideration and potential selection for mass production. Once chosen, we'll reach out to finalize a copyright agreement for mutual benefit.",
    },
    {
      id: 6,
      trigger:
        "How can MTA assist with space planning for wall art installation?",
      content:
        "Clients can upload pictures, images, or CAD drawings of their spaces for decoration. Our team will suggest suitable wall art options and provide space planning recommendations.",
    },
    {
      id: 7,
      trigger: "What is the delivery time for ordered wall art?",
      content:
        "Typically, delivery takes 30-45 days as our wall arts are made to order to ensure quality and precision.",
    },
    {
      id: 8,
      trigger: "Does MTA offer guidance on art selection and placement?",
      content:
        "Certainly! Upload images or CAD drawings of your space for personalized art selection and placement recommendations by our team.",
    },
    {
      id: 9,
      trigger:
        "Can clients visualize the selected art in their space before purchasing?",
      content:
        "Yes, take advantage of our AR feature to visualize and preview selected art pieces in your space before making any decisions.",
    },
    {
      id: 10,
      trigger: "Does MTA offer VR capabilities for art viewing?",
      content:
        "Absolutely! Visit our virtual art gallery through VR to explore and interact with wall arts. You can invite others, connect with live agents for assistance, or schedule virtual walkthroughs for an immersive experience.",
    },
  ];

  const [faqs, setFaqs] = useState([]);

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
    <>
      {faqs.length > 0 ? (
        <Accordion
          type="single"
          collapsible
        >
          {faqs?.map((acc) => (
            <AccordionItem
              key={acc.id}
              value={`item-${acc.id}`}
            >
              <AccordionTrigger>{acc.title}</AccordionTrigger>
              <AccordionContent>
                <p className="pb-4 !text-[16px]">{acc.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Accordion
          type="single"
          collapsible
        >
          {accordionItems?.map((acc) => (
            <AccordionItem
              key={acc.id}
              value={`item-${acc.id}`}
            >
              <AccordionTrigger>{acc.trigger}</AccordionTrigger>
              <AccordionContent>
                <p className="pb-4 !text-[16px]">{acc.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default Faq;
