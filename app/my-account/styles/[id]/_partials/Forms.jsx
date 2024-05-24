"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";

const Forms = ({ roles }) => {
 const [role, setRole] = useState(roles?.name);
 const router = useRouter();

 const submit = async (e) => {
  e.preventDefault();

  const res = await fetch(getURL(`/api/v1/admin/roles/4`), {
   method: "PATCH",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ name: role }),
  });

  // await res.json();

  if (res.ok) {
   router.push("/admin/roles");
  }
 };

 return (
  <>
   <form
    onSubmit={submit}
    className="max-w-[450px] mx-auto"
   >
    <h2 className="font-bold text-2xl mb-8">Update {roles?.name} role</h2>
    <div className="grid w-full items-center mb-3">
     <div className="flex flex-col space-y-1.5">
      <Input
       placeholder="Enter tag name"
       value={role}
       onChange={(e) => setRole(e.target.value)}
      />
     </div>
    </div>
    <div className="text-end">
     <Button className="px-20">Update</Button>
    </div>
   </form>
  </>
 );
};

export default Forms;
