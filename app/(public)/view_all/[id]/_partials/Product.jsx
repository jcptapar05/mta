/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiTwotoneLike } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsArrowsFullscreen, BsChatRightText } from "react-icons/bs";
import Product3D from "./Product3D";
import ProductImage from "./ProductImage";
import { useSession } from "next-auth/react";

import { useCartStore } from "@/store/cartStore";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import ProductVideo from "./ProductVideo";
import TextToSpeech from "@/components/text-to-speech/TextToSpeech";
import ProductAr from "./ProductAr";
import ProductPhoto from "./ProductPhoto";
import SocialButtons from "./SocialButtons";
import getURL from "@/middleware/getUrl";
import { useToast } from "@/components/ui/use-toast";
import { FiMinus } from "react-icons/fi";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";
import ProductDialog2 from "./ProductDialog2";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FaCircleInfo } from "react-icons/fa6";

// import { usePalette } from "color-thief-react";
import { Palette } from "color-thief-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogClose } from "@radix-ui/react-dialog";
import { BiBookmarkMinus } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Product = ({ product, sizeAndPrice }) => {
  const { data: session } = useSession();
  let router = useRouter();
  // const { data: colrs } = usePalette(
  //   "https://my-top-arts.s3.ap-southeast-1.amazonaws.com/arts/JD-F-1321/thumbnails/JD-F-1321.png",
  //   10,
  //   "hex",
  //   {
  //     crossOrigin: "*",
  //     quality: 10,
  //   },
  // );

  // const colorsSplice = [];

  // if (colrs?.length > 0) {
  //   for (let i = 0; 3 > i; i++) {
  //     colorsSplice.push(colrs[i]);
  //   }
  // }

  const saveColor = async (data, id) => {
    const formData = new FormData();
    formData.append("colors", JSON.stringify(data));

    const res = await fetch(
      getURL(`/api/v1/admin/products_color_picker/${id}`),
      {
        method: "PATCH",
        body: formData,
      },
    );

    if (res.ok) {
      console.log("Success!");
    }
  };

  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const cartItems = useCartStore((state) => state.cartItems);
  const [show3D, setShow3D] = useState(false);
  const { toast } = useToast();
  const [amount, setAmount] = useState(1);
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const [currentUserFav, setCurrentUserFav] = useState(false);
  const [surveyInput, setSurveyInput] = useState("");

  const [dialogAddressLocation, setDialogAddressLocation] = useState("");
  const [dialogAddressRoomType, setDialogAddressRoomType] = useState("");
  const [dialogAddressFloor, setDialogAddressFloor] = useState("");
  const [dialogAddressNotes, setDialogAddressNotes] = useState("");

  // const dialogAddressRoomTypeHandler = (val) => {
  //   setDialogAddressRoomType(val);
  // };

  const toggleProductImage = () => {
    setShow3D(!show3D);
  };

  const [requestSampleState, setRequestSampleState] = useState(false);
  const [request3DSampleState, setRequest3DSampleState] = useState(false);

  const requestSampleHandler = (checked) => {
    setRequestSampleState((prev) => (prev = checked));
  };

  const request3DSampleHandler = (checked) => {
    setRequest3DSampleState((prev) => (prev = checked));
  };

  // Canvas Thickness and Sizes
  const [mmState, setMmState] = useState("2 mm");
  const [frameCanvasSize, setFrameCanvasSize] = useState(
    product && product?.frame_size?.name == "80 x 80 cm"
      ? "80 x 80 cm "
      : "90 x 60 cm",
  );

  const mmChangeHandler = (val) => {
    setMmState((prev) => (prev = val));
  };

  const frameCanvasSizeChangeHandler = (val) => {
    setFrameCanvasSize((prev) => (prev = val));
  };

  const addToLocalStorage = (productToCart) => {
    const existingItem = cartItems.find(
      (item) =>
        item.productToCart.id === productToCart.id &&
        item.orderDetails?.frameCanvasSize == frameCanvasSize &&
        item.orderDetails?.frameCanvasThick == mmState,
    );

    // const ItemIndex = cartItems.findIndex(
    //   (item) => item.productToCart.id == productToCart.id,
    // );

    const ItemIndex = cartItems.findIndex(
      (item) =>
        item.productToCart.id === productToCart.id &&
        item.orderDetails?.frameCanvasSize == frameCanvasSize &&
        item.orderDetails?.frameCanvasThick == mmState,
    );

    if (existingItem) {
      const updatedCart = [...cartItems];

      updatedCart[ItemIndex].requestSample = requestSampleState;
      updatedCart[ItemIndex].request3DSample = request3DSampleState;

      if (+amount > 0) {
        updatedCart[ItemIndex].orderDetails.quantity = +amount;
      }

      updatedCart[ItemIndex].orderDetails.price = +addondsPrice;

      updatedCart[ItemIndex].addressBldgLocation = dialogAddressLocation;
      updatedCart[ItemIndex].addressRoomType = dialogAddressRoomType;
      updatedCart[ItemIndex].addressFloorLevel = dialogAddressFloor;
      updatedCart[ItemIndex].addressNote = dialogAddressNotes;

      addToCartItems(updatedCart);

      setAmount((prev) => (prev = 1));

      toast({
        title: "Item successfully updated!",
      });
      setTimeout(() => {
        router.replace("/view_all");
      }, 1000);
      return;
    } else {
      const newCartItems = [
        ...cartItems,
        {
          productToCart,
          orderDetails: {
            quantity: +amount,
            status: "pending",
            frameCanvasThick: mmState,
            frameCanvasSize,
            price: +addondsPrice,
          },
          status: "pending",
          requestSample: requestSampleState,
          request3DSample: request3DSampleState,
          addressBldgLocation: dialogAddressLocation,
          addressRoomType: dialogAddressRoomType,
          addressFloorLevel: dialogAddressFloor,
          addressNote: dialogAddressNotes,
        },
      ];

      addToCartItems(newCartItems);

      toast({
        title: "Successfully added to the cart.",
      });
      setTimeout(() => {
        router.replace("/view_all");
      }, 1000);
      setAmount((prev) => (prev = 1));
    }
  };

  const sendArtworkAddressInfo = (productToCart) => {
    addToLocalStorage(productToCart);
  };

  // const surveySubmit = async () => {
  //   const response = await fetch(getURL("/api/v1/public/survey"), {
  //     method: "POST",
  //     body: JSON.stringify({
  //       productId: product.id,
  //       userId: session?.user?.id,
  //       quantity: amount,
  //       surveyMessage: surveyInput,
  //     }),
  //   });

  //   const data = await response.json();

  //   if (response.ok && data.message == "success!") {
  //     toast({
  //       title: "Thank you!",
  //     });
  //     window.location.reload();
  //   }
  // };

  const increateAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const decreaseAmount = () => {
    setAmount((prev) => prev - 1);
  };

  const [dimensionSelected, setDimensionSelected] = useState("in");
  const [weightSelected, setWeightSelected] = useState("lbs");
  const [likesLength, setLikesLength] = useState(0);

  const dimensionChangeHandler = (val) => {
    setDimensionSelected(val);
  };

  const weightChangeHandler = (val) => {
    setWeightSelected(val);
  };

  const [currentView, setCurrentView] = useState(
    product?.is_nft ? "video" : "3d",
  );

  const currentViewHandler = (val) => {
    setCurrentView(val);
  };

  const onToggleLikeHandler = async () => {
    const response = await fetch(getURL("/api/v1/public/like"), {
      method: "POST",
      body: JSON.stringify({
        productId: product.id,
        userId: session?.user?.id,
        isActive: !currentUserLiked,
      }),
    });

    // if (response.ok) {
    setCurrentUserLiked((prev) => (prev = !prev));
    // }
  };

  const onToggleFavHandler = async () => {
    // console.log(currentUserFav);
    const response = await fetch(getURL("/api/v1/public/favorites"), {
      method: "POST",
      body: JSON.stringify({
        productId: product.id,
        userId: session?.user?.id,
        isActive: !currentUserFav,
      }),
    });

    setCurrentUserFav((prev) => (prev = !prev));

    // if (response.ok) {
    // setCurrentUserFav((prev) => (prev = !prev));
    // }
  };

  const [addonsWeight, setAddonsWeight] = useState(0);
  const [addondsPrice, setAddonsPrice] = useState(0);

  useEffect(() => {
    // if (product?.photo) {
    //   setImgs(getAwsFilesBaseUrl(product?.photo.toLowerCase()));
    // }

    if (product && product?.frame_size?.name == "80 x 80 x 2") {
      setFrameCanvasSize((prev) => (prev = "80 x 80 cm"));
    } else {
      setFrameCanvasSize((prev) => (prev = "90 x 60 cm"));
    }

    if (product && product?.is_nft) {
      setCurrentView((prev) => (prev = "video"));
    } else {
      setCurrentView((prev) => (prev = "3d"));
    }
  }, [product]);

  useEffect(() => {
    if (mmState == "2 mm") {
      if (frameCanvasSize == "80 x 80 cm") {
        setAddonsWeight((prev) => (prev = 3.84));
        setAddonsPrice(
          (prev) =>
            (prev = parseFloat(
              sizeAndPrice[0]?.price * product?.set_of,
            ).toFixed(2)),
        );
      }

      if (frameCanvasSize == "90 x 60 cm") {
        setAddonsWeight((prev) => (prev = 3.84));
        setAddonsPrice(
          (prev) =>
            (prev = parseFloat(
              sizeAndPrice[0]?.price * product?.set_of,
            ).toFixed(2)),
        );
      }

      if (frameCanvasSize == "120 x 80 cm") {
        setAddonsWeight((prev) => (prev = 5.28));
        setAddonsPrice((prev) =>
          parseFloat(sizeAndPrice[1]?.price * product?.set_of).toFixed(2),
        );
      }

      if (frameCanvasSize == "240 x 120 cm") {
        setAddonsWeight((prev) => (prev = 19.58));
        setAddonsPrice((prev) =>
          parseFloat(sizeAndPrice[2]?.price * product?.set_of).toFixed(2),
        );
      }
    }

    if (mmState == "3 mm") {
      if (frameCanvasSize == "80 x 80 cm") {
        setAddonsWeight((prev) => (prev = 5.24));
        setAddonsPrice(
          (prev) =>
            (prev = parseFloat(
              sizeAndPrice[3]?.price * product?.set_of,
            ).toFixed(2)),
        );
      }

      if (frameCanvasSize == "90 x 60 cm") {
        setAddonsWeight((prev) => (prev = 5.24));
        setAddonsPrice(
          (prev) =>
            (prev = parseFloat(
              sizeAndPrice[3]?.price * product?.set_of,
            ).toFixed(2)),
        );
      }
      if (frameCanvasSize == "120 x 80 cm") {
        setAddonsWeight((prev) => (prev = 7.25));
        setAddonsPrice(
          (prev) =>
            (prev = parseFloat(
              sizeAndPrice[4]?.price * product?.set_of,
            ).toFixed(2)),
        );
      }
      if (frameCanvasSize == "240 x 120 cm") {
        setAddonsWeight((prev) => (prev = 19.76));
        setAddonsPrice(
          (prev) =>
            (prev = parseFloat(
              sizeAndPrice[5]?.price * product?.set_of,
            ).toFixed(2)),
        );
      }
    }

    const checkUserIsLiked = async () => {
      const response = await fetch(
        getURL(
          `/api/v1/public/like?userId=${session?.user?.id}&productId=${product?.id}`,
        ),
        {
          method: "GET",
        },
      );

      const data = await response.json();
      // console.log(data);
      // if (response.ok) {
      //   if (
      //     data?.like?.productId == product?.id &&
      //     data?.like?.userId == session?.user?.id
      //   ) {
      setCurrentUserLiked((prev) => (prev = data?.like?.active));
      // }
      // }
    };

    const checkUserIsFav = async () => {
      const response = await fetch(
        getURL(
          `/api/v1/public/favorites?userId=${session?.user?.id}&productId=${product?.id}`,
        ),
        {
          method: "GET",
        },
      );

      const data = await response.json();
      if (response.ok) {
        //   if (
        //     data?.myFavourite?.productId == product?.id &&
        //     data?.myFavourite?.userId == session?.user?.id &&
        //     data?.myFavourite.active
        //   ) {
        setCurrentUserFav(data?.myFavourite?.active);
        //   }
      }
    };

    // const checkLikesLength = async () => {
    //   const reponse = await fetch(
    //     getURL(`/api/v1/public/like/${product?.id}`),
    //     {
    //       method: "GET",
    //     },
    //   );

    //   const data = await reponse.json();

    //   setLikesLength(data?.likes?.length);
    // };

    if (product) {
      checkUserIsLiked();
      checkUserIsFav();
      // checkLikesLength();
    }
  }, [
    product,
    // currentUserLiked,
    // currentUserFav,
    session?.user?.id,
    mmState,
    frameCanvasSize,
    sizeAndPrice,
  ]);

  const [isProductDialogVisible, setProductDialogVisibility] = useState(false);

  const toggleProductDialogVisibility = () => {
    setProductDialogVisibility(!isProductDialogVisible);
  };

  return (
    <>
      {product && (
        <div className="md:container mb-8 mt-0 md:mb-16 md:mt-16">
          {/* <div className="flex flex-col md:flex-row"> */}
          <div className="flex flex-col md:flex-row md:items-stretch h-fit md:h-[800px] relative">
            <div className="md:w-6/12 bg-[#F9F9F9] h-[400px] md:h-full relative">
              <div
                className={`h-full w-full ${
                  currentView == "3d" || currentView == "ar" ? "" : "hidden"
                }`}
              >
                {/* <img
                  src="/background.svg"
                  className="w-full h-full object-cover"
                /> */}
              </div>
              <div className="absolute top-0 bg-[#f2f2f244] h-full w-full">
                <div className=" h-full w-full">
                  {currentView == "3d" && product.glb_file_3d && (
                    <Product3D
                      product3dModel={product?.glb_file_3d}
                      productName={product?.name}
                    ></Product3D>
                  )}

                  {currentView == "product" && (
                    <ProductPhoto productImg={product?.photo}></ProductPhoto>
                  )}

                  {currentView == "images" && (
                    <ProductImage
                      productImage={product?.product_img}
                    ></ProductImage>
                  )}

                  {currentView == "video" && (
                    <ProductVideo
                      productName={product?.name}
                      productVideo={product?.video}
                    />
                  )}

                  {currentView == "ar" && (
                    <ProductAr
                      productAr={product?.ar}
                      productId={product?.id}
                    ></ProductAr>
                  )}

                  <div className="absolute z-10 top-8 right-2 md:right-5 h-6 w-6 md:h-14 md:w-14 rounded-full cursor-pointer">
                    <RadioGroup
                      defaultValue={currentView}
                      className="flex flex-col justify-end items-end space-y-1.5"
                      onValueChange={(e) => currentViewHandler(e)}
                    >
                      {!product.is_nft && product?.glb_file_3d && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="3d"
                            id="3d"
                            className="hidden"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Label htmlFor="3d">
                                  <div
                                    className={`cursor-pointer h-8 w-8 md:h-14 md:w-14 text-center text-white rounded-full flex justify-center items-center ${
                                      currentView == "3d"
                                        ? "bg-black"
                                        : "bg-[#656363]"
                                    }`}
                                  >
                                    <img
                                      src="/shopall/menu/cube.png"
                                      alt=""
                                      className="w-fit h-fit md:w-[30px] md:h-[30px]"
                                    />
                                  </div>
                                </Label>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p>3D Model</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}

                      {product && !product?.is_nft && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="product"
                            id="product"
                            className="hidden"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Label htmlFor="product">
                                  <div
                                    className={`cursor-pointer h-8 w-8 md:h-14 md:w-14 bg-[#656363] text-white rounded-full flex justify-center items-center ${
                                      currentView == "product"
                                        ? "bg-black"
                                        : "bg-[#656363]"
                                    }`}
                                  >
                                    <img
                                      src="/frame_icons/Product.svg"
                                      alt=""
                                      className="w-fit h-fit md:w-[30px] md:h-[30px]"
                                    />
                                  </div>
                                </Label>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p>Product</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}

                      {product && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="images"
                            id="images"
                            className="hidden"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Label htmlFor="images">
                                  <div
                                    className={`cursor-pointer h-8 w-8 md:h-14 md:w-14 text-white rounded-full flex justify-center items-center ${
                                      currentView == "images"
                                        ? "bg-black"
                                        : "bg-[#656363]"
                                    }`}
                                  >
                                    <img
                                      src="/frame_icons/gallery.svg"
                                      alt=""
                                      className="w-fit h-fit md:w-[30px] md:h-[30px]"
                                    />
                                  </div>
                                </Label>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p>Images</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                      {product?.video && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="video"
                            id="video"
                            className="hidden"
                          />

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Label htmlFor="video">
                                  <div
                                    className={`cursor-pointer h-8 w-8 md:h-14 md:w-14 text-white rounded-full flex justify-center items-center ${
                                      currentView == "video"
                                        ? "bg-black"
                                        : "bg-[#656363]"
                                    }`}
                                  >
                                    <img
                                      src="/frame_icons/Video.svg"
                                      alt=""
                                      className="w-fit h-fit md:w-[30px] md:h-[30px]"
                                    />
                                  </div>
                                </Label>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p>Video</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}

                      {product && !product?.is_nft && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="ar"
                            id="ar"
                            className="hidden"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Label htmlFor="ar">
                                  <div
                                    className={`cursor-pointer h-8 w-8 md:h-14 md:w-14 text-white rounded-full flex justify-center items-center ${
                                      currentView == "ar"
                                        ? "bg-black"
                                        : "bg-[#656363]"
                                    }`}
                                  >
                                    <img
                                      src="/frame_icons/Ar.svg"
                                      alt=""
                                      className="w-fit h-fit md:w-[30px] md:h-[30px]"
                                    />
                                  </div>
                                </Label>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p>QR/AR</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </RadioGroup>
                  </div>

                  {currentView !== "video" && currentView !== "ar" && (
                    <div className="absolute bottom-2 md:bottom-4 right-2 md:right-5 z-10">
                      {/* <ProductDialog
                        productImage={product?.photo}
                        show3D={show3D}
                        toggleProductImage={toggleProductImage}
                        product3dModel={product?.glb_file_3d}
                      /> */}
                      <button
                        className="bg-white md:w-14 md:h-14 w-8 h-8 flex items-center rounded-full justify-center"
                        onClick={toggleProductDialogVisibility}
                      >
                        <BsArrowsFullscreen />
                      </button>
                    </div>
                  )}
                  {currentView !== "video" && <SocialButtons></SocialButtons>}
                </div>
              </div>
            </div>
            <div className="md:w-6/12 bg-[#FFFFFF] p-5 md:p-10">
              <div className="flex flex-col justify-between h-full">
                <div className=" h-full flex flex-col justify-around">
                  <h3 className="text-4xl mb-1 md:mb-4">{product?.name}</h3>

                  {product.in_stock && !product.is_nft && (
                    <p className="text-green-500 text-sm font-bold flex items-center">
                      <AiFillCheckCircle /> In Stock
                    </p>
                  )}
                  {!product.in_stock && (
                    <p className="text-red-500 text-sm font-bold flex items-center">
                      <AiFillCheckCircle /> Out of Stock
                    </p>
                  )}

                  {product.in_stock && !product.is_nft && (
                    <p className="text-2xl font-normal md:font-thin my-4 md:my-0">
                      $ {addondsPrice}
                    </p>
                  )}

                  {product && (
                    <TextToSpeech text={product?.description}></TextToSpeech>
                  )}

                  <p className="mb-3">{product?.description}</p>

                  {/* {product?.material && (
                    <div>
                      <p className="font-bold uppercase mt-4 mb-2 md:mt-0 md:mb-0">
                        Material
                      </p>
                      <p className="uppercase">{product?.material?.name}</p>
                    </div>
                  )} */}

                  {product?.categories?.length > 0 && (
                    <div className="mb-2">
                      <p className="font-bold uppercase mt-4 mb-2 md:mt-0 md:mb-0">
                        Categories
                      </p>
                      <div className="flex items-center justify-start">
                        {product?.categories?.map((category, index) => (
                          <div key={category?.id}>
                            <p>
                              {category.name}
                              {product.categories.length > 1 &&
                              product.categories.length > index + 1 ? (
                                <span>, </span>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {product?.frame_size && !product.is_nft && (
                    <div className="mb-2">
                      <div className="flex items-center mt-4 mb-2 md:mt-0 md:mb-0">
                        <p className="font-bold uppercase me-6">Dimension</p>

                        <RadioGroup
                          defaultValue={dimensionSelected}
                          className="flex items-center space-x-4"
                          onValueChange={(e) => dimensionChangeHandler(e)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="in"
                              id="in"
                            />
                            <Label htmlFor="in">in</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="cm"
                              id="cm"
                            />
                            <Label htmlFor="cm">cm</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {dimensionSelected == "cm" && (
                        <p>
                          {frameCanvasSize} {mmState}
                        </p>
                      )}

                      {dimensionSelected == "in" && mmState == "2 mm" && (
                        <p>
                          {frameCanvasSize == "90 x 60 cm" &&
                            "36 x 24 in 0.079 in"}
                          {frameCanvasSize == "120 x 80 cm" &&
                            "48 x 32 in 0.079 in"}
                          {frameCanvasSize == "240 x 120 cm" &&
                            "96 x 48 in 0.079 in"}
                        </p>
                      )}

                      {dimensionSelected == "in" && mmState == "3 mm" && (
                        <p>
                          {frameCanvasSize == "90 x 60 cm" &&
                            "36 x 24 in 0.12 in"}
                          {frameCanvasSize == "120 x 80 cm" &&
                            "48 x 32 in 0.12 in"}
                          {frameCanvasSize == "240 x 120 cm" &&
                            "96 x 48 in 0.12 in"}
                        </p>
                      )}

                      {dimensionSelected == "in" && mmState == "2 mm" && (
                        <p>
                          {frameCanvasSize == "80 x 80 cm" &&
                            "32 x 32 in 0.079 in"}
                        </p>
                      )}

                      {dimensionSelected == "in" && mmState == "3 mm" && (
                        <p>
                          {frameCanvasSize == "80 x 80 cm" &&
                            "32 x 32 in 0.12 in"}
                        </p>
                      )}
                    </div>
                  )}

                  {product?.weight && !product.is_nft && (
                    <div className="mb-2">
                      <div className="flex items-center mt-4 mb-2 md:mt-0 md:mb-0">
                        <p className="font-bold uppercase me-6">Weight</p>

                        <RadioGroup
                          defaultValue="lbs"
                          className="flex items-center space-x-4"
                          onValueChange={(e) => weightChangeHandler(e)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="lbs"
                              id="lbs"
                            />
                            <Label htmlFor="lbs">lbs</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="kgs"
                              id="kgs"
                            />
                            <Label htmlFor="kgs">kgs</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      {weightSelected == "kgs" && (
                        <p className="uppercase">
                          {parseFloat(addonsWeight).toFixed(2)} kgs
                        </p>
                      )}
                      {weightSelected == "lbs" && (
                        <p className="uppercase">
                          {parseFloat(addonsWeight * 2.2046226218).toFixed(2)}{" "}
                          lbs
                        </p>
                      )}
                    </div>
                  )}

                  {product &&
                  product.colors != null &&
                  JSON.parse(product.colors).length > 0 ? (
                    <div className="">
                      <p className="font-bold uppercase mt-4 mb-2 md:mt-0 md:mb-0">
                        Colors
                      </p>
                      <div className="flex justify-start items-center gap-2">
                        {JSON.parse(product.colors).map((row, index) => {
                          return (
                            <div
                              key={row}
                              style={{ background: row }}
                              className="h-7 border w-7 rounded-full"
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Palette
                      src={getAwsFilesBaseUrl(product?.thumbnails)}
                      colorCount={3}
                      format="hex"
                      crossOrigin="anonymous"
                      quality={10}
                    >
                      {({ data, loading, error }) => {
                        // Check for errors
                        if (error) {
                          console.error("Error:", error);
                          return null; // or render an error message
                        }

                        // Check if data is still loading
                        if (loading) {
                          return <div>Loading...</div>;
                        }
                        // console.log(data);
                        if (data.length > 0) {
                          saveColor(data, product.id);
                        }

                        return (
                          <div className="flex gap-2 justify-start">
                            {data?.map((item, index) => (
                              <div
                                key={index}
                                style={{ background: item }}
                                className="h-7 border w-7 rounded-full"
                              ></div>
                            ))}
                          </div>
                        );
                      }}
                    </Palette>
                  )}

                  {/* {product && product.colors == null && (
                    <div>
                      <p className="font-bold uppercase mt-4 mb-2 md:mt-0 md:mb-0">
                        Colors
                      </p>
                      <div className="flex gap-2">
                        {colorsSplice?.map((item, index) => (
                          <div
                            key={index}
                            style={{ background: item }}
                            className="h-7 border w-7 rounded-full float-left"
                          ></div>
                        ))}
                      </div>
                    </div>
                  )} */}

                  {/* <hr className="my-8" /> */}

                  {/* Frame type and user request */}

                  {product && !product?.is_nft && (
                    <>
                      <hr className="my-8" />
                      <div className="flex flex-col lg:flex-row gap-x-0 gap-y-2 lg:gap-y-0 lg:gap-x-8 mb-2">
                        <div className="flex items-center gap-x-2">
                          <p className="text-sm">Frame type: </p>
                          <Select onValueChange={mmChangeHandler}>
                            <SelectTrigger className="w-[120px] h-8 bg-gray-200 border-0 focus:ring-0">
                              <SelectValue
                                placeholder={
                                  dimensionSelected == "cm"
                                    ? "2 mm"
                                    : "0.079 in"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="2 mm">
                                  {dimensionSelected == "cm"
                                    ? "2 mm"
                                    : "0.079 in"}
                                </SelectItem>
                                <SelectItem value="3 mm">
                                  {dimensionSelected == "cm"
                                    ? "3 mm"
                                    : "0.12 in"}
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <FaCircleInfo />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Frame thickness</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <p className="text-sm">Frame size: </p>
                          {product?.frame_size?.name == "80 x 80 x 2" ||
                          product?.frame_size?.name == "80 x 80 x 3" ? (
                            <Select
                              onValueChange={frameCanvasSizeChangeHandler}
                            >
                              <SelectTrigger className="w-[160px] h-8 bg-gray-200 border-0 focus:ring-0">
                                <SelectValue
                                  placeholder={
                                    dimensionSelected == "cm"
                                      ? "80 x 80 cm"
                                      : "32 x 32 in"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="80 x 80 cm">
                                    {dimensionSelected == "cm"
                                      ? "80 x 80 cm"
                                      : "32 x 32 in"}
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Select
                              onValueChange={frameCanvasSizeChangeHandler}
                            >
                              <SelectTrigger className="w-[160px] h-8 bg-gray-200 border-0 focus:ring-0">
                                <SelectValue
                                  placeholder={
                                    dimensionSelected == "cm"
                                      ? "90 x 60 cm"
                                      : "36 x 24 in"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="90 x 60 cm">
                                    {dimensionSelected == "cm"
                                      ? "90 x 60 cm"
                                      : "36 x 24 in"}
                                  </SelectItem>
                                  <SelectItem value="120 x 80 cm">
                                    {dimensionSelected == "cm"
                                      ? "120 x 80 cm"
                                      : "48 x 32 in"}
                                  </SelectItem>
                                  <SelectItem value="240 x 120 cm">
                                    {dimensionSelected == "cm"
                                      ? "240 x 120 cm"
                                      : "96 x 48 in"}
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <FaCircleInfo />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Frame size height and width</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </>
                  )}

                  {!product.is_nft && (
                    <>
                      <div className="flex space-x-2 items-center mb-3">
                        <p className="me-6 text-sm">Quantity</p>
                        <button
                          onClick={decreaseAmount}
                          disabled={amount <= 1}
                          className="text-3xl bg-gray-200 h-[30px] w-[30px] rounded-full flex items-center justify-center"
                        >
                          <FiMinus size={16} />
                        </button>
                        <Input
                          type="number"
                          className="w-[40px] text-center text-xs px-2 bg-transparent border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <button
                          onClick={increateAmount}
                          className="text-3xl bg-gray-200 h-[30px] w-[30px] rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id="requestSample"
                          onCheckedChange={requestSampleHandler}
                        />
                        <label
                          htmlFor="requestSample"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Request a sample
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mb-10">
                        <Checkbox
                          id="request3DSample"
                          onCheckedChange={request3DSampleHandler}
                        />
                        <label
                          htmlFor="request3DSample"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Request a 3D Model
                        </label>
                      </div>
                      {/* action buttons */}
                      <hr />
                    </>
                  )}

                  {/* action buttons */}

                  <div className="flex flex-col md:flex-row justify-start items-center gap-2 mt-2 mb-5 md:mb-0">
                    <div className="w-full md:max-w-full md:1/2 lg:w-2/3">
                      {product?.is_nft && (
                        <Button className="border w-full rounded-none uppercase">
                          <a
                            href={product.nft_link}
                            target="_blank"
                          >
                            Check in opensea
                          </a>
                        </Button>
                      )}

                      {!product.is_nft && (
                        <Button
                          className="border w-full rounded-md uppercase font-semibold "
                          onClick={() => addToLocalStorage(product)}
                          disabled={amount <= 0 ? true : false}
                          // disabled={
                          //   amount <= 0 || !session?.user ? true : false
                          // }
                        >
                          Add to Order
                        </Button>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/3 flex space-x-2">
                      <Button
                        type="button"
                        onClick={onToggleLikeHandler}
                        variant="outlinePrimary"
                        className={`border w-1/3 flex hover:bg-slate-100 rounded-md font-semibold  uppercase ${
                          currentUserLiked &&
                          "text-white bg-blue-800 hover:bg-blue-700 hover:text-white"
                        }`}
                        disabled={!session?.user?.id}
                      >
                        {/* {likesLength > 1 ? `${likesLength} Likes` : `Like`} */}
                        <AiTwotoneLike fontSize={20} />
                      </Button>
                      <Button
                        variant="outlinePrimary"
                        type="button"
                        onClick={onToggleFavHandler}
                        className={`border w-1/3 flex hover:bg-slate-100 rounded-md uppercase ${
                          currentUserFav && "bg-blue-800 hover:bg-blue-700"
                        }`}
                        disabled={!session?.user?.id}
                      >
                        {!currentUserFav && (
                          <MdOutlineBookmarkAdd className="text-2xl" />
                        )}

                        {currentUserFav && (
                          <BiBookmarkMinus className="text-2xl text-white" />
                        )}
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outlinePrimary"
                            type="button"
                            className="border w-1/3 flex hover:bg-slate-100 rounded-md uppercase"
                          >
                            <BsChatRightText className="text-xl" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[600px] pt-10">
                          {/* <p className="uppercase font-thin text-slate-400 text-sm">
                            Product SURVEY
                          </p>
                          <p>
                            Explore and select your wall art, then decide and
                            note where it fits within your properties.
                            (Optional)
                          </p>
                          <div className="grid gap-4">
                            <div className="flex flex-col gap-4">
                              <Textarea
                                rows="10"
                                className="w-full"
                                value={surveyInput}
                                onChange={(e) => setSurveyInput(e.target.value)}
                              />
                            </div>
                          </div> */}
                          <p>PRODUCT NOTE</p>
                          <p>
                            Kindly identify which property, location, and space
                            do you want to place this wall arts. (Optional)
                          </p>
                          <div className="flex flex-col space-y-1.5">
                            <Input
                              placeholder="Building Location *"
                              value={dialogAddressLocation}
                              onChange={(e) =>
                                setDialogAddressLocation(e.target.value)
                              }
                            />
                          </div>
                          <div className="flex space-x-2">
                            {/* <Select
                              onValueChange={dialogAddressRoomTypeHandler}
                            >
                              <SelectTrigger className="w-[180px] rounded-none">
                                <SelectValue placeholder="Room type *" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Lobby">Lobby</SelectItem>
                                  <SelectItem value="Office">Office</SelectItem>
                                  <SelectItem value="Entertainment">
                                    Entertainment
                                  </SelectItem>
                                  <SelectItem value="Gym">Gym</SelectItem>
                                  <SelectItem value="Library">
                                    Library
                                  </SelectItem>
                                  <SelectItem value="Cafeteria">
                                    Cafeteria
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select> */}

                            <div className="flex flex-col space-y-1.5 w-1/2">
                              <Input
                                placeholder="Room types *"
                                value={dialogAddressRoomType}
                                onChange={(e) =>
                                  setDialogAddressRoomType(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5 w-1/2">
                              <Input
                                type="number"
                                placeholder="Floor Level *"
                                min="1"
                                max="200"
                                value={dialogAddressFloor}
                                onChange={(e) =>
                                  setDialogAddressFloor(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <p>Additional notes:</p>
                          <Textarea
                            className="rounded-none"
                            placeholder="I also plan to..."
                            value={dialogAddressNotes}
                            onChange={(e) =>
                              setDialogAddressNotes(e.target.value)
                            }
                          />

                          <DialogClose asChild>
                            <Button
                              className="border w-full rounded-none uppercase"
                              type="button"
                              onClick={() => sendArtworkAddressInfo(product)}
                            >
                              Send
                            </Button>
                          </DialogClose>
                          <p className="text-xs text-center">
                            By clicking send, you agree that we'll use the
                            provided data for its intended purpose. Your
                            information is kept confidential and won't be shared
                            without your consent. For more details, view our
                            <Link
                              href="/privacy_policy"
                              className="text-orange-500 cursor-pointer"
                            >
                              {" "}
                              privacy policy
                            </Link>
                            .
                          </p>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isProductDialogVisible && (
            <ProductDialog2
              onClose={toggleProductDialogVisibility}
              productImage={product?.photo}
              currentView={currentView}
              productImg={product?.product_img}
              product3dModel={product?.glb_file_3d}
              productName={product?.name}
              productThumbnail={product?.thumbnails}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Product;
