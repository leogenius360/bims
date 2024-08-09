"use client";

import { FormEvent, useState } from "react";
import { Button } from "@nextui-org/react";
import { Divider } from "..";
import { useAuth } from "@/auth/provider";
import { FirebaseError } from "firebase/app";
import { storage } from "@/config/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { InventoryMethod, NewProductProps, Product } from "@/db/product";
import { useRouter } from "next/navigation";

export const NewProductForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [errors, setErrors] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [productData, setProductData] = useState<NewProductProps>({
    name: "",
    imageUrl: "",
    category: "",
    inventoryMethod: InventoryMethod.FIFO,
    description: "",
  });
  const [progress, setProgress] = useState(0);

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
          // Progress monitoring (optional)
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          setErrors(error.message);
          reject(error);
        },
        () => {
          // Handle successful uploads
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

    const product = new Product(productData, user!);

    if (file) {
      try {
        const url = await uploadImage(file);
        product.imageUrl = url;
        await product.save();
        console.log(product);
        setProductData({
          name: "",
          imageUrl: "",
          category: "",
          inventoryMethod: InventoryMethod.FIFO,
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
        <p className="my-2 inline-block text-sm font-semibold">
          Add a new product by filling the form below
        </p>

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
              className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            />
          </div>

          <div className="drop-shadow">
            <label className="mb-2 block text-xs font-bold">Category</label>
            <input
              type="text"
              value={productData.category}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              required
              placeholder="Enter product category"
              className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            />
          </div>

          <div className="drop-shadow">
            <label className="mb-2 block text-xs font-bold">
              Inventory method
            </label>
            <select
              className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
              name="inventory-method"
              id=""
              value={productData.inventoryMethod}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  inventoryMethod:
                    e.target.value === InventoryMethod.FIFO
                      ? InventoryMethod.FIFO
                      : InventoryMethod.LIFO,
                }))
              }
            >
              <option value={InventoryMethod.FIFO}>
                FIFO method of stock keeping
              </option>
              <option value={InventoryMethod.LIFO}>
                LIFO method of stock keeping
              </option>
            </select>
          </div>

          <div className="drop-shadow">
            <label className="mb-2 block text-xs font-bold">
              Image / image URL
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              placeholder="Upload product image"
              className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
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
              className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
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
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
