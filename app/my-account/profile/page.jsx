"use client";
import React, { useEffect, useState } from "react";
import UserInfoForm from "./[id]/info/_partials/UserInfoForm";
import { useSession } from "next-auth/react";
import getURL from "@/middleware/getUrl";

const ProfilePage = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async (id) => {
      const data = await fetch(getURL(`/api/v1/admin/profile/${id}`), {
        cache: "no-cache",
      });

      const user = await data.json();

      setUser(user.user);
    };

    getUserInfo(userId);
  }, [userId]);
  return <>{user && <UserInfoForm user={user}></UserInfoForm>}</>;
};

export default ProfilePage;
