"use client";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-[24px] mb-3 font-medium">
          Information Collection, Usage, and Sharing
        </h1>
        <p className="text-[16px] font-light">
          We collect information provided voluntarily by you through email or
          direct contact. This information is solely used to respond to your
          inquiries and will not be sold or rented to third parties. We may
          contact you via email regarding specials, new products, services, or
          changes to this policy unless you choose otherwise.
        </p>
      </div>
      <div className="mb-12">
        <h1 className="text-[24px] mb-3 font-medium">Orders</h1>
        <p className="text-[16px] font-light">
          When placing an order, we request contact information for shipping
          purposes. Financial data such as credit card numbers are securely
          entered on the merchant's payment page, and we do not capture or
          retain this information through the website.
        </p>
      </div>
      <div className="mb-12">
        <h1 className="text-[24px] mb-3 font-medium">
          Your Access and Control Over Information
        </h1>
        <p className="text-[16px] font-light mb-3">You have the right to:</p>
        <ul className="list-disc custom-list pl-5">
          <li className="text-[16px] font-light">
            Review the data we possess about you.
          </li>
          <li className="text-[16px] font-light">
            Amend/correct any of your data.
          </li>
          <li className="text-[16px] font-light">
            Request deletion of your data.
          </li>
          <li className="text-[16px] font-light">
            Share any concerns about our data usage.
          </li>
        </ul>
      </div>
      <div className="mb-12">
        <h1 className="text-[24px] mb-3 font-medium">Security</h1>
        <p className="text-[16px] font-light mb-3">
          We take extensive measures to safeguard your information both online
          and offline. Sensitive information transmission (like credit card
          data) is encrypted through the merchant’s payment page. Online, look
          for a closed lock icon or "https" at the payment page's beginning.
        </p>
        <p className="text-[16px] font-light">
          Offline, access to personally identifiable information is granted
          solely to employees performing specific customer service roles. The
          servers storing such information are maintained in a secure
          environment.
        </p>
      </div>
      <div className="mb-12">
        <h1 className="text-[24px] mb-3 font-medium">Returns</h1>
        <p className="text-[16px] font-light">
          Custom products crafted at the request of our customers by
          MyTopArts.com do not qualify for returns, credits, or exchanges. All
          sales are final. Damaged or broken merchandise during shipping will be
          replaced. Standard shipping is 30-45 days, subject to unforeseen
          delays beyond MyTopArts.com's control and its shipping agent.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
