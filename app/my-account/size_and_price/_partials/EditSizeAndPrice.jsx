"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import getURL from "@/middleware/getUrl";
import { FaPencil } from "react-icons/fa6";

const EditSizeAndPrice = ({ item }) => {
  const [price, setPrice] = useState(item.price || 0);
  const [height, setHeight] = useState(item.height || 0);
  const [width, setWidth] = useState(item.width || 0);
  const [thick, setThick] = useState(item.thick || 0);

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      getURL(`/api/v1/admin/size_and_price/${item?.id}`),
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, height, width, thick }),
        cache: "no-cache",
      },
    );

    const data = await res?.json();

    if (res.ok && data.message == "Success!") {
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <FaPencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 pb-4 pt-14">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Price</Label>
            <Input
              className="col-span-3"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Height</Label>
            <Input
              className="col-span-3"
              value={height}
              type="number"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Width</Label>
            <Input
              className="col-span-3"
              value={width}
              type="number"
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Thickness</Label>
            <Input
              className="col-span-3"
              value={thick}
              type="number"
              onChange={(e) => setThick(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={submit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditSizeAndPrice;
