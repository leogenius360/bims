"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Button, Card, CardBody, Image, Slider } from "@nextui-org/react";
import { FiGitCommit, FiPlus } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import useWindowSize from "@/lib/window_size";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  quantity,
  imageUrl,
}) => {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
      radius="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              width="100%"
              radius="sm"
              shadow="md"
              src="https://nextui.org/images/album-cover.png"
            />
          </div>

          <div className="col-span-6 flex flex-col md:col-span-8 gap-1">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-foreground/90">{name}</h3>
              <h3 className=""><small className="text-xs text-emerald-500">GHC</small>{price}</h3>
            </div>

            <div className="">
              <small className="inline-flex w-full items-center justify-between font-semibold text-foreground/80">
                Stock:
                <span className="text-emerald-400">{quantity}</span>
                <FiGitCommit size={18} className="px-0.5 -mb-0.5" />
                <span className="text-red-500">-{quantity} out</span>
                <FiGitCommit size={18} className="px-0.5 -mb-0.5" />
                <span className="text-emerald-500">+{quantity} next</span>
              </small>
            </div>

            <p className="">{description}</p>

            <div className="flex w-full items-center justify-between mt-2">
              <Button
                className=" font-bold"
                size="sm"
                color="primary"
                radius="sm"
                variant="ghost"
              >
                Request stock
              </Button>
              <Button
                className=" font-bold"
                size="sm"
                color="primary"
                radius="sm"
                variant="ghost"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const ProductHeadline = () => {
  const { width } = useWindowSize();
  return (
    <section className="flex items-center justify-between gap-3 px-3 py-3 md:px-6 md:py-4">
        <h3 className="font-bold">Products</h3>

        <div className="flex items-center gap-3">
          <Button
            as={NextLink}
            isIconOnly={width && width < 640 ? true : false}
            size="sm"
            href="/dashboard"
            radius="sm"
            color="primary"
            variant="ghost"
            startContent={<CiEdit />}
            className="text-sm font-semibold ring-1 ring-emerald-600 ring-offset-1 dark:text-white dark:ring-offset-gray-800"
          >
            <span className="hidden sm:flex">Update product</span>
          </Button>
          <Button
            as={NextLink}
            isIconOnly={width && width < 640 ? true : false}
            size="sm"
            href="/dashboard"
            radius="sm"
            color="primary"
            variant="ghost"
            startContent={<FiPlus />}
            className="text-sm font-semibold ring-1 ring-emerald-600 ring-offset-1 dark:text-white dark:ring-offset-gray-800"
          >
            <span className="hidden sm:flex">New product</span>
          </Button>
        </div>
      </section>
  )
}
