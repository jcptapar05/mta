import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EditUserAddressForm from "./EditUserAddressForm";
import CreateUserAddressForm from "./CreateUserAddressForm";
import EditUserBillingAddressForm from "./EditUserBillingAddressForm";
import ChangeDefault from "./ChangeDefault";
import { useSession } from "next-auth/react";
import getURL from "@/middleware/getUrl";
import ConfirmDelete from "@/components/confirmDelete/ConfirmDelete";

const AddressLists = ({ address, shippingAddress, userId }) => {
  const { data: session } = useSession();

  const deleteShippingAddress = async (id) => {
    const res = await fetch(getURL(`/api/v1/admin/shipping_address/${id}`), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok && data.message == "Successfully deleted!") {
      window.location.reload();
    }
  };

  return (
    <div>
      <p className="text-[22px]">Shipping & Billing Address</p>
      <p>Manage and edit your address for delivery purposes</p>
      <div className="my-10">
        <Separator></Separator>
      </div>
      <p className="mb-4">Billing Address</p>
      <div>
        {address && address?.address_1 != "" && address?.address_1 != null ? (
          <div className="w-full p-8 bg-[#F6F6F6] flex justify-between items-center">
            <div>
              <p className="text-sm">Address</p>
              <p>{address?.company?.company}</p>
              <p>
                {address?.street}, {address?.state}, {address?.city}, ZIP Code:{" "}
                {address?.postal_code} {address?.country}
              </p>

              <div className="mt-5">
                <p className="text-sm">Contact</p>
                <p>{address?.phone_number}</p>
              </div>
            </div>
            <div className="min-h-[120px] border-l border-black flex items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <EditUserBillingAddressForm
                    address={address}
                  ></EditUserBillingAddressForm>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="p-8 bg-[#F6F6F6] mt-4 text-center">
            <p>You currently don't have a billing address.</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-[#2253FF]"
                >
                  {" "}
                  <FiPlus
                    size={20}
                    className="me-2"
                  />{" "}
                  Add billing address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <EditUserBillingAddressForm
                  address={address}
                ></EditUserBillingAddressForm>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="my-5 flex justify-between items-center">
          <p>Shipping Address</p>
          {shippingAddress &&
          shippingAddress.length >= 0 &&
          shippingAddress[0].address_1 != "" &&
          shippingAddress[0].address_1 != null ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="text-[#2253FF]"
                  variant="ghost"
                >
                  <FiPlus
                    size={20}
                    className="me-2"
                  />{" "}
                  Add new address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <CreateUserAddressForm></CreateUserAddressForm>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="text-[#2253FF]"
                  variant="ghost"
                >
                  <FiPlus
                    size={20}
                    className="me-2"
                  />{" "}
                  Add new address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                {shippingAddress && shippingAddress.length > 0 && (
                  <EditUserAddressForm
                    addressInfo={shippingAddress[0]}
                  ></EditUserAddressForm>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>

        {shippingAddress &&
          shippingAddress?.length > 0 &&
          shippingAddress.map((item, index) => (
            <div key={index}>
              {item.address_1 != "" && item.address_1 != null ? (
                <div className="w-full p-8 bg-[#F6F6F6] flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm">Address</p>
                    <p>{item?.company?.company}</p>
                    <p>
                      {item?.street}, {item?.state}, {item?.city}, ZIP Code:{" "}
                      {item?.postal_code} {item?.country}
                    </p>

                    <div className="my-5">
                      <p className="text-sm">Contact</p>
                      <p>{item?.phone_number}</p>
                    </div>

                    <div>
                      {item.set_default && (
                        <Button
                          variant="outline"
                          className="bg-transparent uppercase"
                          disabled
                        >
                          Default
                        </Button>
                      )}

                      {!item.set_default && (
                        <ChangeDefault
                          item={item}
                          userId={session?.user?.id}
                        />
                      )}
                    </div>
                  </div>
                  <div className="min-h-[120px] border-black flex flex-col justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost">Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <EditUserAddressForm
                          addressInfo={item}
                        ></EditUserAddressForm>
                      </DialogContent>
                    </Dialog>
                    <Separator className="bg-black"></Separator>
                    <div>
                      {!item.set_default && shippingAddress?.length > 1 && (
                        <ConfirmDelete
                          id={item.id}
                          confirmDelete={deleteShippingAddress}
                          name="Delete"
                        ></ConfirmDelete>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-[#F6F6F6] mt-4 text-center">
                  <p>You currently don't have a shipping address.</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="text-[#2253FF]"
                        variant="ghost"
                      >
                        <FiPlus
                          size={20}
                          className="me-2"
                        />{" "}
                        Add shipping address
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <EditUserAddressForm
                        addressInfo={item}
                      ></EditUserAddressForm>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddressLists;
