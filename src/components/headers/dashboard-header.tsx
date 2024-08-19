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
import { FiMenu, FiPlus, FiX } from "react-icons/fi";
import { User } from "firebase/auth";
import { isAdminUser } from "@/auth/utils";

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
  return (
    <section className="flex items-center justify-between gap-3 px-3 py-3 md:px-6 md:py-4">
      <button
        aria-label="Menu"
        type="button"
        onClick={() => valueToggler(!value)}
      >
        {value ? null : <FiMenu size={22} />}
      </button>

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
      </Dropdown>
    </section>
  );
};

export default DashboardHeader;
