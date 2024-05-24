"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PaginationItems from "./PaginationItems";
import getURL from "@/middleware/getUrl";
import { Separator } from "@/components/ui/separator";
import Select from "react-select";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import ContentLoad from "@/components/loader/ContentLoad";

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const showItem = [
  { value: 15, label: 15 },
  { value: 30, label: 30 },
  { value: 60, label: 60 },
  { value: 120, label: 120 },
];

function PaginatedItems({ itemsPerPage }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [categories, setCategories] = useState(null);
  const [styles, setStyles] = useState(null);

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [stylesOptions, setStylesOptions] = useState([]);
  const [limit, setLimit] = useState(15);
  const [productsLength, setProductsLength] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  let endOffset = itemOffset + limit;
  let currentItems;
  let pageCount = Math.ceil(products.length / limit);

  currentItems = products.slice(itemOffset, endOffset);

  const handleCategoriesChange = (e) => {
    if (e.name == "All") {
      setCategories(null);
      setCurPage(0);
      setItemOffset(0);
      return;
    }
    setItemOffset(0);
    setCurPage(0);
    setCategories(e.name);
    return;
  };

  const handleStylesChange = (e) => {
    // console.log(e.name);
    if (e.name == "All") {
      setStyles(null);
      setCurPage(0);
      setItemOffset(0);
      return;
    }

    setCurPage(0);
    setStyles(e.id);
    setItemOffset(0);
    return;
  };

  const handleLimitChange = (e) => {
    setLimit((prev) => (prev = e.value));
    setCurPage(0);
    setItemOffset(0);
    return;
  };

  const handlePageClick = (event) => {
    setCurPage(event.selected);
    const newOffset = (event.selected * limit) % products.length;
    setItemOffset(newOffset);
    window.scrollTo({
      top: 400,
      left: 0,
      behavior: "smooth",
    });
    setInputToggle((prev) => (prev = false));
  };

  const [inputToggle, setInputToggle] = useState(false);

  const onClickMe = (e) => {
    e.stopPropagation();
    setInputToggle((prev) => (prev = !prev));
  };

  const pagerItemCount = [];

  // console.log(Math.round(products.length / limit), "TEST PAGE");

  for (let i = 0; products.length / limit > i; i++) {
    const val = {
      value: i,
      label: i + 1,
    };
    pagerItemCount.push(val);
  }

  const handleChangePager = (val) => {
    setCurPage(val.value);
    const newOffset = (val.value * limit) % products.length;
    setItemOffset(newOffset);
    window.scrollTo({
      top: 400,
      left: 0,
      behavior: "smooth",
    });
    setInputToggle((prev) => (prev = false));
  };

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: "none",
      borderRadius: 0,
      fontSize: "12px",
      padding: 0,
      width: "80px",
      border: 0,
      background: "#F6F6F6",
    }),
    option: (provided, state) => ({
      ...provided,
      width: "80px",
      paddingRight: 0,
      fontSize: "10px",
    }),
    menuList: (base) => ({
      ...base,
      height: "200px",
      "::-webkit-scrollbar": {
        width: "9px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f0f0f0",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#ccc",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          getURL(
            `/api/v1/public/products?limit=10000000&page=1${
              categories != null ? "&categories=" + categories : ""
            }${styles != null ? "&styles=" + styles : ""}`,
          ),
        );
        const data = await response.json();
        setProducts(data?.products);
        setProductsLength(data.products.length);
      } catch (err) {
        console.log(err);
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

    getProducts();
    getCategories();
    getStyles();
  }, [categories, styles]);

  return (
    <div className="sm:container my-20 px-2">
      <div className="flex items-center justify-between flex-col md:flex-row gap-y-4 md:gap-y-0">
        <div className="flex gap-2">
          <div className="container flex items-end gap-4">
            <div>
              <p className="mb-2">Filter by</p>
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
            </div>
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
        <div>
          <div className="flex items-center text-sm justify-end mb-4">
            <span>Showing</span>
            <Select
              className="w-[100px] mx-2"
              onChange={handleLimitChange}
              options={showItem}
              placeholder="15"
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
                  width: "100px",
                  border: 0,
                  background: "#F6F6F6",
                }),
                option: (provided, state) => ({
                  ...provided,
                  width: "100px",
                  paddingRight: 0,
                  fontSize: "10px",
                }),
              }}
            />
            <span>of {productsLength} items</span>
          </div>
          <div className="paginate-container">
            <ReactPaginate
              breakLabel={
                <button
                  className="child"
                  onClick={onClickMe}
                >
                  ...
                </button>
              }
              nextLabel={<FiChevronRight className="text-xl" />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              activeClassName="pagivationActive"
              previousLabel={<FiChevronLeft className="text-xl" />}
              renderOnZeroPageCount={null}
              pageClassName="paginationItems"
              pageLinkClassName="paginationLink"
              containerClassName="paginationContainer"
              nextClassName="paginationNext"
              previousClassName="paginationPrev"
              forcePage={curPage}
            />
          </div>
          {inputToggle && (
            <div className="mt-2 md:ms-20">
              <Select
                className="w-[100px] mx-2"
                onChange={handleChangePager}
                options={pagerItemCount}
                placeholder="Page"
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={selectStyles}
              />
            </div>
          )}
        </div>
      </div>
      <Separator className="my-10 bg-[#ABABAB]"></Separator>
      {!loading ? (
        <PaginationItems currentItems={currentItems} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4">
          <ContentLoad></ContentLoad>
          <ContentLoad></ContentLoad>
          <ContentLoad></ContentLoad>
        </div>
      )}
      <div className="container mt-10 flex justify-center md:justify-end flex-col items-center md:items-end">
        <div className="paginate-container">
          <ReactPaginate
            breakLabel={
              <button
                className="child"
                onClick={onClickMe}
              >
                ...
              </button>
            }
            nextLabel={<FiChevronRight className="text-xl" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            activeClassName="pagivationActive"
            previousLabel={<FiChevronLeft className="text-xl" />}
            renderOnZeroPageCount={null}
            pageClassName="paginationItems"
            pageLinkClassName="paginationLink"
            containerClassName="paginationContainer"
            nextClassName="paginationNext"
            previousClassName="paginationPrev"
            forcePage={curPage}
          />
        </div>
        {inputToggle && (
          <div className="mt-3 md:me-5">
            <Select
              className="w-[100px]"
              onChange={handleChangePager}
              options={pagerItemCount}
              placeholder="Page"
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={selectStyles}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginatedItems;
