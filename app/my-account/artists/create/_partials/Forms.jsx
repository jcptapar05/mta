"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import getURL from "@/middleware/getUrl";

const Forms = () => {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, setCompany] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [errMessage, setErrMessage] = useState("");

  const avatarChangeHandler = (e) => {
    setAvatar(e.target.files?.[0]);
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrMessage((prev) => (prev = ""));

    const formData = new FormData();
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("company", company);
    formData.append("avatar", avatar);
    formData.append("email", address);
    formData.append("bio", bio);
    formData.append("facebook_link", facebookLink);
    formData.append("linkedIn_link", linkedInLink);
    formData.append("instagram_link", instagramLink);
    formData.append("portfolio_link", portfolioLink);
    formData.append("website_link", websiteUrl);

    const res = await fetch(getURL("/api/v1/admin/artists"), {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    });

    const user = await res.json();

    if (user.message == "Email is exist!") {
      setErrMessage((prev) => (prev = "Email is exist!"));
      return;
    }

    if (!user.error) {
      router.push("/my-account/artists");
    }

    // const res = await fetch(getURL("/api/v1/admin/artists"), {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     first_name: firstname,
    //     last_name: lastname,
    //     company,
    //     avatar,
    //     address,
    //     bio,
    //     facebook_link: facebookLink,
    //     linkedin_link: linkedIn,
    //     instagram_link: instagramLink,
    //     portfolio_link: portfolioLink,
    //     website_link: websiteUrl,
    //   }),
    // });

    // const user = await res.json();

    // if (!user.error) {
    //   router.push("/my-account/artists");
    // }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="max-w-[450px] mx-auto"
      >
        <h2 className="font-bold text-2xl mb-8">Create new artist</h2>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              required
              placeholder="Enter first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              required
              placeholder="Enter last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Select a file"
              type="file"
              required
              accept="image/*"
              onChange={avatarChangeHandler}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter Address"
              value={address}
              type="email"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            {errMessage != "" && (
              <p className="text-red-600 text-sm">Email is already exist!</p>
            )}
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter Facebook Link"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter LinkedIn Link"
              value={linkedInLink}
              onChange={(e) => setLinkedInLink(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter Instagram Link"
              value={instagramLink}
              onChange={(e) => setInstagramLink(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter Portfolio"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter Website URL"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="text-end">
          <Button className="px-20">Create</Button>
        </div>
      </form>
    </>
  );
};

export default Forms;
