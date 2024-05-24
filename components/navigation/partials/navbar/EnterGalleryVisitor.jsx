import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import EnterGalleryVisitorForm from "./EnterGalleryVisitorForm";

const EnterGalleryVisitor = ({ setOpen, handleDialogClose, open }) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger className="h-full w-full m-auto">
        <p>Check-in as guest</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <EnterGalleryVisitorForm
            handleDialogClose={handleDialogClose}
          ></EnterGalleryVisitorForm>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EnterGalleryVisitor;
