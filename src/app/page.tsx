"use client";

import NextLink from "next/link";
import { ProductCard, ProductHeadline } from "@/components/product";
import { Tabs, tabs, Tab } from "@nextui-org/react";

export default function LandingPage() {
  const products = [
    {
      id: "1",
      name: "Hammer",
      description: "A useful tool for construction",
      price: 25.99,
      quantity: 50,
      imageUrl: "",
    },
    {
      id: "2",
      name: "Screwdriver",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://example.com/screwdriver.jpg",
    },
    {
      id: "3",
      name: "Screwdriver",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://example.com/screwdriver.jpg",
    },
    {
      id: "4",
      name: "Screwdriver",
      description: "A tool for driving screws",
      price: 15.99,
      quantity: 30,
      imageUrl: "https://example.com/screwdriver.jpg",
    },
  ];

  const buildContent = (category?: string) => {
    return (
      <div className="">
        <ProductHeadline category={category} />

        <section className="grid items-center gap-4 px-3 pb-4 xs:grid-cols-2 sm:justify-between md:px-6 md:pb-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              imageUrl={product.imageUrl}
            />
          ))}
        </section>
      </div>
    );
  };

  let tabs = [
    {
      id: "all",
      label: "All products",
      content: buildContent(),
    },
    {
      id: "masonery",
      label: "Masonery",
      content: buildContent("Masonery"),
    },
    {
      id: "roofings",
      label: "Roofings",
      content: buildContent("Roofings"),
    },
  ];

  return (
    <>
      <Tabs
        aria-label="New and trending activities tab"
        placement="top"
        items={tabs}
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 overflow-x-auto scrollbar custom-scrollbar thumb-none px-3 md:px-6",
          tab: "font-bold px-0 py-6",
          tabContent: "dark:text-white group-data-[selected=true]:text-primary",
          cursor: "w-full bg-primary rounded-md",
        }}
      >
        {(item) => (
          <Tab key={item.id} title={item.label} className="">
            {item.content}
          </Tab>
        )}
      </Tabs>
    </>
  );
}
