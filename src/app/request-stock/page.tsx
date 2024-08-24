"use client";

import { useAuth } from "@/auth/provider";
import { isAdminUser } from "@/auth/utils";
import { RequestStockButton } from "@/components/buttons";
import { StockRequest } from "@/db/product";
import { useStockRequests } from "@/stock-request/provider";
import { BaseUser } from "@/types/db";
import { Button, Input } from "@nextui-org/react";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiChevronLeft, FiMinus } from "react-icons/fi";

export default function RequestStockPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { stockRequests, clearStockRequests } = useStockRequests();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errors, setErrors] = useState<string | null>(null);

  const handleRequest = async () => {
    const req = new StockRequest(
      {
        products: stockRequests,
        supplier: {
          name: name,
          email: email,
          contact: contact,
          address: address,
        },
      },
      user as BaseUser,
    );

    try {
      await req.save();
      clearStockRequests();
      setName("");
      setEmail("");
      setContact("");
      setAddress("");
      setErrors("");
      router.back();
    } catch (e) {
      const error = e as FirebaseError;
      console.error("Upload error: ", error);
      setErrors(error.message);
    }
  };

  return (
    <main className="mx-auto w-full max-w-screen-lg">
      <section className="card mx-2 my-6 rounded-lg bg-transparent p-4 shadow-md lg:mx-0 lg:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Button
            color="primary"
            size="sm"
            variant="flat"
            onClick={router.back}
            startContent={<FiChevronLeft />}
          >
            Back
          </Button>
          <h3 className="text-sm font-bold">Stock request portal</h3>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="basis-5/12">
            <div className="card rounded-md px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <h6 className="font-bold">Products</h6>
                <h6 className="font-bold">Quantity</h6>
              </div>
              {stockRequests.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <h6 className="py-2">{product.name}</h6>
                  <RequestStockButton product={product} />
                </div>
              ))}
            </div>
          </div>

          <div className="basis-7/12">
            <div className="card rounded-md px-4 py-3">
              <h4 className="text-sm font-bold">Summary</h4>
              <form className="mt-3">
                {errors && (
                  <p className="pb-3 text-center text-sm font-semibold text-danger">
                    {errors}
                  </p>
                )}

                <Input
                  type="text"
                  label={
                    <span className="text-gray-800 dark:text-gray-300">
                      Supplier name
                    </span>
                  }
                  value={name}
                  labelPlacement="outside"
                  radius="sm"
                  color="primary"
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                  classNames={{
                    mainWrapper: "mt-3",
                    inputWrapper:
                      "border-emerald-700 data-[hover=true]:border-primary font-bold",
                    // input: "text-center font-semibold",
                  }}
                />

                <div className="my-3 flex items-center gap-3">
                  <Input
                    type="email"
                    label={
                      <span className="text-gray-800 dark:text-gray-300">
                        Email
                      </span>
                    }
                    value={email}
                    labelPlacement="outside"
                    radius="sm"
                    color="primary"
                    variant="bordered"
                    onChange={(e) => setEmail(e.target.value)}
                    // className="max-w-28 items-center"
                    classNames={{
                      inputWrapper:
                        "border-emerald-700 data-[hover=true]:border-primary font-bold",
                      // input: "text-center font-semibold",
                    }}
                  />

                  <Input
                    type="text"
                    label={
                      <span className="text-gray-800 dark:text-gray-300">
                        Contact
                      </span>
                    }
                    value={contact}
                    labelPlacement="outside"
                    radius="sm"
                    color="primary"
                    variant="bordered"
                    onChange={(e) => setContact(e.target.value)}
                    // className="max-w-28 items-center"
                    classNames={{
                      inputWrapper:
                        "border-emerald-700 data-[hover=true]:border-primary font-bold",
                      // input: "text-center font-semibold",
                    }}
                  />
                </div>

                <Input
                  type="text"
                  label={
                    <span className="text-gray-800 dark:text-gray-300">
                      Address
                    </span>
                  }
                  value={address}
                  labelPlacement="outside"
                  radius="sm"
                  color="primary"
                  variant="bordered"
                  onChange={(e) => setAddress(e.target.value)}
                  classNames={{
                    mainWrapper: "mt-4",
                    inputWrapper:
                      "border-emerald-700 data-[hover=true]:border-primary font-bold",
                    // input: "text-center font-semibold",
                  }}
                />

                <div className="mt-6 py-2">
                  {isAdminUser(user) ? (
                    <Button
                      type="button"
                      radius="sm"
                      color="primary"
                      variant="solid"
                      onClick={handleRequest}
                      className="w-full"
                    >
                      Process request
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      radius="sm"
                      color="primary"
                      variant="solid"
                      onClick={handleRequest}
                      className="w-full"
                    >
                      Request admin approval
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
