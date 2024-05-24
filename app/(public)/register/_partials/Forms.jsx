"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import getURL from "@/middleware/getUrl";

const Forms = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(getURL("/api/v1/public/registration"), {
        method: "POST",
        redirect: "follow",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          email,
          password,
          avatar,
          roleId: 3,
        }),
      });

      const res = await response.json();

      if (res.message && res.ok) {
        setErrorMessage(res.message);
        return;
      } else {
        router.push("/login");
      }
    } catch (error) {
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="container mt-8">
      {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}
      <form
        onSubmit={submit}
        noValidate
      >
        <div className="flex text-center">
          <div className="md:w-1/2 mx-auto">
            <div className="grid w-full items-center mb-6">
              <div className="flex flex-col space-y-1.5">
                <Input
                  className="bg-slate-50"
                  placeholder="FIRST NAME"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full items-center mb-6">
              <div className="flex flex-col space-y-1.5">
                <Input
                  className="bg-slate-50"
                  placeholder="LAST NAME"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full items-center mb-6">
              <div className="flex flex-col space-y-1.5">
                <Input
                  className="bg-slate-50"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid w-full items-center mb-6">
              <div className="flex flex-col space-y-1.5">
                <Input
                  className="bg-slate-50"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>
            <div className="grid w-full items-center mb-6">
              <div className="flex space-y-1.5 items-center">
                <Checkbox
                  id="terms2"
                  className="mt-1 mr-3"
                />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Please Email me The Latest News, Updates, And Promotions From
                  Paragon
                </label>
              </div>
            </div>
            <div className="text-end">
              <Button
                type="submit"
                className="px-20"
                disabled={
                  firstname === "" ||
                  lastname === "" ||
                  email === "" ||
                  password === ""
                }
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forms;
