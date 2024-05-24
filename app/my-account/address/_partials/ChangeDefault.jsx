import { Button } from "@/components/ui/button";
import getURL from "@/middleware/getUrl";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
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

const ChangeDefault = ({ item, userId }) => {
  const { toast } = useToast();

  const submit = async () => {
    const res = await fetch(
      getURL(`/api/v1/admin/shipping_address/${item.id}`),
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: item.company.company,
          phone: item.phone_number,
          country: item.country,
          addState: item.state,
          city: item.city,
          postalCode: item.postal_code,
          street: item.street,
          userId: userId,
          companyId: item.companyId,
          isSetDefault: true,
        }),
      },
    );
    const body = await res.json();
    if (res.ok && body.message == "Successfully updated!") {
      toast({
        title: "Successfully updated!",
      });
      window.location.reload();
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="bg-transparent text-[#2253FF] hover:text-[#2253F0]"
          >
            Set as Default
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Would you like to change the default?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Proceeding will set a new default, are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChangeDefault;
