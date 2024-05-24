"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { manrope } from "@/app/fonts";
import { Label } from "@/components/ui/label";
import getURL from "@/middleware/getUrl";

const EnterGalleryVisitorForm = ({ handleDialogClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      getURL("/api/v1/public/enter_virtual_gallery"),
      {
        method: "POST",
        body: JSON.stringify({ name, email }),
      },
    );
    const data = await response.json();

    if (response.ok && data.message == "Success!") {
      localStorage.setItem("isAllowedToEnter", JSON.stringify(true));
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col">
      <Card className="max-w-[450px] border-0 shadow-none">
        <CardHeader className="text-center mb-4">
          <CardTitle className={`${manrope.className} font-medium text-3xl`}>
            Enter info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <div className="grid w-full items-center mb-3">
              <div className="flex flex-col space-y-1.5">
                <div className="mb-2">
                  <Label>
                    Email Address <span className="text-red-600">*</span>
                  </Label>
                </div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>
            <div className="grid w-full items-center mb-3 mt-10">
              <div className="flex flex-col space-y-1.5">
                <div className="mb-2">
                  <Label>
                    Name <span className="text-red-600 mb-20 pb-20">*</span>
                  </Label>
                </div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="name"
                />
              </div>
            </div>
            <Button
              disabled={email === "" || name === ""}
              className="w-full mt-5"
            >
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnterGalleryVisitorForm;
