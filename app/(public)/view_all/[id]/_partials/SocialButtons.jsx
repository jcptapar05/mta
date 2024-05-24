import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { AiOutlineInstagram } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

const SocialButtons = () => {
  const [socialLinksVisible, setSocialLinksVisible] = useState(false);
  const copyUrlHanlder = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
  };
  const toggleSocialLinks = () => {
    setSocialLinksVisible(!socialLinksVisible);
  };
  return (
    <div className="absolute bottom-2 md:bottom-4 left-0 md:left-[0%] lg:left-[0%] ml-5 w-fit flex">
      <div className="hidden md:flex flex-col w-fit items-start">
        <div
          className={`bg-white rounded-full flex w-fit transition-all ease-in-out delay-1000 ${
            socialLinksVisible ? "space-x-4" : "space-x-0"
          } relative`}
          style={{
            opacity: socialLinksVisible ? 1 : 0,
            transform: `translateY(${socialLinksVisible ? "0" : "50px"})`,
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full h-10 w-10 p-0 bg-slate-100 z-10"
                  onClick={copyUrlHanlder}
                >
                  <MdContentCopy className="hover:text-2xl text-xl transition ease-in-out delay-150 duration-300" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full h-10 w-10 p-0 bg-slate-100"
                  style={{
                    position: `${socialLinksVisible ? "unset" : "absolute"}`,
                    transition:
                      "opacity 0.3s ease-in-out, transform 2s ease-in-out",
                  }}
                >
                  <FaFacebookF className="hover:text-2xl text-blue-700 text-xl transition ease-in-out delay-150 duration-300" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Facebook</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full h-10 w-10 p-0 bg-slate-100"
                  style={{
                    position: `${socialLinksVisible ? "unset" : "absolute"}`,
                    transition:
                      "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                  }}
                >
                  <AiOutlineInstagram className="hover:text-2xl text-red-500 text-xl transition ease-in-out delay-150 duration-300" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Instagram</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full h-10 w-10 p-0 bg-slate-100"
                  style={{
                    position: `${socialLinksVisible ? "unset" : "absolute"}`,
                    transition:
                      "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                  }}
                >
                  <FaLinkedinIn className="hover:text-2xl text-xl transition ease-in-out delay-150 duration-300" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full h-10 w-10 p-0 bg-slate-100"
                  style={{
                    position: `${socialLinksVisible ? "unset" : "absolute"}`,
                    transition:
                      "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                  }}
                >
                  <BiLogoPinterestAlt className="hover:text-2xl text-red-700 text-xl transition ease-in-out delay-150 duration-300" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pinterest</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="mt-8">
          <div
            onClick={toggleSocialLinks}
            className="h-10 w-10 md:h-14 md:w-14 bg-white cursor-pointer rounded-full mx-auto text-center flex justify-center items-center"
          >
            <IoShareSocial className="text-2xl" />
          </div>
        </div>
      </div>

      <div className="flex md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 bg-white rounded-full mx-auto text-center flex justify-center items-center h-8 w-8"
            >
              <IoShareSocial className="text-lg" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-2">
            <div className="bg-white p-0 rounded-full flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full h-10 w-10 p-0 bg-slate-100"
                      onClick={copyUrlHanlder}
                    >
                      <MdContentCopy className="text-2xl" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full h-10 w-10 p-0 bg-slate-100"
                    >
                      <FaFacebookF className="text-xl text-blue-700" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full h-10 w-10 p-0 bg-slate-100"
                    >
                      <AiOutlineInstagram className="text-xl text-red-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full h-10 w-10 p-0 bg-slate-100"
                    >
                      <FaLinkedinIn className="text-2xl" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full h-10 w-10 p-0 bg-slate-100"
                    >
                      <BiLogoPinterestAlt className="text-xl text-red-700" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pinterest</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SocialButtons;
