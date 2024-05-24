"use client";
import React, { useEffect, useState } from "react";
import EditProductForm from "./EditProductForm";
import getURL from "@/middleware/getUrl";

const EditProduct = ({ item }) => {
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

    const getStyles = async () => {
      const data = await fetch(getURL("/api/v1/admin/styles"), {
        cache: "no-cache",
      });
      const styles = await data.json();
      setStyles(styles.styles);
    };

    const getMaterials = async () => {
      const data = await fetch(getURL("/api/v1/admin/materials"), {
        cache: "no-cache",
      });
      const materials = await data.json();
      setMaterials(materials.materials);
    };

    // const getTags = async () => {
    //  const data = await fetch(getURL("/api/v1/admin/tags"), {
    //   cache: "no-cache",
    //  });
    //  const tags = await data.json();
    //  setTags(tags.tags);
    // };

    getCategories();
    // getTags();
    getRoomTypes();
    getFrameSizes();
    getPalettes();
    getArtists();
    getDesigners();
    getStyles();
    getMaterials();
  }, []);

  const [categories, setCategories] = useState();
  const [palettes, setPalettes] = useState();
  const [frame_sizes, setFrameSizes] = useState();
  const [tags, setTags] = useState();
  const [room_types, setRoomTypes] = useState();
  const [artists, setArtists] = useState();
  const [designers, setDesigners] = useState();
  const [styles, setStyles] = useState();
  const [materials, setMaterials] = useState();

  return (
    <div>
      <EditProductForm
        categories={categories}
        palettes={palettes}
        frame_sizes={frame_sizes}
        tags={tags}
        room_types={room_types}
        artists={artists}
        designers={designers}
        styles={styles}
        materials={materials}
        item={item}
      ></EditProductForm>
    </div>
  );
};

export default EditProduct;
