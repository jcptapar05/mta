"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/components/ui/use-toast";
import getURL from "@/middleware/getUrl";
import { useSession } from "next-auth/react";

const LobbyAndHallwaysPage = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const addToCartItems = useCartStore((state) => state.addToCartItems);
  const cartItems = useCartStore((state) => state.cartItems);

  const userId = session?.user?.id;

  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const [currentUserBookmark, setCurrentUserBookmark] = useState(false);
  const [iframeRef, setIframeRef] = useState(null);

  const onLoadDataConnection = async (productId) => {
    const likeresponse = await fetch(
      getURL(`/api/v1/public/like?userId=${userId}&productId=${productId}`),
      {
        method: "GET",
      },
    );
    const likeres = await likeresponse.json();

    const bookmarkresponse = await fetch(
      getURL(
        `/api/v1/public/favorites?userId=${userId}&productId=${productId}`,
      ),
      {
        method: "GET",
      },
    );
    const bookmarkres = await bookmarkresponse.json();

    setCurrentUserLiked(likeres?.like?.active);
    setCurrentUserBookmark(bookmarkres?.myFavourite?.active);

    if (bookmarkresponse.ok || likeresponse.ok) {
      const userBtnStatus = {
        userStatus: true,
        userState: userId ? true : false,
        userLiked: true,
        currentLikeState: likeres?.like?.active,
        userBookmarked: true,
        currentBookmarkState: bookmarkres?.myFavourite?.active,
      };

      iframeRef?.contentWindow.postMessage(JSON.stringify(userBtnStatus), "*");
    }
  };

  const addToLocalStorage = (productToCart, childdata) => {
    // console.log(childdata);
    let existingItem = cartItems.find((item) => {
      // console.log(item);
      return (
        +item.productToCart.id == +productToCart.id &&
        item.orderDetails.frameCanvasSize == childdata.frameSize &&
        item.orderDetails.frameCanvasThick == childdata.frameType
      );
    });

    const ItemIndex = cartItems.findIndex(
      (item) =>
        item.productToCart.id == productToCart.id &&
        item.orderDetails?.frameCanvasSize == childdata?.frameSize &&
        item.orderDetails?.frameCanvasThick == childdata?.frameType,
    );

    if (existingItem) {
      const updatedCart = [...cartItems];

      updatedCart[ItemIndex].requestSample = childdata.requestSample;
      updatedCart[ItemIndex].request3DSample = childdata.request3DSample;

      if (+childdata.quantity > 0) {
        updatedCart[ItemIndex].orderDetails.quantity = +childdata.quantity;
      }

      updatedCart[ItemIndex].orderDetails.price = +childdata.price;

      if (childdata.addressBldgLocation) {
        updatedCart[ItemIndex].addressBldgLocation =
          childdata.addressBldgLocation;
      }

      if (childdata.addressRoomType) {
        updatedCart[ItemIndex].addressRoomType = childdata.addressRoomType;
      }

      if (childdata.addressFloorLevel) {
        updatedCart[ItemIndex].addressFloorLevel = childdata.addressFloorLevel;
      }

      if (childdata.addressNote) {
        updatedCart[ItemIndex].addressNote = childdata.addressNote;
      }

      addToCartItems(updatedCart);

      toast({
        title: "Item successfully updated!",
      });
      return;
    } else {
      const newCartItems = [
        ...cartItems,
        {
          productToCart: childdata.product,
          orderDetails: {
            quantity: +childdata.quantity,
            status: "pending",
            frameCanvasThick: childdata.frameType,
            frameCanvasSize: childdata.frameSize,
            price: childdata.price,
          },
          status: "pending",
          requestSample: childdata.requestSample,
          request3DSample: childdata.request3DSample,
          addressBldgLocation: childdata.addressBldgLocation,
          addressRoomType: childdata.addressRoomType,
          addressFloorLevel: childdata.addressFloorLevel,
          addressNote: childdata.addressNote,
        },
      ];

      addToCartItems(newCartItems);

      toast({
        title: "Successfully added to the cart.",
      });
    }

    // existingItem = null;
  };

  const onToggleLikeHandler = async (childdata) => {
    const response = await fetch(getURL("/api/v1/public/like"), {
      method: "POST",
      body: JSON.stringify({
        productId: childdata.productLikeId,
        userId: userId,
        isActive: childdata.likeState,
      }),
    });
  };

  const onToggleFavHandler = async (childdata) => {
    const response = await fetch(getURL("/api/v1/public/favorites"), {
      method: "POST",
      body: JSON.stringify({
        productId: childdata.productBookmarkId,
        userId: userId,
        isActive: childdata.bookmarkState,
      }),
    });
  };

  useEffect(() => {
    // child to parent
    window.addEventListener("message", function (event) {
      const data = event.data;
      // console.log(data, "DATA ITEMS");
      // onload data
      if (data.onloaddata && userId != null) {
        onLoadDataConnection(data?.productData?.id);
      }

      if (data.addToCartOrder && +data.quantity > 0) {
        addToLocalStorage(data.product, data);
      }

      if (data.like && userId != null) {
        onToggleLikeHandler(data);
      }

      if (data.addToBookmark && userId != null) {
        onToggleFavHandler(data);
      }
    });
  }, [userId, iframeRef, cartItems]);

  return (
    <div>
      {/* iframe here */}
      <iframe
        src="https://vr.1clickdesign.com/mta_hallways/#autoplay"
        // src="http://localhost:5000/scenes/mta_hallways/#autoplay"
        frameBorder="0"
        className="w-screen h-screen"
        ref={setIframeRef}
      ></iframe>
    </div>
  );
};

export default LobbyAndHallwaysPage;
