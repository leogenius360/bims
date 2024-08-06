"use client";

import { FormEvent, useState } from "react";
import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import { internalUrls } from "@/config/site-config";
import { Divider } from "..";
import { Product } from "@/db/schemas";
import { useAuth } from "@/auth/provider";
import { FirebaseError } from "firebase/app";
import { storage } from "@/config/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const NewProductForm = () => {
  const { user } = useAuth();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImgUrl(event.target.value)
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
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
    const product = new Product(
      name.split(" ").join("").toLowerCase(),
      name,
      price ? price : 0,
      quantity ? quantity : 0,
      imgUrl,
      description,
      user?.displayName ? user.displayName : user?.email!,
      new Date(),
    );
    if (file) {
      try {
        const url = await uploadImage(file);
        product.imageUrl = url;
        await product.save();
        console.log(product);
      } catch (e) {
        const error = e as FirebaseError;
        console.log(error, e);
        setErrors(error.message);
      }
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter product name"
              className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            />
          </div>

          <div className="my-3 flex items-center gap-3">
            <div className="drop-shadow">
              <label className="mb-2 block text-xs font-bold">
                Price (<small>GHC</small>)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter product price here"
                required
                className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
              />
            </div>

            <div className="drop-shadow">
              <label className="mb-2 block text-xs font-bold">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Initial quantity"
                required
                className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="drop-shadow">
            <label className="mb-2 block text-xs font-bold">
              Image / image url
            </label>
            <input
              type="file"
              value={imgUrl}
              onChange={handleFileChange}
              required
              placeholder="Enter product name"
              className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            />
          </div>

          <div className="my-3 drop-shadow">
            <label className="mb-2 block text-xs font-bold">Description</label>
            <textarea
              value={description}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description here"
              required
              className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
            ></textarea>
          </div>

          <Button
            type="submit"
            size="sm"
            color="primary"
            variant="solid"
            // radius="full"
            className="my-3 w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
