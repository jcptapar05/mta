import List from "@/app/(public)/view_all/_partial/arts/List";
import React from "react";

const RelatedProducts = ({ productRelated }) => {
  return (
    <div className="container mx-auto my-28 w-full">
      <p className="text-xl">Related Products</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6 mt-4">
        {productRelated &&
          productRelated.map((product) => (
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

export default RelatedProducts;
