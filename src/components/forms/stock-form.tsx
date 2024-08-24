"use client";

import { useState, FormEvent, useEffect } from "react";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useAuth } from "@/auth/provider";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { BaseUser } from "@/types/db";
import { Product, Stock, StockProps } from "@/db/product";
import { Divider } from "..";
import { Disclosure } from "@/types";
import { useStockCart } from "@/stock/provider";

interface StockFormProps {
  newStockModal?: Disclosure;
}

export const StockForm = ({ newStockModal }: StockFormProps) => {
  const { user } = useAuth();
  const { stockCart, getTotalStockCost } = useStockCart();

  const router = useRouter();
  const [formData, setFormData] = useState<StockProps>({
    products: stockCart,
    payment: { amountPaid: 0 },
    expenses: 0,
    description: "",
  });
  const [errors, setErrors] = useState<string>("");

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleClose = (id) => {
  //   setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
  //   if (fruits.length === 1) {
  //     setFruits(initialFruits);
  //   }
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors("");

    try {
      const sales = new Stock({ ...formData }, user as BaseUser);
      await sales.save();
      // router.push("/sales"); // Redirect to the sales list page after saving
    } catch (e) {
      const error = e as FirebaseError;
      console.error("Save error: ", error);
      setErrors(error.message);
    }
  };

  return (
    <Modal
      size="xl"
      scrollBehavior="inside"
      isOpen={newStockModal?.isOpen}
      onOpenChange={newStockModal?.onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="py-2 text-sm">New stock form</ModalHeader>
            <ModalBody className="custom-scrollbar">
              <div className="flex flex-wrap gap-1">
                {stockCart.map((product) => (
                  <Chip key={product.id} variant="flat" size="sm">
                    {product.name} : {product.qty} @ {product.price}
                  </Chip>
                ))}
              </div>
              <form className="">
                <div className="card rounded-md px-4 py-3">
                  <div className="mb-3 flex justify-between">
                    <h4 className="text-xs font-bold">
                      Number of products: {stockCart.length}
                    </h4>
                    <h4 className="pe-1 text-xs font-bold">
                      Total cost: {getTotalStockCost().toFixed(2)}
                    </h4>
                  </div>
                  {errors && (
                    <p className="pb-3 text-center text-sm font-semibold text-danger">
                      {errors}
                    </p>
                  )}
                  <div className="">
                    <div className="flex items-center gap-3">
                      <Input
                        type="text"
                        label={
                          <span className="text-gray-800 dark:text-gray-300">
                            Payment made
                          </span>
                        }
                        labelPlacement="outside"
                        radius="sm"
                        color="primary"
                        variant="bordered"
                        value={formData.payment?.amountPaid?.toString()}
                        onChange={handleInputChange}
                        classNames={{
                          mainWrapper: "mt-3",
                          inputWrapper:
                            "border-emerald-700 data-[hover=true]:border-primary font-bold",
                        }}
                      />
                      <Input
                        type="text"
                        label={
                          <span className="text-gray-800 dark:text-gray-300">
                            Expenses
                          </span>
                        }
                        labelPlacement="outside"
                        radius="sm"
                        color="primary"
                        variant="bordered"
                        value={formData.expenses.toString()}
                        onChange={handleInputChange}
                        classNames={{
                          mainWrapper: "mt-3",
                          inputWrapper:
                            "border-emerald-700 data-[hover=true]:border-primary font-bold",
                        }}
                      />
                    </div>

                    <div className="mt-6 w-full">
                      <label className="mb-2 block text-xs font-bold">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="description"
                        className="card w-full rounded-md border-2 border-primary px-3 py-2 outline-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Divider textContent="Supplier details" />
                    <Input
                      type="text"
                      label={
                        <span className="text-gray-800 dark:text-gray-300">
                          Supplier name
                        </span>
                      }
                      labelPlacement="outside"
                      radius="sm"
                      color="primary"
                      variant="bordered"
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
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
                        // value={email}
                        labelPlacement="outside"
                        radius="sm"
                        color="primary"
                        variant="bordered"
                        // onChange={(e) => setEmail(e.target.value)}
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
                        // value={contact}
                        labelPlacement="outside"
                        radius="sm"
                        color="primary"
                        variant="bordered"
                        // onChange={(e) => setContact(e.target.value)}
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
                      // value={address}
                      labelPlacement="outside"
                      radius="sm"
                      color="primary"
                      variant="bordered"
                      // onChange={(e) => setAddress(e.target.value)}
                      classNames={{
                        mainWrapper: "mt-4",
                        inputWrapper:
                          "border-emerald-700 data-[hover=true]:border-primary font-bold",
                        // input: "text-center font-semibold",
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex w-full items-center gap-3">
                  <Button
                    type="submit"
                    radius="sm"
                    color="primary"
                    variant="solid"
                    // onClick={handleRequest}
                    className="w-full"
                  >
                    Submit
                  </Button>

                  <Button
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#newStockForm"
                    aria-controls="newStockForm"
                    radius="sm"
                    color="primary"
                    variant="solid"
                    onPress={newStockModal?.onClose}
                    className="w-full"
                  >
                    Edit stock
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter className="py-3"></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface StockRequestFormProps {
  stockRequestModal?: Disclosure;
}

export const StockRequestForm = ({
  stockRequestModal,
}: StockRequestFormProps) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<StockProps>({
    products: [{ id: "", name: "", price: 0, qty: 0 }],
    payment: { amountPaid: 0 },
    expenses: 0,
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [errors, setErrors] = useState<string>("");

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const allProducts = await Product.getAll();
        setProducts(allProducts);
      } catch (err) {
        setErrors("Failed to load products. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [e.target.name]:
        e.target.name === "qty" || e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    };
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { id: "", name: "", price: 0, qty: 0 }],
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors("");

    try {
      const sales = new Stock({ ...formData }, user as BaseUser);
      await sales.save();
      // router.push("/sales"); // Redirect to the sales list page after saving
    } catch (e) {
      const error = e as FirebaseError;
      console.error("Save error: ", error);
      setErrors(error.message);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end min-w-full max-w-screen-md border-primary"
      data-bs-scroll="false"
      id="addStockForm"
      aria-labelledby="addStockFormLabel"
    >
      <div className="offcanvas-header">
        <h6 className="offcanvas-title font-bold" id="addStockFormLabel">
          New Stock
        </h6>
        <button
          className="btn-close"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <hr />
      </div>

      <div className="offcanvas-body">
        <form onSubmit={handleSubmit} className="mt-3">
          {errors && (
            <p className="pb-3 text-center text-sm font-semibold text-danger">
              {errors}
            </p>
          )}

          <div className="mb-3 flex flex-wrap items-center justify-center gap-1">
            {formData.products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 rounded-md bg-gray-50 p-3 sm:flex-row dark:bg-gray-950"
              >
                <div className="mb-2">
                  <label className="mb-2 block text-xs font-bold">
                    Product {product.name || index + 1}
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={product.id}
                    onChange={(e) => handleProductChange(index, e)}
                    list={`product-options-${index}`}
                    placeholder="Enter or select product ID"
                    className="w-full rounded-md border px-3 py-2"
                  />
                  <datalist
                    id={`product-options-${index}`}
                    className="w-full bg-inherit"
                  >
                    {products
                      .filter((p) => p.id.includes(product.id))
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                  </datalist>
                </div>

                <div className="flex items-center gap-3">
                  <div className="mb-2">
                    <label className="mb-2 block text-xs font-bold">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="qty"
                      value={product.qty}
                      onChange={(e) => handleProductChange(index, e)}
                      required
                      placeholder="Enter quantity"
                      className="w-full rounded-md border border-emerald-500 px-3 py-2 outline-none hover:border-emerald-700"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="mb-2 block text-xs font-bold">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={(e) => handleProductChange(index, e)}
                      required
                      placeholder="Enter price"
                      className="w-full rounded-md border border-emerald-500 px-3 py-2 outline-none hover:border-emerald-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-5 flex w-full flex-col items-center justify-center gap-3 lg:flex-row">
            <div className="flex items-center justify-center gap-3 lg:flex-col">
              <div className="">
                <label className="mb-2 block text-xs font-bold">Payment</label>
                <input
                  type="text"
                  name="payment.amountPaid"
                  value={formData.payment?.amountPaid}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter sale description"
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>

              <div className="">
                <label className="mb-2 block text-xs font-bold">Expenses</label>
                <input
                  type="text"
                  name="expenses"
                  value={formData.expenses}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter sale description"
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>

            <div className="w-full max-w-md">
              <label className="mb-2 block text-xs font-bold">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                required
                placeholder="Enter sale description"
                className="w-full rounded-md border px-3 py-2"
              ></textarea>
            </div>
          </div>

          <div className="mx-auto mt-5 flex w-full max-w-md items-center justify-between gap-3">
            <Button
              type="button"
              size="sm"
              color="primary"
              variant="solid"
              onClick={handleAddProduct}
              className="w-full"
            >
              Add Another Product
            </Button>

            <Button
              type="submit"
              size="sm"
              color="primary"
              variant="solid"
              className="w-full"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
