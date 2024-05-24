/* eslint-disable @next/next/no-img-element */
import { Separator } from "@/components/ui/separator";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="container mx-auto mt-36 relative hidden md:block pt-10">
        <div className="flex items-stretch justify-between relative">
          <div className="w-1/2 relative border-t-2 border-l-2 border-b-2 border-black">
            <div className="absolute top-[-60px] right-0 px-6 bg-white">
              <div className="max-w-[180px] text-end">
                <h1 className="md:text-5xl font-bold uppercase !leading-8">
                  What we do best
                </h1>
              </div>
            </div>

            <div className="absolute top-[40%]">
              <div className="flex items-center space-x-10">
                <div className="border-b-2 w-[30px] border-black"></div>
                <div>
                  <h2 className="text-2xl mb-3">High Quality Artworks</h2>
                  <p className="max-w-[440px] pe-8">
                    Our team of experts curates a diverse selection of
                    high-quality decorative arts, ensuring that each piece is a
                    masterpiece worth owning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 relative md:h-[100vh] border-b-2 border-black ">
            <div className="h-[90%] w-full absolute top-[-80px] right-0">
              <img
                src="/what_we_do_best/header/header-gold-leaf.svg"
                alt=""
                className="h-full w-full object-cover bottom-0 right-0"
              />

              <div className="absolute w-20 h-0.5 bottom-[-20px] bg-black right-[-20px]"></div>
              <div className="absolute w-0.5 h-20 bottom-[-20px] bg-black right-[-20px]"></div>
            </div>
          </div>
        </div>
        <div className="h-[200px] border-r-2 border-black relative">
          <div className="absolute top-[-60px] z-10 bg-white right-40 px-10">
            <div className="max-w-[400px]">
              <h2 className="text-2xl mb-3">Customized Art Solutions</h2>
              <p>
                We provide customized artwork solutions to match your property's
                theme, ensuring a perfect fit for your ambiance and branding.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex md:hidden relative h-screen bg-[url('/what_we_do_best/header/header-gold-leaf.svg')] bg-no-repeat w-screen bg-cover bg-center bg-red-100">
        <div className="w-full h-full flex justify-center items-center backdrop-brightness-75"></div>
        <div className="absolute top-8 right-4 px-6 bg-transparent">
          <div className="max-w-[180px] text-end">
            <h1 className="text-4xl font-bold uppercase leading-6 text-white">
              What we do best
            </h1>
          </div>
        </div>

        <div className="absolute bottom-10 text-white text-center w-screen bg-blend-darken">
          <div className="flex items-center space-x-10 px-14">
            <div className="mx-auto text-center w-full">
              <h2 className="text-2xl mb-3">High Quality Artworks</h2>
              <p>
                Our team of experts curates a diverse selection of high-quality
                paintings, ensuring that each piece is a masterpiece worth
                owning.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden h-[300px] relative">
        <Separator
          className="h-full mx-auto bg-black w-0.5"
          orientation="vertical"
        ></Separator>
        <div className="w-full px-14 py-6 absolute z-10 text-black bg-white  top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
          <h3 className="text-2xl mb-1">Customized Art Solutions</h3>
          <p>
            We provide customized artwork solutions to match your property's
            theme, ensuring a perfect fit for your ambiance and branding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
