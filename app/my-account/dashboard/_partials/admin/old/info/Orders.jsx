import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Orders = ({ orders }) => {
 return (
  <>
   {orders && (
    <Card className="w-[100%]">
     <CardHeader>
      <CardTitle>Orders</CardTitle>
     </CardHeader>
     <CardContent>
      <div className="grid w-full items-center gap-4">
       <div className="flex flex-col space-y-1.5">0</div>
      </div>
     </CardContent>
    </Card>
   )}
  </>
 );
};

export default Orders;
