"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Divider } from "..";
import { useAuth } from "@/auth/provider";
import { FirebaseError } from "firebase/app";
import { storage } from "@/config/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { NewProductProps, Product } from "@/db/product";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@/db/utils";
import { FiPlus } from "react-icons/fi";
import { BaseUser } from "@/types/db";

export const NewProductForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [errors, setErrors] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [productData, setProductData] = useState<NewProductProps>({
    name: "",
    price: 0,
    stock: { qty: 0, incoming: 0, outgoing: 0 },
    imageUrl: "",
    category: "",
    description: "",
  });
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await ProductCategory.getAll();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `product images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          setErrors(error.message);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors("");

    if (!productData.category) {
      setErrors("Category is required.");
      return;
    }

    const product = new Product(productData, user as BaseUser);

    if (file) {
      try {
        const url = await uploadImage(file);
        product.imageUrl = url;
        await product.save();
        console.log(product);
        setProductData({
          name: "",
          price: 0,
          stock: { qty: 0, incoming: 0, outgoing: 0 },
          imageUrl: "",
          category: "",
          description: "",
        });
        router.refresh();
      } catch (e) {
        const error = e as FirebaseError;
        console.error("Upload error: ", error);
        setErrors(error.message);
      }
    } else {
      setErrors("Please select a file to upload.");
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end w-screen border-primary md:max-w-96"
      data-bs-scroll="false"
      id="newProductForm"
      aria-labelledby="newProductFormLabel"
    >
      <div className="offcanvas-header">
        <h6 className="offcanvas-title font-bold" id="newProductFormLabel">
          Product Form
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
        <Divider textContent="form" />

        <form onSubmit={handleSubmit} className="mt-3">
          {errors && (
            <p className="pb-3 text-center text-sm font-semibold text-danger">
              {errors}
            </p>
          )}
          <div className="drop-shadow">
            <label className="mb-2 block text-xs font-bold">Name</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
              placeholder="Enter product name"
              className="mb-4 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="drop-shadow">
              <label className="mb-2 block text-xs font-bold">Price</label>
              <input
                type="text"
                value={productData.price}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                required
                placeholder="Product price"
                className="mb-4 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
              />
            </div>

            <div className="drop-shadow">
              <label className="mb-2 block text-xs font-bold">
                Current stock
              </label>
              <input
                type="text"
                value={productData.stock.qty}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    stock: { ...prev.stock, qty: Number(e.target.value) },
                  }))
                }
                required
                placeholder="Enter product initial quantity"
                className="mb-4 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="drop-shadow">
            <div className="flex items-center justify-between">
              <label className="my-2 block text-xs font-bold">Category</label>
              <Button
                data-bs-toggle="offcanvas"
                data-bs-target="#newProductCategoryForm"
                aria-controls="newProductCategoryForm"
                isIconOnly
                size="sm"
                radius="sm"
                color="primary"
                variant="light"
                startContent={
                  <FiPlus size={18} className="dark:text-emerald-400" />
                }
              ></Button>
            </div>

            <select
              title="category"
              value={productData.category}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              required
              className="mb-4 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="drop-shadow">
            <label className="my-2 block text-xs font-bold">
              Image / Image URL
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              placeholder="Upload product image"
              className="mb-4 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            />
          </div>

          <div className="my-3 drop-shadow">
            <label className="mb-2 block text-xs font-bold">Description</label>
            <textarea
              value={productData.description}
              rows={5}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter product description here"
              required
              className="mb-4 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            ></textarea>
          </div>

          <Button
            isLoading={progress > 0 && progress < 100}
            type="submit"
            size="sm"
            color="primary"
            variant="solid"
            className="my-3 w-full"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};
