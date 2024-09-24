"use client";

import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  UseDisclosureProps,
} from "@nextui-org/react";
import { TiFilter } from "react-icons/ti";
import { TbFilterSearch } from "react-icons/tb";
import { ChangeEvent } from "react";
import { FiChevronRight, FiList, FiPlus } from "react-icons/fi";
import { User } from "firebase/auth";
import { isAdminUser, isDeliveryUser, isSalesUser } from "@/auth/utils";
import { useStockCart } from "@/stock/provider";
import { useStockRequests } from "@/stock-request/provider";
import Link from "next/link";
import { internalUrls } from "@/config/site-config";

interface HomePageHeaderProps {
  user: User | null;
  categories: string[];
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
  selectedValue: string;
  onSearchEnter?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
}

export const HomePageHeader = ({
  user,
  categories,
  selectedKeys,
  setSelectedKeys,
  selectedValue,
  onSearchEnter,
  searchValue,
}: HomePageHeaderProps) => {
  const { stockCart } = useStockCart();
  const { stockRequests } = useStockRequests();
  return (
    <section className="flex flex-wrap items-center justify-center gap-3 px-3 py-3 md:px-6 md:py-4">
      <div className="me-auto flex items-center gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              color="primary"
              radius="sm"
              size="sm"
              startContent={<TiFilter size={22} className="text-emerald-500" />}
              className="w-full min-w-40 font-bold dark:text-white"
            >
              {selectedValue ? selectedValue : "Filter products"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter"
            variant="flat"
            closeOnSelect={false}
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
          >
            {categories.map((key) => (
              <DropdownItem key={key} className="capitalize">
                {key}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Input
          type="text"
          value={searchValue}
          onChange={onSearchEnter}
          placeholder="Search products..."
          size="sm"
          radius="sm"
          color="primary"
          variant="bordered"
          endContent={<TbFilterSearch size={20} className="text-emerald-500" />}
          className=" min-w-52"
          classNames={{
            mainWrapper: "w-full",
            inputWrapper:
              "border-emerald-700 data-[hover=true]:border-primary font-bold",
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        {/* {isDeliveryUser(user) && (
          <Button
            data-bs-toggle="offcanvas"
            data-bs-target="#inStockForm"
            aria-controls="inStockForm"
            size="sm"
            radius="sm"
            color="primary"
            variant="ghost"
            startContent={<FiPlus className="" />}
            className="min-w-9 text-sm font-semibold dark:text-white"
          >
            Request delivery
          </Button>
        )} */}

        {isSalesUser(user) &&
          (stockCart.length ? (
            <Badge content={stockCart.length} color="primary">
              <Button
                data-bs-toggle="offcanvas"
                data-bs-target="#newStockForm"
                aria-controls="newStockForm"
                size="sm"
                radius="sm"
                color="primary"
                variant="ghost"
                startContent={<FiList className="" />}
                className="min-w-9 text-sm font-semibold dark:text-white"
              >
                New stock
              </Button>
            </Badge>
          ) : (
            <Button
              data-bs-toggle="offcanvas"
              data-bs-target="#newStockForm"
              aria-controls="newStockForm"
              size="sm"
              radius="sm"
              color="primary"
              variant="ghost"
              startContent={<FiList className="" />}
              className="min-w-9 text-sm font-semibold dark:text-white"
            >
              New stock
            </Button>
          ))}

        {isAdminUser(user) && (
          <>
            {stockRequests.length > 0 && (
              <Badge content={stockRequests.length} color="primary">
                <Button
                  as={Link}
                  href={internalUrls.requestStock}
                  size="sm"
                  radius="sm"
                  color="primary"
                  variant="ghost"
                  endContent={<FiChevronRight className="" />}
                  className="min-w-9 text-sm font-semibold dark:text-white"
                >
                  Stock request
                </Button>
              </Badge>
            )}

            {stockCart.length > 0 && (
              <Badge content={stockCart.length} color="primary">
                <Button
                  data-bs-toggle="offcanvas"
                  data-bs-target="#newStockForm"
                  aria-controls="newStockForm"
                  size="sm"
                  radius="sm"
                  color="primary"
                  variant="ghost"
                  startContent={<FiList className="" />}
                  className="min-w-9 text-sm font-semibold dark:text-white"
                >
                  New stock
                </Button>
              </Badge>
            )}

            <Button
              data-bs-toggle="offcanvas"
              data-bs-target="#newProductForm"
              aria-controls="newProductForm"
              size="sm"
              radius="sm"
              color="primary"
              variant="ghost"
              startContent={<FiPlus className="" />}
              className="min-w-9 text-sm font-semibold dark:text-white"
            >
              New product
            </Button>
          </>
        )}
      </div>
    </section>
  );
};
