import AdminLayout from "@/components/layouts/AdminLayout";

import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import Desginers from "./_partials/Designers";

export default async function Page() {
  return (
    <div>
      <AdminPagesHeader
        title="Designers"
        createLink="designers"
        buttonName="Add new designer"
      ></AdminPagesHeader>
      <Desginers></Desginers>
    </div>
  );
}
