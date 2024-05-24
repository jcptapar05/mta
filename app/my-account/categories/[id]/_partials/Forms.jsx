"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import getURL from "@/middleware/getUrl";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Forms = () => {
  const router = useRouter();
  const params = useParams();

  const id = +params?.id;
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const isActiveToggle = () => {
    setIsActive((prev) => (prev = !prev));
  };

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(getURL(`/api/v1/admin/categories/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, active: isActive }),
    });

    const data = await res.json();

    if (res.ok && data.category.id) {
      router.push("/my-account/categories");
    }
  };

  useEffect(() => {
    const getCategoryItem = async (id) => {
      const data = await fetch(getURL(`/api/v1/admin/categories/${id}`), {
        cache: "no-cache",
      });

      const category = await data.json();
      // console.log(category);
      setName(category?.category.name);
      setIsActive(category?.category.active);
    };

    getCategoryItem(id);
  }, []);

  return (
    <>
      <form
        onSubmit={submit}
        className="max-w-[450px] mx-auto"
      >
        <h2 className="font-bold text-2xl mb-8">Edit category</h2>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-row items-center gap-x-2">
            <Label htmlFor="cat">Active</Label>
            <Checkbox
              id="cat"
              onCheckedChange={isActiveToggle}
              checked={isActive}
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
