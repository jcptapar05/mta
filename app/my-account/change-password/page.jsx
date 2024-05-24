"use client";
import { manrope } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getURL from "@/middleware/getUrl";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const ChangePasswordPage = () => {
  const { data: session } = useSession();
  const [toggleEdit, setToggleEdit] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleEditHandler = () => {
    setToggleEdit(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage((prev) => (prev = "Confirm password not match!"));
      return;
    } else {
      setErrorMessage((prev) => (prev = ""));
    }

    const response = await fetch(
      getURL(`/api/v1/admin/change_password/${session?.user?.id}`),
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      },
    );

    const data = await response.json();

    if (response.ok && data.message == "Password Successfully Changed!") {
      signOut();
    }
  };

  const toggleCancelHandler = () => {
    setToggleEdit(true);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="py-20">
      <div className="max-w-[600px] w-full text-center mx-auto">
        <h2 className={`${manrope.className} text-2xl mb-2`}>
          Verification Success
        </h2>
        <p>You can change your password now</p>
        <p className="text-red-600 mt-12">{errorMessage}</p>
        <div className="mt-2">
          <form onSubmit={onSubmit}>
            <div className="flex space-x-8 mb-4">
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Enter New Password"
                    className="text-center py-6"
                    type="password"
                    value={password}
                    minlength="8"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={toggleEdit}
                  />
                </div>
              </div>
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    placeholder="Confirm New Password"
                    className="text-center py-6"
                    type="password"
                    value={confirmPassword}
                    minlength="8"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={toggleEdit}
                  />
                </div>
              </div>
            </div>
            {toggleEdit && (
              <Button
                className="w-full py-6 mb-2"
                type="button"
                onClick={() => toggleEditHandler()}
              >
                CHANGE PASSWORD
              </Button>
            )}
            {!toggleEdit && (
              <>
                <Button
                  className="w-full py-6 mb-2"
                  type="submit"
                  disabled={
                    password.length < 8 ||
                    confirmPassword.length < 8 ||
                    password != confirmPassword
                  }
                >
                  UPDATE PASSWORD
                </Button>
                <Button
                  className="w-full py-6"
                  variant="link"
                  type="button"
                  onClick={() => toggleCancelHandler()}
                >
                  Cancel
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
