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
import { Textarea } from "@/components/ui/textarea";

const EditFaq = ({ faq }) => {
  const [title, setTitle] = useState(faq.title || "");
  const [content, setContent] = useState(faq.content || "");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(getURL(`/api/v1/admin/faq/${faq.id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
      cache: "no-cache",
    });

    const data = await res.json();

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
            <Label htmlFor="name">Title</Label>
            <Input
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Content</Label>
            <Textarea
              rows="10"
              className="w-full"
              placeholder="Type your message here."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={submit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditFaq;
