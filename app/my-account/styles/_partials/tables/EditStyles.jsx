import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import EditStylesForms from "./EditStylesForms";
import { FaPencil } from "react-icons/fa6";

const EditForm = ({ item }) => {
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
        <EditStylesForms style={item}></EditStylesForms>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;
