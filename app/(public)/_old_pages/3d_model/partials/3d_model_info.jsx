import { Button } from "@/components/ui/button";
import React from "react";

const ThreedModelInfo = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col flex-grow gap-8 justify-center items-center">
        <h1>
          Unleash your creativity and bring digital art to life with vibrant
          colours and intricate details. Join the artistic revolution now!
        </h1>
        <div className="flex justify-center">
          <Button className="px-16 py-6">Learn More</Button>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <span className="font-extrabold text-4xl">Discover the Magic</span>
      </div>
    </div>
  );
};

export default ThreedModelInfo;
