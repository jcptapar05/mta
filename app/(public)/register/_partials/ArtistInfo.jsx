"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import getURL from "@/middleware/getUrl";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ArtistInfo = ({
  next,
  nextArtistInfo,
  firstName,
  lastName,
  websiteUrl,
  email,
  confirmEmail,
  password,
  confirmPassword,
  bio,
  facebookLink,
  instagramLink,
  portfolioLink,
  linkendInLink,
  // avatar,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      websiteUrl: websiteUrl,
      email: email,
      confirmEmail: confirmEmail,
      password: password,
      confirmPassword: confirmPassword,
      bio,
      linkendInLink,
      facebookLink,
      instagramLink,
      portfolioLink,
      // avatar,
    },
  });

  // const [imgs, setImgs] = useState(avatar);
  // const [avatarName, setAvatarName] = useState(null);
  const [emailIsExist, setEmailIsExist] = useState();
  // const [imgsErrMessage, setImgsErrMessage] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadingMessage, setUploadingMessage] = useState("Uploading");

  // const uploadImg = async (e) => {
  //   e.preventDefault();
  //   setImgs(e?.target?.files[0]);

  //   const formData = new FormData();
  //   // formData.append("avatar", e.target.files[0]);

  //   setIsUploading((prev) => (prev = true));
  //   setUploadingMessage((prev) => (prev = "Uploading"));

  //   const response = await fetch(getURL("/api/v1/public/uploader"), {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     setAvatarName(data?.avatarname);
  //     setUploadingMessage((prev) => (prev = "Uploaded"));
  //     setIsUploading((prev) => (prev = false));
  //   }
  // };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    // if (imgs == null) {
    //   setImgsErrMessage((prev) => (prev = "This field is required"));
    //   return;
    // }

    const response = await fetch(getURL("/api/v1/public/emailchecker"), {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
    });
    const checkUserEmailIfExists = await response.json();
    setEmailIsExist(checkUserEmailIfExists.message);

    const newData = {
      ...data,
      // avatarName,
    };
    if (checkUserEmailIfExists.message == "ok") {
      nextArtistInfo(newData);
      next();
    }
  };

  return (
    <>
      <div className="text-center">
        <p className="uppercase">Artist Information</p>
      </div>
      <form
        className="my-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="mb-6">Artist Profile</p>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z\s]+$/,
                })}
                type="text"
                placeholder="First Name *"
              />
              {errors.firstName?.type === "required" && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              {errors.firstName?.type === "pattern" && (
                <span className="text-red-500 text-xs">
                  Only letters are allowed in this field
                </span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("lastName", {
                  required: true,
                  pattern: /^[A-Za-z\s]+$/,
                })}
                placeholder="Last Name *"
              />
              {errors.lastName?.type === "required" && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              {errors.lastName?.type === "pattern" && (
                <span className="text-red-500 text-xs">
                  Only letters are allowed in this field
                </span>
              )}
            </div>
          </div>
        </div>
        {/* <div className="flex space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("bio", {
                  required: true,
                  pattern: /^[A-Za-z\s]+$/,
                })}
                placeholder="Artist Bio"
              />
              {errors.bio?.type === "required" && (
                <span className="text -red-500 text-xs">
                  This field is required
                </span>
              )}
              {errors.bio?.type === "pattern" && (
                <span className="text-red-500 text-xs">
                  Only letters are allowed in this field
                </span>
              )}
            </div>
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          {/* <div className="grid w-full items-center mb-3">
            <div className="flex flex-row items-center">
              <p className="me-3">Avatar</p>
              <Input
                type="file"
                accept="image/*"
                onChange={uploadImg}
              />
            </div>
            {avatar == null && imgsErrMessage == "This field is required" && (
              <p className="text-red-500 text-xs mt-0.5">
                This field is required
              </p>
            )}
          </div> */}
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("facebookLink")}
                placeholder="Facebook Link"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("instagramLink")}
                placeholder="Instragram Link"
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("linkendInLink")}
                placeholder="LinkedIn Link"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("websiteUrl")}
                placeholder="Website URL"
              />
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("portfolioLink")}
                placeholder="Portfolio Link"
              />
            </div>
          </div>
        </div>
        <p className="mt-12 mb-6">Login Information</p>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-1 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("email", { required: true })}
                placeholder="Email *"
                type="email"
              />

              {errors.email?.type === "required" && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
              {emailIsExist == "Email is already exist!" && (
                <span className="text-red-500 text-xs">{emailIsExist}</span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("confirmEmail", {
                  required: true,
                  validate: (value) =>
                    value === watch("email") || "Email does not match",
                })}
                placeholder="Confirm Email *"
              />
              {errors.confirmEmail && (
                <span className="text-red-500 text-xs">
                  {errors.confirmEmail.type === "required"
                    ? "This field is required"
                    : "Email does not match"}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-2 md:mb-4">
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                {...register("password", { required: true, minLength: 8 })}
                placeholder="Password *"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.type === "required"
                    ? "This field is required"
                    : "Password must be 8 characters and above"}
                </span>
              )}
            </div>
          </div>
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                  validate: (value) =>
                    value === watch("password") || "Password does not match",
                })}
                placeholder="Confirm Password *"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.type === "required"
                    ? "This field is required"
                    : errors.confirmPassword.type === "minLength"
                    ? "Password must be 8 characters and above"
                    : "Passwords do not match"}
                </span>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-black my-10"></Separator>

        {/* <div className="text-end">
          <Button
            type="submit"
            className="px-20"
          >
            Next
          </Button>
        </div> */}

        <div className="text-end">
          {!isUploading && (
            <Button
              type="submit"
              className="px-20"
            >
              Next
            </Button>
          )}

          {isUploading && (
            <div className="flex gap-5 justify-end items-center">
              <p className="text-center text-blue-600">{uploadingMessage}</p>
              <Button
                className="px-20"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default ArtistInfo;
