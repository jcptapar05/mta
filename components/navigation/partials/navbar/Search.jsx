"use client";
import React, { useState, useEffect } from "react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import getURL from "@/middleware/getUrl";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  const [, setCustomWidth] = useState(0);
  const [toggleLeave, setToggleLeave] = useState(false);
  const [, setPlaceholderSearch] = useState("");
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [isDisplaySearch, setIsDisplaySearch] = useState(false);

  const displaySearchHandler = () => {
    setIsDisplaySearch((prev) => (prev = !prev));
  };

  const handleOnSearch = async (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // console.log(result);
  };

  const handleOnSelect = (item) => {
    // console.log(item);
    router.push(`/view_all/${item.id}`, { scroll: false });
    setIsDisplaySearch((prev) => (prev = false));
  };

  const handleOnFocus = (e) => {
    setCustomWidth((prev) => (prev = window.innerWidth > 768 ? 200 : 120));
    setToggleLeave((prev) => (prev = true));
    setPlaceholderSearch((prev) => (prev = "Search..."));
  };

  const onClickOutsideListener = () => {
    document.removeEventListener("click", onClickOutsideListener);
    if (toggleLeave) {
      // setToggleLeave((prev) => (prev = false));
      // setPlaceholderSearch((prev) => (prev = ""));

      // setCustomWidth((prev) => (prev = 0));
      setIsDisplaySearch((prev) => (prev = false));
    }
  };

  useEffect(() => {
    const getSearchItems = async () => {
      try {
        const response = await fetch(getURL(`/api/v1/public/navsearch`));
        const data = await response.json();
        setItems(data.products);
      } catch (error) {
        console.error("Error fetching search items:", error);
      }
    };

    getSearchItems();
  }, []);

  const formatResult = (item) => {
    return (
      <>
        <span
          style={{
            display: "block",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          {item.name}
        </span>
      </>
    );
  };

  return (
    <div className="z-30 border-none bg-transparent navbarsearch">
      <div className="z-30 border-none bg-transparent">
        <button
          onClick={displaySearchHandler}
          className="mt-1"
        >
          <IoIosSearch size={24} />
        </button>

        {isDisplaySearch && (
          <div
            className="w-screen absolute left-0 text-center bg-[#f6f6f6] py-4 top-[78px] md:top-[90px]"
            onMouseLeave={() => {
              document.addEventListener("click", onClickOutsideListener);
            }}
          >
            <div
              style={{
                width: ` ${window.innerWidth > 768 ? "50%" : "90%"} `,
                zIndex: 100,
                margin: "auto",
                // transition: "1s",
                // marginTop: "2px",
                // position: "absolute",
                // right: "10.5%",
                // top: 20,
              }}
            >
              <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                placeholder="Search..."
                formatResult={formatResult}
                showIcon={false}
                autoFocus
                maxResults={5}
                showClear={true}
                inputDebounce={400}
                fuseOptions={{
                  minMatchCharLength: 2,
                }}
                styling={{
                  border: 0,
                  boxShadow: 0,
                  backgroundColor: "#F6F6F6",
                  searchIconMargin: "0 0 0 6px",
                  iconColor: "black",
                  fontSize: "16px",
                  height: "50px",
                  zIndex: "10",
                  borderRadius: "4px",
                }}
                className="border-b border-black !within:border-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
