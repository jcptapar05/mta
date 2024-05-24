import AdminPagesHeader from "@/components/header/AdminPagesHeader";
import Artists from "./_partials/Artists";

export default async function ArtistPage() {
  return (
    <div>
      <AdminPagesHeader
        title="Artists"
        createLink="artists"
        buttonName="Add new artist"
      ></AdminPagesHeader>
      <Artists></Artists>
    </div>
  );
}
