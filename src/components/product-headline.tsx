import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { TiFilter } from "react-icons/ti";
import { TbFilterSearch } from "react-icons/tb";
import { ChangeEvent } from "react";
import { FiPlus } from "react-icons/fi";
import { User } from "firebase/auth";
import { isAdminUser } from "@/auth/utils";

interface ProductHeadlineProps {
  user?: User;
  categories: string[];
  tags?: string[] | undefined;
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
  selectedValue: string;
  onSearchEnter?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
}

export const ProductHeadline = ({
  user,
  categories,
  tags = [],
  selectedKeys,
  setSelectedKeys,
  selectedValue,
  onSearchEnter,
  searchValue,
}: ProductHeadlineProps) => {
  const keys = categories.concat(...tags);

  return (
    <section className="flex items-center justify-between gap-3 px-3 py-3 md:px-6 md:py-4">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            color="primary"
            radius="sm"
            size="sm"
            startContent={<TiFilter size={22} className="text-emerald-500" />}
            className="font-bold capitalize dark:text-white"
          >
            {selectedValue ? selectedValue : "All products"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
          className="w-full"
        >
          {keys.map((key) => (
            <DropdownItem key={key} className="capitalize">
              {key}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <form action="" method="get" onSubmit={onSearchEnter}>
        <div className="flex h-8 min-w-24 flex-nowrap items-center rounded-md border-1 border-emerald-400 px-3 py-1 hover:border-emerald-500">
          <input
            type="text"
            value={searchValue}
            onChange={onSearchEnter}
            placeholder="Search products..."
            className="h-full w-full border-none bg-transparent outline-none"
          />
          <button type="submit" title="Send" className="px-2 py-3">
            <TbFilterSearch size={22} className="text-emerald-500" />
          </button>
        </div>
      </form>

      {isAdminUser(user) ? (
        <Button
          data-bs-toggle="offcanvas"
          data-bs-target="#newProductForm"
          aria-controls="newProductForm"
          size="sm"
          radius="sm"
          color="primary"
          variant="ghost"
          startContent={<FiPlus className="" />}
          className="min-w-9 px-0 text-sm font-semibold sm:px-3 dark:text-white"
        >
          <span className="hidden sm:flex">New product</span>
        </Button>
      ) : null}
    </section>
  );
};
