import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Products = ({ products }) => {
 return (
  <>
   {products && (
    <Card className="w-[100%]">
     <CardHeader>
      <CardTitle>Products</CardTitle>
     </CardHeader>
     <CardContent>
      <div className="grid w-full items-center gap-4">
       <div className="flex flex-col space-y-1.5">{products.length}</div>
      </div>
     </CardContent>
    </Card>
   )}
  </>
 );
};

export default Products;
