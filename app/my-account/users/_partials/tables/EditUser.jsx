import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { FaPencil } from "react-icons/fa6";
import EditUserForms from "./EditUserForms";

const EditUser = ({ item }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="me-3"
        >
          <FaPencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <EditUserForms user={item}></EditUserForms>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
