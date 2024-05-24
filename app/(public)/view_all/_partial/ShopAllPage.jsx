"use client";
import React, { useState, useEffect } from "react";
import cardData from "../../data";
import Card from "@/components/card/Card";
import { useShop } from "@/app/_utils/ShopProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { ComboboxUI } from "@/components/ui/combobox";
import { useCartStore } from "@/store/cartStore";

const menuData = [
  {
    label: "Room Types",
    value: "roomTypes",
    items: [
      { label: "Entrance", value: "entrance" },
      { label: "Lobby", value: "lobby" },
      { label: "Corridor", value: "corridor" },
      { label: "Elevator lobby", value: "elevator lobby" },
      { label: "Entertainment", value: "entertainment" },
      { label: "Fitness", value: "fitness" },
      { label: "Restaurant", value: "restaurant" },
    ],
  },
  {
    label: "Category",
    value: "categories",
    items: [
      { label: "Abstract", value: "abstract" },
      { label: "Animals", value: "animals" },
      { label: "Architectural", value: "architectural" },
      { label: "Cartoon", value: "cartoon" },
      { label: "City", value: "city" },
      { label: "Creative", value: "creative" },
      { label: "Figure", value: "figure" },
      { label: "Landscape", value: "landscape" },
      { label: "Plants", value: "plants" },
      { label: "Sea & Sky", value: "sea sky" },
    ],
  },
  {
    label: "Designer",
    value: "designer",
    items: [
      { label: "Jack", value: "jack" },
      { label: "Fred", value: "fred" },
      { label: "Eva", value: "eva" },
      { label: "Leonardo", value: "leonardo" },
    ],
  },
  {
    label: "Featured Artist",
    value: "artist",
    items: [
      { label: "Bob Smith", value: "bob smith" },
      { label: "David", value: "david" },
      { label: "Frank", value: "frank" },
      { label: "Jane Smith", value: "jane smith" },
    ],
  },
  {
    label: "Color",
    value: "primaryColors",
    items: [
      { label: "Cyan", value: "D1E8E2" },
      { label: "Pastel Peach", value: "FFC3A0" },
      { label: "Spring Green", value: "33FF57" },
      { label: "Pastel Pink", value: "FFC5EA" },
    ],
  },
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ShopAllPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageRatios, setImageRatios] = useState({});
  const [filteredCards, setFilteredCards] = useState(cardData);
  const { selectedFilter, setSelectedFilter } = useShop();
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedType, setSelectedType] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(0);
  const [categoryFilteredCards, setCategoryFilteredCards] = useState(cardData);

  function getQueryParams() {
    if (typeof window === "undefined") return { type: null, value: null };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get("type") || "";
    setSelectedType(type);
    return {
      type,
      value: urlParams.get("value") || null,
    };
  }

  useEffect(() => {
    const { type, value } = selectedFilter;

    let filtered = cardData;

    if (type && value) {
      filtered = filtered.filter((card) => {
        if (["roomTypes", "categories", "primaryColors"].includes(type)) {
          return card[type]?.some(
            (item) => item?.toLowerCase() === value.toLowerCase(),
          );
        } else if (["designer", "artist"].includes(type)) {
          return card[type]?.toLowerCase() === value.toLowerCase();
        }
        return true;
      });
    }

    setCategoryFilteredCards(filtered);

    if (selectedSize && selectedSize !== "All") {
      filtered = filtered.filter(
        (card) => card.sizesAvailable === selectedSize,
      );
    }

    setFilteredCards(filtered);
  }, [selectedFilter, selectedSize]);

  useEffect(() => {
    categoryFilteredCards.forEach((card) => {
      const img = new Image();
      img.src = card.img;

      img.onload = function () {
        const aspectRatio = this.width / this.height;
        setImageRatios((prevRatios) => ({
          ...prevRatios,
          [card.img]: aspectRatio,
        }));
      };
    });

    const sizes = [
      { value: "All", label: "All" },
      ...Array.from(
        new Set(categoryFilteredCards.map((card) => card.sizesAvailable)),
      ),
    ]
      .filter((size) => typeof size !== "object" || size.value !== "All")
      .map((size) =>
        typeof size === "string"
          ? { value: size, label: capitalizeFirstLetter(size) }
          : size,
      );

    setAvailableSizes(sizes);
  }, [categoryFilteredCards]);

  useEffect(() => {
    const queryParams = getQueryParams();
    if (queryParams.type && queryParams.value) {
      setSelectedFilter(queryParams);
    }
    setIsLoading(false);
  }, []);

  function getItemsForSelectedType(type) {
    const selectedMenu = menuData.find((item) => item.value === type);
    const items = selectedMenu ? selectedMenu.items : [];
    return items.filter((item) => item.value !== "All");
  }

  function updateFilterAndURL(type, value) {
    setSelectedFilter({ type, value });
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("type", type);
    queryParams.set("value", value);
    const newURL = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({}, "", newURL);
  }
  function getSelectedCategoryLabel() {
    const selectedCategory = getItemsForSelectedType(selectedType).find(
      (item) => item.value === selectedCategories,
    );
    return selectedCategory ? selectedCategory.label : "";
  }
  return (
    <div className="grid grid-cols-4 items-center justify-center gap-8 w-[80%]">
      <div className="col-span-4 flex flex-col gap-4">
        <p>
          Homepage{" "}
          {getSelectedCategoryLabel() ? (
            <strong>- {getSelectedCategoryLabel()}</strong>
          ) : (
            ""
          )}
        </p>
        <p className="text-3xl  font-bold">Painting</p>
      </div>
      <div className="col-span-4 flex justify-between">
        {filteredCards.length === 0 && <div style={{ flex: "1" }}></div>}
        {filteredCards.length > 0 && (
          <ComboboxUI
            items={availableSizes}
            value={selectedSize}
            placeholder="Size"
            disableSearch={true}
            onItemSelect={(item) => {
              setSelectedSize(item);
            }}
          />
        )}
        <ComboboxUI
          items={getItemsForSelectedType(selectedType)}
          value={selectedCategories}
          placeholder="Select"
          disableSearch={true}
          onItemSelect={(item) => {
            setSelectedCategories(item);
            updateFilterAndURL(selectedType, item);
            setSelectedSize("All");
          }}
          showAllItem={false}
        />
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredCards.length === 0 ? ( // Check if there are no cards available
        <div className="col-span-4 text-center">
          <p>No paintings available.</p>
        </div>
      ) : (
        filteredCards.map((card, index) => (
          <RenderCard
            card={card}
            key={index}
            index={index}
            imageRatios={imageRatios}
          />
        ))
      )}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="grid col-span-4 items-center justify-center gap-8">
    <Skeleton className=" h-96 w-[500px]" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>
);

const RenderCard = ({ card, index, imageRatios }) => {
  const aspectRatio = imageRatios[card.img];
  let gridClasses = "";

  if (aspectRatio) {
    if (aspectRatio < 1) {
      gridClasses = "col-span-2 row-span-2";
    } else if (aspectRatio >= 1 && aspectRatio < 2) {
      gridClasses = "col-span-2 row-span-1";
    } else {
      gridClasses = "col-span-4 row-span-1";
    }
  }
  const [cartItems, setCartItems] = useState([]);
  const increaseCount = useCartStore((state) => state.increaseCount);
  const addToCart = (product) => {
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const productExists = existingCartItems.some(
      (item) => item.id === product.id,
    );

    if (!productExists) {
      const updatedCart = [...existingCartItems, product];
      increaseCount();
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div
      className={`grid space-x-6 w-full h-fit  ${gridClasses}`}
      key={index}
    >
      <Card
        data={card}
        hideCategories
        hideRoomType
        hideStock
        hideArtist
        hideDesigner
        hideSizesAvailable
        addToCart={addToCart}
      />
    </div>
  );
};

export default ShopAllPage;
