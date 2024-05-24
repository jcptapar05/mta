"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";

const EditForms = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(getURL(`/api/v1/public/forgot_password`), {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = await res.json();

    if (res.ok && data.message == "Email is not exist!") {
      setMessage("Email is not exist!");
    }

    if (res.ok && data.message == "Success!") {
      toast({
        title: "Successfully updated!",
      });

      setStatus(true);
    }
  };

  if (status) {
    return (
      <div className="w-full max-w-[600px] mx-auto bg-[#F6F6F6] p-6">
        <p>
          We have sent an email to your registered address with instructions to
          reset your password. Please check your inbox. If you don't see the
          email, kindly check your spam or junk folder.
        </p>
        <p className="my-4">
          If you encounter any issues or did not initiate this request, please
          contact our support team immediately.
        </p>
        <div className="text-end">
          <a href="/">
            <Button>Back to Home</Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] mx-auto bg-[#F6F6F6] p-6">
      <p className="text-center mb-4 font-semibold text-2xl">Forgot Password</p>
      <div className="w-full">
        <Label
          htmlFor="name"
          className="text-right"
        >
          Email *
        </Label>
        <Input
          id="email"
          className="w-full mt-2"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {message == "Email is not exist!" && (
        <p className="text-red-500 text-sm">Email is not exist!</p>
      )}
      <div className="w-full mt-3">
        <Button
          onClick={submit}
          className="w-full"
          disabled={email.length <= 4}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default EditForms;
