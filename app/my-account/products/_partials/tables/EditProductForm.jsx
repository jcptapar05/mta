"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Select from "react-select";
import Color, { Palette, usePalette, useColor } from "color-thief-react";
import getURL from "@/middleware/getUrl";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { FaPencil } from "react-icons/fa6";

const EditProductForm = ({
  categories,
  palettes,
  frame_sizes,
  room_types,
  artists,
  designers,
  styles,
  materials,
  item,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const { toast } = useToast();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadingMessage, setUploadingMessage] = useState("Uploading!");

  const [name, setName] = useState(item.name || "");
  const [description, setDescription] = useState(item.description || "");
  const [price, setPrice] = useState(item.price || "");
  const [photo, setPhoto] = useState("");
  const [photoThumbail, setPhotoThumbnail] = useState("");
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
  const [weight, setWeight] = useState(item.weight || "");
  const [ar, setAr] = useState("");
  const [nftUrl, setNftUrl] = useState("");
  const [isNft, setIsNft] = useState(false);
  const [isActive, setIsActive] = useState(item?.active);
  const [isSet, setIsSet] = useState(item.is_set || false);
  const [isSetOf, setIsSetOf] = useState(item.set_of || "");
  const [preview, setPreview] = useState();

  const { data: colrs } = usePalette(preview, 10, "hex", {
    crossOrigin: "*",
    quality: 10,
  });

  const colorsSplice = [];

  if (colrs?.length > 0) {
    for (let i = 0; 3 > i; i++) {
      colorsSplice.push(colrs[i]);
    }
  }

  const toggleNftHandler = () => {
    setIsNft((prev) => !prev);
  };

  const toggleIsActiveHandler = () => {
    setIsActive((prev) => !prev);
  };

  const toggleIsSetHandler = () => {
    setIsSet((prev) => !prev);
  };

  const photoChangeHandler = (e) => {
    setPhoto(e.target.files);
  };

  const photoThumbnailChangeHandler = (e) => {
    setPhotoThumbnail(e.target.files?.[0]);
  };

  const videoChangeHandler = (e) => {
    setVideo(e.target.files?.[0]);
  };

  const glbChangeHandler = (e) => {
    setGlbFile(e.target.files?.[0]);
  };

  const productImgChangeHandler = (e) => {
    setProductImg(e.target.files);
  };

  const onHandlerSetPalettes = (val) => {
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

    // const productPalettesData = [];
    // for (let i = 0; productPalettes.length > i; i++) {
    //   productPalettesData.push({ id: productPalettes[i].id });
    // }

    // const productCategoriesData = [];
    // for (let i = 0; productCategories.length > i; i++) {
    //   productCategoriesData.push({ id: productCategories[i].id });
    // }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("in_stock", true);
    formData.append("categoryId", productCategories.id);
    // formData.append("paletteId", JSON.stringify(productPalettesData));
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
    formData.append("isActive", isActive);
    formData.append("is_set", isSet);
    formData.append("is_set_of", isSetOf);
    formData.append("weight", weight);
    formData.append("ar", ar);
    formData.append("thumbnails", photoThumbail);
    formData.append("pricesId", item?.priceId || "none");
    // Gallery
    for (let i = 0; productImg.length > i; i++) {
      formData.append(`product_img${i}`, productImg[i]);
    }
    formData.append("productImgLen", productImg.length);
    // formData.append("photo", photo);
    // ProductPhoto
    for (let i = 0; photo.length > i; i++) {
      formData.append(`product_photo${i}`, photo[i]);
    }
    formData.append("productPhotoLen", photo.length);

    setIsUploading(true);
    setUploadingMessage((prev) => (prev = "Uploading"));

    formData.append("colors", JSON.stringify(colorsSplice));

    const res = await fetch(getURL(`/api/v1/admin/products/${item.id}`), {
      next: {
        revalidate: 5,
      },
      method: "PATCH",
      body: formData,
    });

    const dataRes = await res?.json();

    if (res.ok && dataRes.product == "Success") {
      if (!dataRes.videoSrc && !dataRes.glbFilesrc) {
        toast({
          title: "Successfully updated!",
        });

        setIsUploading((prev) => (prev = false));

        // window.location.reload();
      } else {
        let videoResponse;
        let glbResponse;

        if (dataRes?.videoSrc) {
          videoResponse = await fetch(dataRes.videoSrc, {
            method: "PUT",
            body: video,
            // headers: { "Content-Type": video.type },
          });
        }

        if (dataRes?.glbFilesrc) {
          glbResponse = await fetch(dataRes.glbFilesrc, {
            method: "PUT",
            body: glbFile,
            // headers: { "Content-Type": glbFile.type },
          });
        }

        if (dataRes?.videoSrc && videoResponse?.ok && !dataRes?.glbFilesrc) {
          toast({
            title: "Successfully Added!",
          });

          setIsUploading((prev) => (prev = false));
          // window.location.reload();
        }

        if (dataRes?.glbFilesrc && glbResponse?.ok && !dataRes?.videoSrc) {
          toast({
            title: "Successfully Added!",
          });

          setIsUploading((prev) => (prev = false));
          // window.location.reload();
        }

        if (
          dataRes?.videoSrc &&
          videoResponse.ok &&
          dataRes?.glbFilesrc &&
          glbResponse.ok
        ) {
          toast({
            title: "Successfully Added!",
          });

          setIsUploading((prev) => (prev = false));
          // window.location.reload();
        }
      }
    }
  };

  useEffect(() => {
    if (!photoThumbail) {
      return;
    }

    const objectUrl = URL?.createObjectURL(photoThumbail);
    setPreview(objectUrl);
  }, [photoThumbail]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="uppercase"
            variant="ghost"
            size="icon"
          >
            <FaPencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[900px]">
          <form
            onSubmit={submit}
            className="mx-auto"
            encType="multipart/form-data"
          >
            <p className="font-bold text-2xl mb-8">Add your artwork</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 w-full mb-5">
              <div className="flex flex-col space-y-1.5">
                <Label>What's the title of this Artwork?</Label>
                <Input
                  placeholder="Artwork Title *"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* 
              <div className="flex flex-col space-y-1.5">
                <Label>Enter Art Price</Label>
                <Input
                  placeholder="Enter price"
                  value={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div> */}

              {/* <div className="flex flex-col space-y-1.5">
                <Label>Enter Art Weight</Label>
                <Input
                  placeholder="Enter weight"
                  value={weight}
                  type="number"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div> */}

              <div className="flex flex-col space-y-1.5">
                <Label>What's the description of this Artwork?</Label>
                <Textarea
                  placeholder="Enter description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="uploadPhoto">Upload product thumbnail</Label>
                <Input
                  id="uploadPhoto"
                  accept="image/*"
                  type="file"
                  onChange={photoThumbnailChangeHandler}
                />
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

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="uploadPhoto">
                  Upload Product images (Actual Photo)
                </Label>
                <Input
                  id="uploadPhoto"
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={photoChangeHandler}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="uploadProductImg">
                  Wall Art Mockup (Art work with background)
                </Label>
                <Input
                  id="uploadProductImg"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={productImgChangeHandler}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Select Video</Label>
                <Input
                  placeholder="Enter video link"
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={videoChangeHandler}
                />
              </div>
              {/* 
              <div className="flex flex-col space-y-1.5">
                <Label>Select Video</Label>
                <Input
                  placeholder="Enter video link"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                />
              </div> */}

              {/* <div className="flex flex-col space-y-1.5">
                <Label>AR Link</Label>
                <Input
                  placeholder="http:// or https://"
                  value={ar}
                  onChange={(e) => setAr(e.target.value)}
                />
              </div> */}

              {/* <div className="flex flex-row"> */}
              {/* <div className="flex flex-row items-center space-x-1.5 mb-1">
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
                </div> */}

              {/* {isNft && ( */}
              <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Label>Select 3D File</Label>
                  <Input
                    type="file"
                    accept=".glb,.obj, .gltf, .blend, .sldprt, .stp, .stl, .vrml"
                    onChange={glbChangeHandler}
                  />
                </div>
              </div>

              {/* <div className="grid w-full items-center mb-3">
                <div className="flex flex-col space-y-1.5">
                  <Label>Is your art work NFT?</Label>
                  <Input
                    placeholder="Enter NFT link"
                    value={nftUrl}
                    onChange={(e) => setNftUrl(e.target.value)}
                  />
                </div>
              </div> */}
              {/* )} */}

              {/* {!isNft && ( */}

              {/* )} */}
              {/* </div> */}

              {/* <div className="flex flex-col space-y-1.5">
                <Label>Enter Art Quantity</Label>
                <Input
                  placeholder="Enter quantity"
                  value={quantity}
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div> */}

              {/* {palettes && (
                <div className="flex flex-col space-y-1.5">
                  <Label>Select Art Dominant Colors</Label>
                  <Select
                    value={productPalettes}
                    onChange={onHandlerSetPalettes}
                    options={palettes}
                    closeMenuOnSelect={false}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    isMulti
                    isClearable
                    className="w-full"
                    placeholder="Select Palette"
                  ></Select>
                </div>
              )} */}

              {frame_sizes && (
                <div className="flex flex-col space-y-1.5">
                  <Label>Select Art Size</Label>
                  <Select
                    value={productFrameSizes}
                    onChange={onHandlerSetFrameSizes}
                    options={frame_sizes}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    className="w-full"
                    placeholder="Select Frame Size"
                    isClearable
                  ></Select>
                </div>
              )}

              {categories && (
                <div className="flex flex-col space-y-1.5">
                  <Label>Select Art Category</Label>
                  <Select
                    value={productCategories}
                    onChange={onHandlerSetCategories}
                    closeMenuOnSelect={false}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    className="w-full"
                    placeholder="Select Categories"
                  ></Select>
                </div>
              )}

              {/* {room_types && (
                <div className="flex flex-col space-y-1.5">
                  <Label>Select Art Room Types</Label>
                  <Select
                    value={productRoomTypes}
                    onChange={onHandlerSetRoomTypes}
                    options={room_types}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    isClearable
                    className="w-full"
                    placeholder="Select Room Types"
                  ></Select>
                </div>
              )} */}

              {styles && (
                <div className="flex flex-col space-y-1.5">
                  <Label>Select Art Style</Label>
                  <Select
                    value={style}
                    onChange={onHandlerSetStyles}
                    options={styles}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    className="w-full"
                    isClearable
                    placeholder="Select Style"
                  ></Select>
                </div>
              )}

              <div className="flex flex-col gap-y-1 justify-start space-x-1.5 mb-1">
                {/* <div className="flex gap-x-2">
                  <Checkbox
                    checked={isSet}
                    id="isSetOf"
                    onClick={toggleIsSetHandler}
                  />
                  <label
                    htmlFor="isSetOf"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Your art work is set?
                  </label>
                </div>

                {isSet && ( */}
                <Label>Set of</Label>
                <Input
                  type="number"
                  id="isSetOf"
                  placeholder="Enter set number"
                  value={isSetOf}
                  onChange={(e) => setIsSetOf(e.target.value)}
                />
                {/* )} */}
              </div>

              <div className="flex flex-col gap-y-2 justify-start space-x-1.5 mb-1">
                <div className="flex gap-x-2">
                  <Checkbox
                    id="isNftCheckbox"
                    onClick={toggleNftHandler}
                  />
                  <label
                    htmlFor="isNftCheckbox"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    is your art work NFT?
                  </label>
                </div>

                {isNft && (
                  <Input
                    placeholder="Enter NFT link"
                    value={nftUrl}
                    onChange={(e) => setNftUrl(e.target.value)}
                  />
                )}
              </div>

              <div className="flex gap-x-2">
                <Checkbox
                  id="isActiveCheckbox"
                  checked={isActive}
                  onClick={toggleIsActiveHandler}
                />
                <label
                  htmlFor="isActiveCheckbox"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  is your art work active?
                </label>
              </div>

              {/* {materials && (
                <div className="flex flex-col space-y-1.5">
                  <Label>Select Art Material</Label>
                  <Select
                    value={material}
                    onChange={onHandlerSetMaterial}
                    options={materials}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    className="w-full"
                    isClearable
                    placeholder="Select Material"
                  ></Select>
                </div>
              )} */}

              {/* {artists && userRole == "super_admin" && (
                <div className="flex flex-col space-y-1.5">
                  <Label>Select Artist</Label>
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
                    className="w-full"
                    isClearable
                    placeholder="Select Artist"
                  ></Select>
                </div>
              )} */}
            </div>

            {/* <div className="flex justify-between mb-3 gap-2">
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
                  className="w-full"
                  isClearable
                  placeholder="Select Designer"
                ></Select>
              )}
            </div> */}

            <div className="text-end">
              {/* <Button className="px-20">Create</Button> */}
              {!isUploading && <Button className="px-20">Update</Button>}
              {isUploading && (
                <div className="flex gap-5 justify-end items-center">
                  <p className="text-center text-blue-600">
                    {uploadingMessage}
                  </p>
                  <Button
                    className="px-20"
                    disabled
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Button>
                </div>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProductForm;

export const revalidate = 5;
