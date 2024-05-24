import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { manrope } from "@/app/fonts";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

const ToggleStatusAction = ({ itemId }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  const toggleHandler = async (name) => {
    const response = await fetch(getURL(`/api/v1/admin/orders/${itemId}`), {
      method: "PATCH",
      body: JSON.stringify({ status: name }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok && data.message == "Successfully Updated!") {
      toast({
        title: data.message,
      });

      window.location.reload(false);
    }
  };

  return (
    <div className="flex justify-between space-x-6">
      <div className="w-1/2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full text-red-600 bg-red-100 hover:bg-red-200 bg-opacity-90 py-6 font-bold text-md">
              Cancel Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to cancel this order?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently cancel this order. You cannot undo this
                action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-between">
              <AlertDialogCancel className="w-full bg-gray-200 border-none py-6">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => toggleHandler("cancelled")}
                className="w-full  bg-[#FF4141] hover:bg-[#FF4141] hover:bg-opacity-75 border-none py-6"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div
        className={`w-1/2 ${
          userRole != "super_admin" && userRole != "admin" && "invisible"
        }`}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full text-green-600 bg-green-100 hover:bg-green-200 bg-opacity-90 py-6 font-bold text-md">
              Complete Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className={manrope.className}>
                Are you sure you want to completed this order?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently completed this order. You cannot undo this
                action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-between">
              <AlertDialogCancel className="w-full bg-gray-200 border-none py-6">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => toggleHandler("completed")}
                className="w-full  bg-green-600 hover:bg-green-600 hover:bg-opacity-75 border-none py-6"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ToggleStatusAction;
