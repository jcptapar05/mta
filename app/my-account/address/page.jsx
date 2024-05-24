"use client";

import React, { useEffect, useState } from "react";
import getURL from "@/middleware/getUrl";
import UserAdressForm from "./_partials/UserAdressForm";
import { useSession } from "next-auth/react";
import UserAdressFormCreate from "./_partials/UserAdressFormCreate";
import AddressLists from "./_partials/AddressLists";

const EditUserProfile = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [address, setAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const getAddress = async (id) => {
      const data = await fetch(getURL(`/api/v1/admin/address/${id}`), {
        cache: "no-cache",
      });
      const address = await data.json();
      setAddress(address.address);
    };

    const getShippingAddress = async (id) => {
      const data = await fetch(getURL(`/api/v1/admin/shipping_address/${id}`), {
        cache: "no-cache",
      });
      const address = await data.json();
      setShippingAddress(address.address);
    };

    if (userId) {
      getAddress(userId);
      getShippingAddress(userId);
    }
  }, [userId]);

  return (
    <AddressLists
      address={address}
      userId={userId}
      shippingAddress={shippingAddress}
    ></AddressLists>
  );

  // if (address) {
  //   return (
  //     <UserAdressForm
  //       address={address}
  //       userId={userId}
  //     ></UserAdressForm>
  //   );
  // } else {
  //   return <UserAdressFormCreate></UserAdressFormCreate>;
  // }
};

export default EditUserProfile;
