"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BsUpload } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import LoginDialog from "@/components/navigation/partials/navbar/LoginDialog";
import Link from "next/link";

const Uploader = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [uploadFile, setUploadFile] = useState(null);
  const [details, setDetails] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setUploadFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // ProductPhoto
    for (let i = 0; uploadFile.length > i; i++) {
      formData.append(`product_photo${i}`, uploadFile[i]);
    }

    formData.append("details", details);
    formData.append("attachementLen", uploadFile?.length);

    const res = await fetch(getURL("/api/v1/public/space_planner"), {
      method: "POST",
      body: formData,
    });

    const body = await res.json();

    if (res.ok && body.message == "success!") {
      window.location.reload();

      toast({
        title: "Thank you!",
        description: "We will update you!",
      });
    }
  };

  return (
    <>
      {session ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-black rounded-sm uppercase"
            >
              Upload image or CAD <BsUpload className="h-10 ms-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[580px] pt-20">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="p-10 border-2 border-dashed text-center">
                <Button
                  variant="outline"
                  className="border-black rounded-sm uppercase"
                  onClick={open}
                >
                  Upload image or CAD <BsUpload className="h-10 ms-6" />
                </Button>
              </div>
            </div>
            {uploadFile &&
              uploadFile.map((item, index) => (
                <p
                  key={index}
                  className="text-xs text-slate-400"
                >
                  {item.name}
                </p>
              ))}
            <p>
              Please tell us additional details of your space and purpose of
              use?
            </p>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <Button
              className="border-black rounded-sm uppercase"
              onClick={submit}
              disabled={uploadFile == null || details == ""}
            >
              Send
            </Button>
            <p className="text-xs text-center">
              By clicking send, you agree that we'll use the provided data for
              its intended purpose. Your information is kept confidential and
              won't be shared without your consent. For more details, view our
              <Link
                href="/privacy_policy"
                className="text-orange-500 cursor-pointer"
                target="_blank"
              >
                {" "}
                privacy policy
              </Link>
              .
            </p>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="w-[230px] rounded-sm mx-auto border text-center h-10 flex border-black hover:bg-opacity-75 flex-row items-center justify-center">
          <LoginDialog
            toggleName="Upload image"
            withIcon={<BsUpload className="h-10 ms-6" />}
          ></LoginDialog>
        </div>
      )}
    </>
  );
};

export default Uploader;
