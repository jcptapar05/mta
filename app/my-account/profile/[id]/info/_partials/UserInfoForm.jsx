"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import getURL from "@/middleware/getUrl";
import { manrope } from "@/app/fonts";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const UserInfoForm = ({ user }) => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastname, setLastName] = useState(user?.last_name || "");
  const [jobTitle, setJobTitle] = useState(user?.job_title || "");
  const [email, setEmail] = useState(user?.email || "");
  const [businessType, setBusinessType] = useState(user?.business_type || "");
  const [websiteUrl, setWebsiteUrl] = useState(user?.website_url || "");
  const [avatar, setAvatar] = useState("");

  const [toggleEdit, setToggleEdit] = useState(true);

  const toggleEditHandler = () => {
    setToggleEdit(false);
  };

  const toggleCancelHandler = () => {
    setToggleEdit(true);
  };

  const avatarChangeHandler = (e) => {
    setAvatar(e.target.files?.[0]);
  };

  const submit = async () => {
    const formData = new FormData();

    const res = await fetch(getURL(`/api/v1/admin/profile/${user.id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastname,
        jobTitle,
        email,
        businessType,
        websiteUrl,
      }),
    });

    const data = await res.json();

    if (res.ok && data.user) {
      toast({
        title: "Successfully updated!",
      });

      setToggleEdit(true);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-5 md:flex justify-between items-end">
        <div className="mb-2">
          <h2 className={`text-2xl mb-2 ${manrope.className}`}>Profile</h2>
          <p>Manage and edit your profile</p>
        </div>

        <div>
          {toggleEdit && (
            <Button
              type="button"
              variant="outlinePrimary"
              onClick={() => toggleEditHandler()}
            >
              Edit
            </Button>
          )}
          {!toggleEdit && (
            <>
              <Button
                className="me-4 mb-2 md:mb-0"
                type="button"
                variant="outlinePrimary"
                onClick={() => toggleCancelHandler()}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => submit()}
              >
                Update
              </Button>
            </>
          )}
        </div>
      </div>

      <Separator className="mb-8"></Separator>
      <form>
        <div className="md:flex md:space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="First Name"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Last Name"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:flex md:space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Job Title"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Business Type"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:flex md:space-x-8 mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Enter email address"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Website URL"
                className="py-6 border-0 bg-slate-100"
                disabled={toggleEdit}
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* 
        {user?.roleId == 4 && (
          <div className="flex space-x-8 mb-4">
            <div className="grid w-full items-center mb-3">
              <div className="flex flex-col space-y-1.5">
                <Input
                  placeholder="Select a file"
                  type="file"
                  required
                  accept="image/*"
                  onChange={avatarChangeHandler}
                />
              </div>
            </div>
            <div className="grid w-full items-center mb-3">
              <div className="flex flex-col space-y-1.5"></div>
            </div>
          </div>
        )} */}
      </form>
    </div>
  );
};

export default UserInfoForm;
