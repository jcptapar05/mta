"use client";
import getURL from "@/middleware/getUrl";
import React, { useEffect, useState } from "react";
import List from "./List";
import Select from "react-select";
import { Separator } from "@/components/ui/separator";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiSlidersHorizontalThin,
} from "react-icons/pi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ContentLoad from "@/components/loader/ContentLoad";

const showItem = [
  { value: 9, label: 9 },
  { value: 15, label: 15 },
  { value: 20, label: 20 },
  { value: 30, label: 30 },
  { value: 50, label: 50 },
];

const Lists = () => {
  const [products, SetProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [sortBy, setSortBy] = useState("date");
  const [categories, setCategories] = useState(null);
  const [palettes, setPalettes] = useState(null);
  const [frameSizes, setFrameSizes] = useState(null);
  const [roomTypes, setRoomTypes] = useState(null);
  const [artists, setArtists] = useState(null);
  const [styles, setStyles] = useState(null);

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [frameSizesOptions, setFrameSizesOptions] = useState([]);
  const [stylesOptions, setStylesOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productsLength, setProductsLength] = useState(0);

  const handleChange = (e) => {
    setLimit(e.value);
  };

  const handleCategoriesChange = (e) => {
    if (e.name == "All") {
      setCategories(null);
      setCurrentPage((prev) => (prev = 1));
      return;
    }
    setCurrentPage((prev) => (prev = 1));
    setCategories(e.name);
  };

  const handlePalettesChange = (e) => {
    if (e.name == "All") {
      setPalettes(null);
      return;
    }

    setPalettes(e.name);
  };

  const handleRoomTypesChange = (e) => {
    if (e.name == "All") {
      setRoomTypes(null);
      return;
    }

    setRoomTypes(e.name);
  };

  const handleFrameSizesChange = (e) => {
    if (e.name == "All") {
      setFrameSizes(null);
      setCurrentPage((prev) => (prev = 1));
      return;
    }
    setCurrentPage((prev) => (prev = 1));
    setFrameSizes(e.name);
  };

  const handleStylesChange = (e) => {
    if (e.name == "All") {
      setStyles(null);
      setCurrentPage((prev) => (prev = 1));
      return;
    }
    setCurrentPage((prev) => (prev = 1));
    setStyles(e.name);
  };

  const handleArtistsChange = (e) => {
    if (e.full_name == "All") {
      setArtists(null);
      setCurrentPage((prev) => (prev = 1));
      return;
    }
    setCurrentPage((prev) => (prev = 1));
    setArtists(e.full_name);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.value);
    setCurrentPage((prev) => (prev = 1));
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          getURL(
            `/api/v1/public/products?limit=${limit}&page=${currentPage}&sort=${sortBy}${
              categories != null ? "&categories=" + categories : ""
            }${palettes != null ? "&palettes=" + palettes : ""}${
              frameSizes != null ? "&frame_sizes=" + frameSizes : ""
            }${roomTypes != null ? "&room_types=" + roomTypes : ""}${
              artists != null ? "&artists=" + artists : ""
            }${styles != null ? "&styles=" + styles : ""}`,
          ),
        );
        const data = await response.json();
        if (data.products) {
          SetProducts(data?.products);

          setProductsLength(data?.productsLen);
        }
      } finally {
        setLoading(false);
      }
    };

    const getCategories = async () => {
      const data = await fetch(getURL("/api/v1/public/categories"), {
        cache: "no-cache",
      });
      const categories = await data.json();

      if (categories?.categories) {
        const all = { id: 0, name: "All" };
        const allData = [all, ...categories?.categories];
        setCategoriesOptions(allData);
      }
    };
    const getFrameSizes = async () => {
      const data = await fetch(getURL("/api/v1/public/frame_sizes"), {
        cache: "no-cache",
      });
      const frame_sizes = await data.json();

      if (frame_sizes?.frame_sizes) {
        const all = { id: 0, name: "All" };
        const allData = [all, ...frame_sizes?.frame_sizes];

        setFrameSizesOptions(allData);
      }
    };

    const getStyles = async () => {
      const data = await fetch(getURL("/api/v1/public/styles"), {
        cache: "no-cache",
      });
      const stylesData = await data.json();
      if (stylesData?.styles) {
        const all = { id: 0, name: "All" };
        const allData = [all, ...stylesData?.styles];

        setStylesOptions(allData);
      }
    };
    getCategories();
    getFrameSizes();
    getStyles();
    getProducts();
  }, [
    limit,
    currentPage,
    sortBy,
    styles,
    categories,
    palettes,
    frameSizes,
    roomTypes,
    artists,
  ]);

  return (
    <div className="mt-10">
      <div className="flex items-center flex-col md:flex-row gap-4 md:gap-0 justify-between">
        {/* Filter */}
        <div className="hidden md:flex items-center">
          <p className="mb-4 md:mb-2 me-4">Filter by</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 md:mb-0">
            {categoriesOptions.length > 0 && (
              <Select
                onChange={handleCategoriesChange}
                options={categoriesOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                placeholder="Category"
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderRadius: 0,
                    padding: "4px",
                    minWidth: "150px",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    width: "100%",
                  }),
                }}
              />
            )}
            {stylesOptions.length > 0 && (
              <Select
                onChange={handleStylesChange}
                options={stylesOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                placeholder="Style"
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderRadius: 0,
                    padding: "4px",
                    minWidth: "130px",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                  }),
                }}
              />
            )}
          </div>
        </div>

        <div className="block md:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="uppercase"
              >
                Filter
                <PiSlidersHorizontalThin
                  className="ms-3"
                  size={24}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div>
                <p className="mb-4 md:mb-2 me-4">Filter by</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 md:mb-0">
                  <Select
                    onChange={handleCategoriesChange}
                    options={categoriesOptions}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    placeholder="Category"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        boxShadow: "none",
                        borderRadius: 0,
                        padding: "4px",
                        minWidth: "150px",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        width: "100%",
                      }),
                    }}
                  />
                  <Select
                    onChange={handleStylesChange}
                    options={stylesOptions}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.name}
                    placeholder="Style"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        boxShadow: "none",
                        borderRadius: 0,
                        padding: "4px",
                        minWidth: "130px",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                      }),
                    }}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pagination */}
        <div className="flex items-center md:items-start md:flex-col md:mt-0 space-x-5 md:space-x-0">
          <div className="flex items-center text-sm">
            <span>Showing</span>
            <Select
              className="w-[70px] mx-2"
              onChange={handleLimitChange}
              options={showItem}
              placeholder="9"
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: "none",
                  borderRadius: 0,
                  fontSize: "12px",
                  padding: 0,
                  width: "70px",
                  border: 0,
                  background: "#F6F6F6",
                }),
                option: (provided, state) => ({
                  ...provided,
                  width: "70px",
                  paddingRight: 0,
                  fontSize: "10px",
                }),
              }}
            />
            <span>of {productsLength} items</span>
          </div>

          <div className="flex items-center md:mt-4 space-x-6 justify-end text-end w-full">
            <div
              className={`mt-2 ${currentPage > 1 ? "visible" : "invisible"} `}
            >
              <button onClick={prevPage}>
                <PiCaretLeftBold size={20} />
              </button>
            </div>
            <div>
              <p>{currentPage}</p>
            </div>
            <div>
              <button
                onClick={nextPage}
                className={`mt-2 ${
                  limit > products?.length || productsLength <= products?.length
                    ? "invisible"
                    : "visible"
                }`}
              >
                <PiCaretRightBold size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8 bg-black"></Separator>
      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4">
            <ContentLoad></ContentLoad>
            <ContentLoad></ContentLoad>
            <ContentLoad></ContentLoad>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4">
            {products.length > 0 &&
              products.map((product) => (
                <List
                  key={product.id}
                  product={product}
                ></List>
              ))}

            {products.length <= 0 && (
              <div className="text-center">
                <p className="text-2xl">Sorry no art found!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="flex items-center mt-4 space-x-6 justify-end">
          <div className={`mt-2 ${currentPage > 1 ? "visible" : "invisible"} `}>
            <button onClick={prevPage}>
              <PiCaretLeftBold size={20} />
            </button>
          </div>
          <div>
            <p>{currentPage}</p>
          </div>
          <div>
            <button
              onClick={nextPage}
              className={`mt-2 ${
                limit > products?.length || productsLength <= products?.length
                  ? "invisible"
                  : "visible"
              }`}
            >
              <PiCaretRightBold size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
