"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getURL from "@/middleware/getUrl";

const Form = ({ roles }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(3);
  // const [avatar, setAvatar] = useState("")

  const onHandlerSetRole = (val) => {
    const index = roles.find((item) => item.name == val);

    setRoleId(index.id);
  };

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(getURL("/api/v1/admin/users"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        last_name: lastname,
        first_name: firstname,
        company,
        roleId,
      }),
    });

    if (res.ok) {
      router.push("/my-account/users");
    }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="max-w-[450px] mx-auto"
      >
        <h2 className="font-bold text-2xl mb-8">Create new user</h2>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter Last name"
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
        </div>
        {/* <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter image URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
       placeholder="Enter image URL"
       name="file"
       onChange={(e) => setAvatar(e.target?.files[0]?.name)}
       type="file"
      />
          </div>
        </div> */}
        <Select onValueChange={(value) => onHandlerSetRole(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Role</SelectLabel>
              {roles &&
                roles.map((role) => (
                  <SelectItem
                    key={role.id}
                    value={role.name}
                  >
                    {role.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="text-end">
          <Button className="px-20">Create</Button>
        </div>
      </form>
    </>
  );
};

export default Form;
