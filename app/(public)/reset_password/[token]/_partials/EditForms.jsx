"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";

const EditForms = () => {
  const params = useParams();
  const token = params.token;
  const router = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState();
  const [verify, setVerify] = useState([]);
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      getURL(`/api/v1/public/reset_password/${user.id}`),
      {
        method: "PATCH",
        body: JSON.stringify({
          email: user.email,
          password,
        }),
      },
    );

    const data = await res.json();

    if (res.ok && data.message == "Success!") {
      toast({
        title: "Successfully updated!",
      });

      window.location.href = "/register?open=true";
      // router.push("/");
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const response = await fetch(getURL("/api/v1/public/reset_password"), {
        method: "POST",
        body: JSON.stringify({
          token,
        }),
      });
      const data = await response.json();
      setUser(data.user[0]);
      // console.log(data.user);
      setVerify(data.user);
    };

    verifyToken();
  }, [token]);

  return (
    <div className="w-full max-w-[400px] mx-auto bg-[#F6F6F6] p-6">
      <p className="text-center mb-4 font-semibold text-2xl">Reset Password</p>
      <div className="w-full">
        <Label
          htmlFor="password"
          className="text-right"
        >
          Enter new password *
        </Label>
        <Input
          id="password"
          type="password"
          required
          className="w-full mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {verify.length <= 0 && (
        <p className="text-red-500 text-sm">Invalid or Expired token!</p>
      )}

      <div className="w-full mt-3">
        <Button
          onClick={submit}
          className="w-full"
          disabled={verify.length <= 0 || password.length < 8}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default EditForms;
