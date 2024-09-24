"use client";

import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { TiFilter } from "react-icons/ti";
import { ChangeEvent } from "react";
import clsx from "clsx";
import { FiChevronRight, FiList, FiMenu, FiPlus, FiX } from "react-icons/fi";
import { User } from "firebase/auth";
import { isAdminUser, isDeliveryUser, isSalesUser, whichUser } from "@/auth/utils";
import { internalUrls } from "@/config/site-config";
import { useStockRequests } from "@/stock-request/provider";
import { useStockCart } from "@/stock/provider";

interface DashboardHeaderProps {
  user: User;
  keys: string[];
  setSelectedKeys: (keys: Set<string>) => void;
  selectedKeys: Set<string>;
  selectedValue: string;
  valueToggler: (value: boolean) => void;
  value?: boolean;
  onSearchEnter?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
}

const DashboardHeader = ({
  user,
  keys,
  setSelectedKeys,
  selectedKeys,
  selectedValue,
  valueToggler,
  value,
  onSearchEnter,
  searchValue,
}: DashboardHeaderProps) => {
  const { stockCart } = useStockCart();
  const { stockRequests } = useStockRequests();
  return (
    <section className="flex sticky top-0 items-center justify-between gap-3 p-3 md:p-5">
      <div className="flex items-center gap-12">
        <button
          aria-label="Menu"
          type="button"
          onClick={() => valueToggler(!value)}
          className={clsx({ ["hidden"]: value })}
        >
          {value ? null : <FiMenu size={22} />}
        </button>

        <h3 className="font-bold uppercase text-sm">{ whichUser(user)} dashboard</h3>

        {/* <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              color="primary"
              radius="sm"
              size="sm"
              startContent={<TiFilter size={22} className="text-emerald-500" />}
              className="font-bold capitalize dark:text-white"
            >
              {selectedValue ? selectedValue : keys[0]}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter"
            variant="flat"
            disallowEmptySelection
            selectedKeys={selectedKeys}
            selectionMode="single"
            // closeOnSelect={false}
            onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
            className="w-full"
          >
            {keys.map((key) => (
              <DropdownItem key={key} className="capitalize">
                {key}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown> */}

        {/* <div className="flex h-7 min-w-24 flex-nowrap items-center rounded-md border-1 border-emerald-400 px-3 py-1 hover:border-emerald-500">
        <input
          type="text"
          value={searchValue}
          onChange={onSearchEnter}
          placeholder="Search here..."
          className="h-full w-full border-none bg-transparent outline-none"
        />
        <TbFilterSearch size={20} className="text-emerald-500" />
      </div> */}
      </div>

      <div className="flex items-center gap-3">
        {isDeliveryUser(user) && (
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
        )}

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

export default DashboardHeader;
