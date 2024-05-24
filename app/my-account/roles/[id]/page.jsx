"use client";

import React, { useEffect, useState } from "react";
import Forms from "./_partials/Forms";
import getURL from "@/middleware/getUrl";

const EditRolePage = ({ params }) => {
  const id = +params.id;
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    const getRole = async (id) => {
      const data = await fetch(getURL(`/api/v1/admin/roles/${id}`), {
        cache: "no-cache",
      });

      const roles = await data.json();

      setRoles(roles.roles);
    };

    getRole(id);
  }, []);

  return <div>{roles && <Forms roles={roles}></Forms>}</div>;
};

export default EditRolePage;
