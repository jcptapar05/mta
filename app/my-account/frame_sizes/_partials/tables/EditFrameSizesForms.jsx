"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";

const EditFrameAndSizesForms = ({ frameAndProducts }) => {
  const { toast } = useToast();
  const [name, setName] = useState(frameAndProducts?.name || "");
  const [width, setWidth] = useState(frameAndProducts?.width || 0);
  const [height, setHeight] = useState(frameAndProducts?.height || 0);
  const [depth, setDepth] = useState(frameAndProducts?.depth || 0);
  const [price, setPrice] = useState(frameAndProducts?.price || 0);

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      getURL(`/api/v1/admin/frame_sizes/${frameAndProducts.id}`),
      {
        method: "PATCH",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, width, height, depth, price }),
      },
    );

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
        <div className=" w-full mb-3">
          <Input
            placeholder="Enter style name"
            value={width}
            type="number"
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div className=" w-full mb-3">
          <Input
            placeholder="Enter style name"
            value={height}
            type="number"
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className=" w-full mb-3">
          <Input
            placeholder="Enter style name"
            value={depth}
            type="number"
            onChange={(e) => setDepth(e.target.value)}
          />
        </div>
        <div className=" w-full mb-3">
          <Input
            placeholder="Enter style name"
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="text-end">
          <Button className="px-20 w-full">Update</Button>
        </div>
      </form>
    </>
  );
};

export default EditFrameAndSizesForms;
