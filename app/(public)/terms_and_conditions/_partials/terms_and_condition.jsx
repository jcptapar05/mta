"use client";
import React from "react";

const TermsAndCondition = () => {
  const accordionItems = [
    {
      id: 1,
      title: "Terms of Use",
      content:
        "Welcome to My Top Arts, your access point to the trade market serving residential, commercial, hospitality, healthcare, education, and government sectors. Specifically crafted for real estate managers, interior designers, specifiers, and property owners, our platform provides entry to the website and our immersive virtual art gallery. Customers have the opportunity to browse, select decorative images, obtain information, use our AR feature and designate the wall art to a specific property, location and space.",
    },
    {
      id: 2,
      title: "Website Access",
      content:
        "Access is available to pre-registered customers or to those actively involved in real estate management, interior design, or property ownership. My Top Arts exclusively offers acrylic and canvas decorative wall arts. We extend access to the website and the interactive virtual art gallery. Customers can explore, select decorative images, and reach out to MTA for additional resources.",
    },
    {
      id: 3,
      title: "Registered Users Restrictions",
      content:
        "Access to the site is available to pre-registered approved customers or individuals involved in real estate management, interior design, or property ownership. This access enables customers to visit the virtual gallery and view available content.",
    },
    {
      id: 4,
      title: "Trademarks and Copyright",
      content:
        "Certain logos, graphics, and service names are trademarks or service marks owned by us or our affiliates. Their use for commercial purposes requires our prior written consent. Other trademarks or service marks on the website belong to their respective owners.",
    },
    {
      id: 5,
      title: "Limitation of Liability",
      content:
        "My Top Arts does not guarantee the website's availability or freedom from harmful components. We are not liable for damages arising from website use. Additional rights might be available under certain laws.",
    },
    {
      id: 6,
      title: "Subject to Change ",
      content:
        "We reserve the right to modify our site, policies, and these Terms of Use at our discretion. Your continued use after any changes constitutes acceptance of those modifications.",
    },
    {
      id: 7,
      title: "Other Parties",
      content:
        "Our aim is to limit the personal liability of our officers and employees. The limitations of warranties and liability protect our officers, employees, agents, and subsidiaries.",
    },
    {
      id: 8,
      title: "Waivers",
      content:
        "An invalid provision in these terms will be amended to conform to applicable laws. The failure to enforce any right against you does not constitute a waiver of that right.",
    },
    {
      id: 9,
      title: "Indemnity",
      content:
        "You agree to indemnify and hold My Top Arts and its subsidiaries, contractors, and officers harmless from any losses, damages, or liabilities arising from a breach by you.",
    },
    {
      id: 10,
      title: "Collection and Use of Information",
      content:
        "Customers may provide personal information voluntarily for website access. We use this for administration, security, and to notify customers of relevant products or services.",
    },
    {
      id: 11,
      title: "Security",
      content:
        "We have measures to protect collected personal information, although no internet transmission is entirely secure.",
    },
    {
      id: 12,
      title: "Breaches of Terms and Conditions",
      content:
        "We reserve the right to address any breaches, including prohibiting access, suspending accounts, and legal action.",
    },
    {
      id: 13,
      title: "Disputes",
      content:
        "Any disputes related to these terms shall be resolved through arbitration, except in specific infringement cases.",
    },
    {
      id: 14,
      title: "Opt-Out of Email Invitation",
      content:
        "Customers can opt-out of receiving invitations to enter the Art Gallery.",
    },
    {
      id: 15,
      title: "Website Area of Operation",
      content:
        "The website promotes My Top Arts' operations in the United States and worldwide.",
    },
    {
      id: 16,
      title: "Email Communications",
      content:
        "By communicating via email, you consent to receive electronic communications, acknowledging that these may not be entirely secure.",
    },
    {
      id: 17,
      title: "Terms and Conditions Updates",
      content:
        "Revised terms apply from the date of publication. Users should check for updates regularly.",
    },
  ];

  return (
    <>
      {accordionItems?.map((acc) => (
        <div
          key={acc.id}
          value={`item-${acc.id}`}
          className="mb-12"
        >
          <h1 className="text-[24px] mb-3 font-medium">{acc.title}</h1>
          <p className="text-[16px] font-light">{acc.content}</p>
        </div>
      ))}
    </>
  );
};

export default TermsAndCondition;
