import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { FaPencil } from "react-icons/fa6";
import EditFrameAndSizesForms from "./EditFrameSizesForms";

const EditFrameSizes = ({ item }) => {
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
        <EditFrameAndSizesForms
          frameAndProducts={item}
        ></EditFrameAndSizesForms>
      </DialogContent>
    </Dialog>
  );
};

export default EditFrameSizes;
