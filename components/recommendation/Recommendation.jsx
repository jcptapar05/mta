import List from "@/app/(public)/view_all/_partial/arts/List";
import React, { useState, useEffect } from "react";
import getURL from "@/middleware/getUrl";
const Recommendation = ({ artist }) => {
  const [products, SetProducts] = useState([]);
  const [, setIsLoading] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        getURL(`/api/v1/public/products_recomended`),
      );

      const data = await response.json();

      SetProducts(data.products);

      if (response.ok) {
        setIsLoading((prev) => (prev = false));
      }
    };
    getProduct();
  }, []);

  return (
    <div className="container my-28 w-full">
      {products.length > 0 && <p className="text-xl">Recommended</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6 mt-8">
        {products &&
          products.map((product) => (
            <List
              key={product.id}
              product={product}
              hideCart
              hideSize
              hidePrice
              variant="compact"
            ></List>
          ))}
      </div>
    </div>
  );
};

export default Recommendation;
