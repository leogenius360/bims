"use client";

import { useState, FormEvent } from "react";
import { Button } from "@nextui-org/react";
import { useAuth } from "@/auth/provider";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@/db/utils";
import { FirebaseError } from "firebase/app";

export const NewProductCategoryForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [errors, setErrors] = useState<string>("");
  const [categories, setCategories] = useState<{ label: string }[]>([
    { label: "" },
  ]);

  const handleAddMore = () => {
    setCategories([...categories, { label: "" }]);
  };

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index].label = value;
    setCategories(newCategories);
  };

  const handleRemove = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors("");

    try {
      // Save each category to Firestore
      for (const categoryData of categories) {
        const category = new ProductCategory({
          label: categoryData.label,
          addedBy: user!.uid,
        });
        await category.save();
      }

      // Reset the form
      setCategories([{ label: "" }]);
      router.refresh()
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
      id="newProductCategoryForm"
      aria-labelledby="newProductCategoryFormLabel"
    >
      <div className="offcanvas-header">
        <h6
          className="offcanvas-title font-bold"
          id="newProductCategoryFormLabel"
        >
          Product Categories
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

          {categories.map((category, index) => (
            <div key={index} className="mb-3 drop-shadow">
              <label className="mb-2 block text-xs font-bold">
                Category Name
              </label>
              <input
                type="text"
                value={category.label}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                required
                placeholder="Enter category name"
                className="mb-2 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
              />
              {index > 0 && (
                <Button
                  className="mt-1 text-xs text-red-500"
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}

          <Button
            className="mt-2 text-sm"
            size="sm"
            variant="ghost"
            onClick={handleAddMore}
          >
            Add More
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
