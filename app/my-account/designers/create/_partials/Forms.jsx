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
  const [avatar, setAvatar] = useState(null);

  const avatarChangeHandler = (e) => {
    setAvatar(e.target.files?.[0]);
  };

  const submit = async (e) => {
    e.preventDefault();

    // const res = await fetch(getURL("/api/v1/admin/designers"), {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ first_name: firstname, last_name: lastname, company, avatar }),
    // })

    // const user = await res.json()

    // if (!user.error) {
    //   router.push("/my-account/designers")
    // }

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("company", company);
    formData.append("avatar", avatar);

    const res = await fetch(getURL("/api/v1/admin/designers"), {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    });

    const data = await res.json();
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="max-w-[450px] mx-auto"
      >
        <h2 className="font-bold text-2xl mb-8">Create new designer</h2>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              type="file"
              placeholder="Enter avatar link"
              name="avatar"
              onChange={avatarChangeHandler}
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
