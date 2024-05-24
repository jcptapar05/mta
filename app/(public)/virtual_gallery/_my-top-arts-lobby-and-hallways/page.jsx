import React from "react";
import Header from "../_partials/Header";
import Scene from "../_partials/Scene";

const page = () => {
  return (
    <div className="container my-20">
      <Header
        title="My Top Arts"
        subHeaderTitle="(Lobby and Hallways)"
        description="Discover our Collection in Different Lobby and Hallway Settings"
      ></Header>
      {/* <Scene scenelink="https://vr.1clickdesign.com/mta_hallways/"></Scene> */}
    </div>
  );
};

export default page;
