"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import getURL from "@/middleware/getUrl";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

const Forms = ({ itemId }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    const response = await fetch(getURL("/api/v1/admin/order_mailer"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session?.user?.email,
        orderId: itemId,
        first_name: session?.user?.first_name,
        message,
      }),
    });

    const dataMessage = await response.json();

    if (response.ok) {
      toast({
        title: dataMessage.message,
      });
      setMessage("");
      window.location.reload();
    }
  };

  return (
    <div className="w-full">
      <div className="md:max-w-[500px] mx-auto">
        <p className="text-2xl mb-3">Write a message</p>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Textarea
              rows="4"
              placeholder="Message..."
              className="resize-none bg-gray-50 rounded-none text-lg mb-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="w-full uppercase"
              type="submit"
              onClick={onSubmit}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
