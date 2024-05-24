"use client";
import React, { useEffect, useState } from "react";
import getURL from "@/middleware/getUrl";
import List from "./List";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      const response = await fetch(getURL("/api/v1/admin/favorites"), {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();
      setFavorites(data.favorites);
    };

    fetchFavoritesData();
  }, []);

  return (
    <>
      {favorites.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favorites &&
            favorites.map((item, index) => (
              <List
                key={index}
                item={item?.product}
                itemId={item.id}
              ></List>
            ))}
        </div>
      )}

      {favorites.length <= 0 && (
        <div className="text-center w-full mt-20">
          <p className="text-2xl">You don't have favorite</p>
        </div>
      )}
    </>
  );
};

export default Favorites;
