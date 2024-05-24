import React from "react";

const SampleImgs = () => {
  return (
    <div className="my-10">
      <div className="flex md:flex-row items-center justify-center gap-1 flex-col mx-auto w-full max-w-[900px]">
        <img
          src="/art_collaboration/header_bg-2.png"
          className="w-full max-h-[400px] object-cover"
        />
      </div>
      <p className="mt-10 md:max-w-xl mx-auto text-center">
        If selected, we offer mass production opportunities for mutual benefit.
        Contact{" "}
        <a
          href="mailto:marketing@mytoparts.com"
          className="text-orange-600"
        >
          marketing@mytoparts.com
        </a>{" "}
        for further details.
      </p>
    </div>
  );
};

export default SampleImgs;
