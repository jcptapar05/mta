"use client";
import getURL from "@/middleware/getUrl";
import React, { useEffect, useState } from "react";

const EditUserPage = ({ params }) => {
 const id = +params.id;
 const [user, setUser] = useState();

 useEffect(() => {
  const getuser = async (id) => {
   const data = await fetch(getURL(`/api/v1/admin/users/${id}`), {
    cache: "no-cache",
   });

   const users = await data.json();
   setUser(users.user);
  };

  getuser();
 }, []);

 return (
  <div>
   <p>{user?.first_name}</p>
  </div>
 );
};

export default EditUserPage;
