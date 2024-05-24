"use client";

import React, { Suspense } from "react";
import Appbar from "../navigation/Appbar";
import AdminDrawer from "../navigation/AdminDrawer";
import Loading from "@/components/loader/loading";

const AdminLayout = ({ children }) => {
 return (
  <>
   <div className="flex">
    <div className="w-2/12">
     <AdminDrawer></AdminDrawer>
    </div>
    <div className="w-10/12">
     <Appbar></Appbar>

     <div className="container mx-auto py-10">
      <Suspense fallback={<Loading />}>{children}</Suspense>
     </div>
    </div>
   </div>
  </>
 );
};

export default AdminLayout;
