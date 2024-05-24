import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import Materials from "./_partials/Materials";

export default async function Page() {
  return (
    <div>
      <AdminPagesHeader
        title="Materials"
        createLink="materials"
        buttonName="Add new material"
      ></AdminPagesHeader>
      <Materials></Materials>
    </div>
  );
}
