import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Cards from "@/app/(authentication)/login/partials/Cards";

const LoginDialog = ({
  setOpen,
  handleDialogClose,
  open,
  toggleName,
  withIcon,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger className="h-full w-full m-auto">
        <p className="flex justify-center items-center">
          {" "}
          {toggleName ? toggleName : "Login"} {withIcon && withIcon}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Cards handleDialogClose={handleDialogClose}></Cards>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
