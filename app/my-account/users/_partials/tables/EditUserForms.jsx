"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditUserForms = ({ user }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState(user.email);
  const [firstname, setFirstname] = useState(user.first_name);
  const [lastname, setLastname] = useState(user.last_name);
  const [company, setCompany] = useState(user.company[0].company);
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(user.role.id);
  const [roles, setRoles] = useState(null);

  const onHandlerSetRole = (val) => {
    const index = roles.find((item) => item.name == val);

    setRoleId(index.id);
  };

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(getURL(`/api/v1/admin/users/${user.id}`), {
      method: "PATCH",
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        company,
        password,
        roleId,
        companyId: user.company[0].id,
      }),
    });

    const data = await res.json();

    if (res.ok && data.message == "Success!") {
      window.location.reload();

      toast({
        title: "Successfully updated!",
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(getURL("/api/v1/admin/roles"));
      const data = await response.json();

      setRoles(data.roles);
    };

    fetchUserData();
  }, []);

  return (
    <>
      <form
        onSubmit={submit}
        className="w-full mx-auto"
      >
        <p className="font-bold text-xl mb-8">Update user</p>
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
        <div className="mb-2">
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
        </div>

        <div className="text-end">
          <Button className="w-full">Update</Button>
        </div>
      </form>
    </>
  );
};

export default EditUserForms;
