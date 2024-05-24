import React, { Suspense } from "react";

import Loading from "@/components/loader/loading";
import AdminDrawer from "@/components/navigation/AdminDrawer";
import Appbar from "@/components/navigation/Appbar";
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginDialog from '@/components/navigation/partials/navbar/LoginDialog';
import { redirect } from 'next/navigation';

const AdminLayout = async ({ children, searchParams }) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/")
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="hidden md:flex md:w-4/12 lg:w-2/12">
          <AdminDrawer></AdminDrawer>
        </div>
        <div className="w-screen md:w-8/12 lg:w-10/12 px-8">
          <div className="mx-auto py-10">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
      <Toaster />
      <Footer></Footer>
    </>
  );
};

export default AdminLayout;
