"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import React, { useEffect, useState } from "react";
import Form from "./_partials/Form";
import getURL from "@/middleware/getUrl";

const CreateUserPage = () => {
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(getURL("/api/v1/admin/roles"));
      const data = await response.json();

      setRoles(data.roles);
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Form roles={roles}></Form>
    </div>
  );
};

export default CreateUserPage;
