"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Select from "react-select";

import getURL from "@/middleware/getUrl";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Forms = ({
  categories,
  palettes,
  frame_sizes,
  room_types,
  artists,
  designers,
  styles,
  materials,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const userRole = session?.user?.role;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [productImg, setProductImg] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productCategories, setProductCategories] = useState(0);
  const [productPalettes, setProductPalettes] = useState(0);
  const [productFrameSizes, setProductFrameSizes] = useState(0);
  const [productRoomTypes, setProductRoomTypes] = useState(0);
  const [scene, setScene] = useState("");
  const [artist, setArtist] = useState("");
  const [designer, setDesigner] = useState("");
  const [style, setStyle] = useState("");
  const [material, setMaterial] = useState("");
  const [video, setVideo] = useState("");
  const [glbFile, setGlbFile] = useState("");
  const [weight, setWeight] = useState("");
  const [ar, setAr] = useState("");

  const [nftUrl, setNftUrl] = useState("");
  const [isNft, setIsNft] = useState(false);

  const toggleNftHandler = () => {
    setIsNft((prev) => !prev);
  };

  const photoChangeHandler = (e) => {
    setPhoto(e.target.files?.[0]);
  };

  const productImgChangeHandler = (e) => {
    setProductImg(e.target.files);
  };

  const onHandlerSetPalettes = (val) => {
    // const index = palettes.find((item) => item.name == val);
    // setProductPalettes(index.id);

    setProductPalettes(val);
  };

  const onHandlerSetFrameSizes = (val) => {
    setProductFrameSizes(val);
  };

  const onHandlerSetCategories = (val) => {
    setProductCategories(val);
  };

  const onHandlerSetArtists = (val) => {
    setArtist(val);
  };

  const onHandlerSetDesigners = (val) => {
    setDesigner(val);
  };

  const onHandlerSetRoomTypes = (val) => {
    setProductRoomTypes(val);
  };

  const onHandlerSetStyles = (val) => {
    setStyle(val);
  };

  const onHandlerSetMaterial = (val) => {
    setMaterial(val);
  };

  const submit = async (e) => {
    e.preventDefault();

    const productPalettesData = [];
    for (let i = 0; productPalettes.length > i; i++) {
      productPalettesData.push({ id: productPalettes[i].id });
    }

    const productCategoriesData = [];
    for (let i = 0; productCategories.length > i; i++) {
      productCategoriesData.push({ id: productCategories[i].id });
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("photo", photo);
    formData.append("quantity", quantity);
    formData.append("in_stock", true);
    formData.append("categoryId", JSON.stringify(productCategoriesData));
    formData.append("paletteId", JSON.stringify(productPalettesData));
    formData.append("frameSizeId", productFrameSizes?.id);
    formData.append("video", video);
    formData.append("glbFile", glbFile);
    formData.append(
      "artistId",
      userRole == "super_admin" ? artist?.id : session?.user?.id,
    );
    formData.append("designerId", designer?.id);
    formData.append("styleId", style?.id);
    formData.append("roomTypeId", productRoomTypes?.id);
    formData.append("userId", session?.user?.id);
    formData.append("materialId", material?.id);
    formData.append("nft_link", nftUrl);
    formData.append("is_nft", isNft);
    formData.append("weight", weight);
    formData.append("ar", ar);

    for (let i = 0; productImg.length > i; i++) {
      formData.append(`product_img${i}`, productImg[i]);
    }

    formData.append("productImgLen", productImg.length);

    const res = await fetch(getURL("/api/v1/admin/products"), {
      method: "POST",
      body: formData,
    });

    // const res = await fetch(getURL("/api/v1/admin/products"), {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name,
    //     description,
    //     price: +price,
    //     photo,
    //     quantity: +quantity,
    //     in_stock: true,
    //     categoryId: productCategoriesData,
    //     paletteId: productPalettesData,
    //     frameSizeId: productFrameSizes.id,
    //     scene,
    //     artistId: userRole == "super_admin" ? artist.id : session?.user?.id,
    //     designerId: designer.id,
    //     styleId: style.id,
    //     productRoomTypes: productRoomTypes.id,
    //     userId: session?.user?.id,
    //     materialId: material.id,
    //     nft_link: nftUrl,
    //     is_nft: isNft,
    //   }),
    // });

    // const user = await res.json();

    // if (!user.error) {
    //   router.push("/my-account/products");
    // }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="max-w-[450px] mx-auto"
        encType="multipart/form-data"
      >
        <h2 className="font-bold text-2xl mb-8">Create new product</h2>
        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="uploadPhoto">Upload photo</Label>
            <Input
              id="uploadPhoto"
              type="file"
              onChange={photoChangeHandler}
            />
          </div>
        </div>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="uploadProductImg">Upload Product Image</Label>
            <Input
              id="uploadProductImg"
              type="file"
              multiple
              onChange={productImgChangeHandler}
            />
          </div>
        </div>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter video link"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
        </div>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter AR link"
              value={ar}
              onChange={(e) => setAr(e.target.value)}
            />
          </div>
        </div>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-row items-center space-x-1.5">
            <Checkbox
              id="terms"
              onClick={toggleNftHandler}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              is your art NFT?
            </label>
          </div>
        </div>

        {isNft && (
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Enter NFT link"
                value={nftUrl}
                onChange={(e) => setNftUrl(e.target.value)}
              />
            </div>
          </div>
        )}

        {!isNft && (
          <div className="grid w-full items-center mb-3">
            <div className="flex flex-col space-y-1.5">
              <Input
                placeholder="Enter 3D file link"
                value={glbFile}
                onChange={(e) => setGlbFile(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter quantity"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="grid w-full items-center mb-3">
          <div className="flex flex-col space-y-1.5">
            <Input
              placeholder="Enter weight"
              value={weight}
              type="number"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between mb-3 gap-2">
          {palettes && (
            <Select
              value={productPalettes}
              onChange={onHandlerSetPalettes}
              options={palettes}
              closeMenuOnSelect={false}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              isMulti
              isClearable
              className="w-1/2"
              placeholder="Select Palette"
            ></Select>
          )}

          {frame_sizes && (
            <Select
              value={productFrameSizes}
              onChange={onHandlerSetFrameSizes}
              options={frame_sizes}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              className="w-1/2"
              placeholder="Select Frame Size"
              isClearable
            ></Select>
          )}
        </div>

        <div className="flex justify-between mb-3 gap-2">
          {categories && (
            <Select
              value={productCategories}
              onChange={onHandlerSetCategories}
              closeMenuOnSelect={false}
              isMulti
              options={categories}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              className="w-1/2"
              placeholder="Select Categories"
              isClearable
            ></Select>
          )}

          {room_types && (
            <Select
              value={productRoomTypes}
              onChange={onHandlerSetRoomTypes}
              options={room_types}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              isClearable
              className="w-1/2"
              placeholder="Select Room Types"
            ></Select>
          )}
        </div>

        <div className="flex justify-between mb-3 gap-2">
          {artists && userRole == "super_admin" && (
            <Select
              value={artist}
              onChange={onHandlerSetArtists}
              options={artists}
              getOptionLabel={(option) =>
                option.first_name + " " + option.last_name
              }
              getOptionValue={(option) =>
                option.first_name + " " + option.last_name
              }
              className="w-1/2"
              isClearable
              placeholder="Select Artist"
            ></Select>
          )}

          {designers && (
            <Select
              value={designer}
              onChange={onHandlerSetDesigners}
              options={designers}
              getOptionLabel={(option) =>
                option.first_name + " " + option.last_name
              }
              getOptionValue={(option) =>
                option.first_name + " " + option.last_name
              }
              className="w-1/2"
              isClearable
              placeholder="Select Designer"
            ></Select>
          )}
        </div>

        <div className="flex justify-between mb-3 gap-2">
          {artists && (
            <Select
              value={style}
              onChange={onHandlerSetStyles}
              options={styles}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              className="w-1/2"
              isClearable
              placeholder="Select Style"
            ></Select>
          )}

          {materials && (
            <Select
              value={material}
              onChange={onHandlerSetMaterial}
              options={materials}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              className="w-1/2"
              isClearable
              placeholder="Select Material"
            ></Select>
          )}
        </div>

        <div className="text-end">
          <Button className="px-20">Create</Button>
        </div>
      </form>
    </>
  );
};

export default Forms;
