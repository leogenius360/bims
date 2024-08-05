"use client";

import { useState, useMemo } from "react";
import NextLink from "next/link";
import { ProductCard, ProductHeadline } from "@/components/product";


export default function LandingPage() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const categories = ["Massonary", "Roofing", "Carpentery"];
  const products = [
    {
      id: "0",
      name: "Screwdriver",
      category: "Carpentery",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://thumbs.dreamstime.com/b/power-tools-isolated-white-background-28864575.jpg",
    },
    {
      id: "1",
      name: "Hammer",
      category: "Roofing",
      description: "A useful tool for construction",
      price: 25.99,
      quantity: 50,
      imageUrl: "https://img.houseui.com/media/blog-thumbnail/Different_Types_Of_Roofing_Materials.jpg/",
    },
    {
      id: "2",
      name: "Screwdriver",
      category: "Massonary",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://cdn.classfmonline.com/cfoZ41e/imagelib/thumbs/88710853.jpg",
    },
    {
      id: "3",
      name: "Screwdriver",
      category: "Roofing",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://img.houseui.com/media/blog-thumbnail/Different_Types_Of_Roofing_Materials.jpg/",
    },
    {
      id: "4",
      name: "Screwdriver",
      category: "Carpentery",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://thumbs.dreamstime.com/b/power-tools-isolated-white-background-28864575.jpg",
    },
    {
      id: "5",
      name: "Screwdriver",
      category: "Roofing",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://img.houseui.com/media/blog-thumbnail/Different_Types_Of_Roofing_Materials.jpg/",
    },
    {
      id: "6",
      name: "Screwdriver",
      category: "Massonary",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://cdn.classfmonline.com/cfoZ41e/imagelib/thumbs/88710853.jpg",
    },
    {
      id: "7",
      name: "Screwdriver",
      category: "Carpentery",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://thumbs.dreamstime.com/b/power-tools-isolated-white-background-28864575.jpg",
    },
  ];

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <>
      <div className="">
        <ProductHeadline
          tags={["Screwdriver"]}
          categories={categories}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          selectedValue={selectedValue}
        />

        <section className="grid items-center gap-4 px-3 pb-4 xs:grid-cols-2 sm:justify-between md:px-6 md:pb-8 lg:grid-cols-3">
          {products
            .filter((product) =>
              selectedValue
                ? selectedValue
                    .toLowerCase()
                    .includes(product.category.toLowerCase()) ||
                  selectedValue
                    .toLowerCase()
                    .includes(product.name.toLowerCase())
                : true,
            )
            .map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
                imageUrl={product.imageUrl}
                filter={selectedValue}
                // className={`group-data-[filtered=${product.category.toLowerCase()}]:inline-block ${product.category.toLowerCase()}`}
              />
            ))}
        </section>
      </div>
    </>
  );
}
