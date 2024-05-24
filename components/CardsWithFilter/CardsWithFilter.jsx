"use client";
import React, { useState, useEffect } from "react";
import { ComboboxUI } from "../ui/combobox";
import CategorySelector from "../state/categorySelector";
import getURL from "@/middleware/getUrl";

const CardsWithFilter = () => {
 const [products, setProducts] = useState([]);
 const [categories, setCategories] = useState([]);
 const [roomTypes, setRoomTypes] = useState([]);
 useEffect(() => {
  const fetchProducts = async () => {
   try {
    const response = await fetch(getURL("/api/v1/public/products"));
    const data = await response.json();
    setProducts(data.products);
   } catch (error) {
    console.error("Error fetching data:", error);
   }
  };
  const fetchCategories = async () => {
   try {
    const response = await fetch(getURL("/api/v1/public/categories"));
    const data = await response.json();
    setCategories(data.categories);
   } catch (error) {
    console.error("Error fetching data:", error);
   }
  };
  const fetchRoomTypes = async () => {
   try {
    const response = await fetch(getURL("/api/v1/public/room_types"));
    const data = await response.json();
    setRoomTypes(data.room_types);
   } catch (error) {
    console.error("Error fetching data:", error);
   }
  };
  fetchRoomTypes();
  fetchProducts();
  fetchCategories();
 }, []);

 const categoriesData = [
  {
   value: "abstract",
   label: "Abstract",
  },
  {
   value: "animals",
   label: "Animals",
  },
  {
   value: "architectural",
   label: "Architectural",
  },
  {
   value: "cartoon",
   label: "Cartoon",
  },
  {
   value: "city",
   label: "City",
  },
  {
   value: "creative",
   label: "Creative",
  },
  {
   value: "figure",
   label: "Figure",
  },
  {
   value: "landscape",
   label: "Landscape",
  },
  {
   value: "plants",
   label: "Plants",
  },
  {
   value: "sea & sky",
   label: "Sea & Sky",
  },
 ];
 const sizesData = [
  {
   value: "small",
   label: "60 x 90",
  },
  {
   value: "medium",
   label: "80 x 80",
  },
 ];
 const cardsData = [
  {
   title: "Card 1",
   price: "$10",
   description: "This is a description for card 1.",
   img: "/extrawide.png",
   categories: ["Abstract", "Animals", "Architectural"],
   sizes: ["small", "medium"],
  },
  {
   title: "Card 2",
   price: "$15",
   description: "This is a description for card 2.",
   img: "/painting.png",
   categories: ["Cartoon", "City", "Creative"],
   sizes: ["small", "medium"],
  },
  {
   title: "Card 3",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/wallart.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["small"],
  },
  {
   title: "Card 4",
   price: "$20",
   description: "This is a description for card 3.",
   img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 5",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/wallart.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 6",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/wallart.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 7",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/painting.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 8",
   price: "$20",
   description: "This is a description for card 3.",
   img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 9",
   price: "$20",
   description: "This is a description for card 3.",
   img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 10",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/wallart.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 10",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/wallart.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 11",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/wallart.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 12",
   price: "$20",
   description: "This is a description for card 3.",
   img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 13",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/painting.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 14",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/painting.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 15",
   price: "$20",
   description: "This is a description for card 3.",
   img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 16",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/wallart.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 17",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/wallart.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 18",
   price: "$20",
   description: "This is a description for card 3.",
   img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 19",
   price: "$20",
   description: "This is a description for card 3.",
   img: "/extrawide.png",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
  {
   title: "Card 20",
   price: "$20",
   description: "This is a description for card 3.",
   img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
   categories: ["Landscape", "Plants", "Creative"],
   sizes: ["medium"],
  },
 ];
 const [selectedCategory, setSelectedCategory] = useState("");
 const [selectedSize, setSelectedSize] = useState("");

 const handleSelectedCategory = (value) => {
  setSelectedCategory(value);
 };
 const handleSelectedSize = (value) => {
  setSelectedSize(value);
 };
 return (
  <div className="m-32">
   <p>
    Homepage - <strong>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</strong>
   </p>
   <div className="flex justify-between items-center">
    <p className="text-2xl font-bold">Painting</p>
    <ComboboxUI
     items={categoriesData}
     value={selectedCategory}
     onItemSelect={handleSelectedCategory}
     placeholder={"Category"}
    />
   </div>
   <ComboboxUI
    items={sizesData}
    value={selectedSize}
    placeholder="Size"
    onItemSelect={handleSelectedSize}
   />
   <CategorySelector
    cards={cardsData}
    selectedCategory={selectedCategory}
    selectedSize={selectedSize}
   />
  </div>
 );
};

export default CardsWithFilter;
