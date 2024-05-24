"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";

const EditStylesForms = ({ style }) => {
  const { toast } = useToast();
  const [name, setName] = useState(style?.name);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(getURL(`/api/v1/admin/styles/${style.id}`), {
      method: "PATCH",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (res.ok && data.message == "Success!") {
      window.location.reload();

      toast({
        title: "Successfully updated!",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="mx-auto w-full"
      >
        <p className="font-bold text-xl mb-8">Update {name} style</p>
        <div className=" w-full mb-3">
          <Input
            placeholder="Enter style name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="text-end">
          <Button className="px-20 w-full">Update</Button>
        </div>
      </form>
    </>
  );
};

export default EditStylesForms;
