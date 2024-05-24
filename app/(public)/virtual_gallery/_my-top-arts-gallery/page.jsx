import React from "react";
import Header from "../_partials/Header";
import Scene from "../_partials/Scene";

const page = () => {
  return (
    <div className="container my-20">
      <Header
        title="My Top Arts Gallery"
        description="Immerse Yourself Virtually in our Collection of Masterpieces "
      ></Header>
      {/* <Scene scenelink="https://vr.1clickdesign.com/mta/"></Scene> */}
    </div>
  );
};

export default page;
