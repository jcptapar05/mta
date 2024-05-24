"use client";
import React, { useEffect, useState } from "react";
import Sizes from "./SizesFilter";
import Categories from "./CategoriesFIlter";
import getURL from "@/middleware/getUrl";

const Filter = () => {
  const [categories, setCategories] = useState();
  const [palettes, setPalettes] = useState();
  const [frame_sizes, setFrameSizes] = useState();
  const [tags, setTags] = useState();
  const [room_types, setRoomTypes] = useState();
  const [artists, setArtists] = useState();
  const [designers, setDesigners] = useState();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetch(getURL("/api/v1/admin/categories"), {
        cache: "no-cache",
      });
      const categories = await data.json();
      setCategories(categories.categories);
    };

    const getPalettes = async () => {
      const data = await fetch(getURL("/api/v1/admin/palettes"), {
        cache: "no-cache",
      });
      const palettes = await data.json();
      setPalettes(palettes.palettes);
    };

    const getFrameSizes = async () => {
      const data = await fetch(getURL("/api/v1/admin/frame_sizes"), {
        cache: "no-cache",
      });
      const frame_sizes = await data.json();
      setFrameSizes(frame_sizes.frame_sizes);
    };

    const getRoomTypes = async () => {
      const data = await fetch(getURL("/api/v1/admin/room_types"), {
        cache: "no-cache",
      });
      const room_types = await data.json();
      setRoomTypes(room_types.room_types);
    };

    const getArtists = async () => {
      const data = await fetch(getURL("/api/v1/admin/artists"), {
        cache: "no-cache",
      });
      const artists = await data.json();
      setArtists(artists.artists);
    };

    const getDesigners = async () => {
      const data = await fetch(getURL("/api/v1/admin/designers"), {
        cache: "no-cache",
      });
      const designers = await data.json();
      setDesigners(designers.designers);
    };

    getCategories();
    getRoomTypes();
    getFrameSizes();
    getPalettes();
    getArtists();
    getDesigners();
  }, []);

  const handleCategories = (item) => {
    // console.log(item[0].name);
  };

  return (
    <div className="flex justify-between items-center mt-8">
      <div className="flex flex-col">
        <p className="mb-2">Filter by</p>
        <div className="flex justify-around space-x-3">
          <Categories
            placeholdername="Category"
            categories={categories}
            handleCategories={handleCategories}
          ></Categories>
        </div>
      </div>

      <div className="border-s-2 border-slate-700 mx-2 h-[60px]"></div>

      <div className="flex flex-col">
        <p className="mb-2">Sort by</p>
        <div>
          <Categories placeholdername="Date"></Categories>
        </div>
      </div>

      <div className="border-s-2 border-slate-700 mx-2 h-[60px]"></div>

      <div>
        <p>Showing 2</p>
        <p>1 2 3 4</p>
      </div>
    </div>
  );
};

export default Filter;
