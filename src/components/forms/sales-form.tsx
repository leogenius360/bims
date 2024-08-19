"use client";

import { useState, FormEvent } from "react";
import { Button } from "@nextui-org/react";
import { useAuth } from "@/auth/provider";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { Sales, SalesProps, SalesProductProps, PaymentStatus } from "@/db/sales";
import { BaseUser } from "@/types/db";

export const SalesForm = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<SalesProps>({
    products: [],
    payment: { amountPaid: 0, balance: 0, status: PaymentStatus.PartPayment },
    expenses: 0,
    description: "",
  });
  const [errors, setErrors] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [e.target.name]: e.target.name === "qty" || e.target.name === "price" ? Number(e.target.value) : e.target.value,
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
      const sales = new Sales({ ...formData }, user as BaseUser);
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
      className="offcanvas offcanvas-end w-screen border-primary md:max-w-96"
      data-bs-scroll="false"
      id="newSalesForm"
      aria-labelledby="newSalesFormLabel"
    >
      <div className="offcanvas-header">
        <h6 className="offcanvas-title font-bold" id="newSalesFormLabel">
          New Sale
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

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Enter sale description"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          {formData.products.map((product, index) => (
            <div key={index} className="mb-3">
              <h5 className="font-bold">Product {index + 1}</h5>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-bold">Product ID</label>
                <input
                  type="text"
                  name="id"
                  value={product.id}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                  placeholder="Enter product ID"
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-bold">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                  placeholder="Enter product name"
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-bold">Quantity</label>
                <input
                  type="number"
                  name="qty"
                  value={product.qty}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                  placeholder="Enter quantity"
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-bold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                  placeholder="Enter price"
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            size="sm"
            color="primary"
            variant="solid"
            onClick={handleAddProduct}
            className="mt-3 w-full"
          >
            Add Another Product
          </Button>

          <Button
            type="submit"
            size="sm"
            color="primary"
            variant="solid"
            className="mt-3 w-full"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};
