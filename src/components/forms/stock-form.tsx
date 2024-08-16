"use client";

import { useState, FormEvent } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useAuth } from "@/auth/provider";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { StockType, OutStock, StocksProps, InStock } from "@/db/product";

export const IntockForm = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<StocksProps>({
    productId: "",
    description: "",
    price: 0,
    quantity: 0,
    expenses: 0,
    verifications: [],
    pending: true,
  });
  const [errors, setErrors] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors("");

    try {
      let stock;

      if (!formData.from) {
        setErrors("Please provide a 'from' location.");
        return;
      }

      stock = new InStock({ ...formData, from: formData.from }, user!);

      await stock?.save();
      // router.push("/stocks"); // Redirect to the stocks list page after saving
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
      id="inStockForm"
      aria-labelledby="inStockFormLabel"
    >
      <div className="offcanvas-header">
        <h6 className="offcanvas-title font-bold" id="inStockFormLabel">
          New In Stock
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
            <label className="mb-2 block text-xs font-bold">Product ID</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              required
              placeholder="Enter product ID"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Enter description"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder="Enter price"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              placeholder="Enter quantity"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Expenses</label>
            <input
              type="number"
              name="expenses"
              value={formData.expenses}
              onChange={handleInputChange}
              placeholder="Enter expenses"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              placeholder="Enter source location"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

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

export const OutStockForm = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<StocksProps>({
    productId: "",
    description: "",
    price: 0,
    quantity: 0,
    expenses: 0,
    verifications: [],
    pending: true,
  });
  const [errors, setErrors] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors("");

    try {
      let stock;
      if (!formData.to) {
        setErrors("Please provide a 'to' location.");
        return;
      }
      stock = new OutStock({ ...formData, to: formData.to }, user!);

      await stock?.save();
      // router.push("/stocks"); // Redirect to the stocks list page after saving
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
      id="outStockForm"
      aria-labelledby="outStockFormLabel"
    >
      <div className="offcanvas-header">
        <h6 className="offcanvas-title font-bold" id="outStockFormLabel">
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

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Product ID</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              required
              placeholder="Enter product ID"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Enter description"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder="Enter price"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              placeholder="Enter quantity"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">Expenses</label>
            <input
              type="number"
              name="expenses"
              value={formData.expenses}
              onChange={handleInputChange}
              placeholder="Enter expenses"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-bold">To</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              placeholder="Enter destination location"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

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
