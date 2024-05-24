import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Users = ({ users }) => {
 return (
  <>
   {users && (
    <Card className="w-[100%]">
     <CardHeader>
      <CardTitle>Users</CardTitle>
     </CardHeader>
     <CardContent>
      <div className="grid w-full items-center gap-4">
       <div className="flex flex-col space-y-1.5">{users.length}</div>
      </div>
     </CardContent>
    </Card>
   )}
  </>
 );
};

export default Users;
