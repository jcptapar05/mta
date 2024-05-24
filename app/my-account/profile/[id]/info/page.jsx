"use client";

import React, { useEffect, useState } from "react";
import UserInfoForm from "./_partials/UserInfoForm";
import getURL from "@/middleware/getUrl";

const EditUserProfile = ({ params }) => {
  const id = +params.id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getRole = async (id) => {
      const data = await fetch(getURL(`/api/v1/admin/profile/${id}`), {
        cache: "no-cache",
      });

      const user = await data.json();

      setUser(user.user);
    };

    getRole(id);
  }, []);

  return <>{user && <UserInfoForm user={user}></UserInfoForm>}</>;
};

export default EditUserProfile;
