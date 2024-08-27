"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import clsx from "clsx";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export const InStock = () => {
  const TopContent = <h3 className="font-bold">Recent in-stock</h3>;
  const BottomContent = <h3 className="font-bold">Recent in-stock</h3>;

  return (
    <Table
      color="primary"
      radius="sm"
      selectionMode="single"
      aria-label="Example table with dynamic content"
      topContent={TopContent}
      // bottomContent={BottomContent}
      classNames={{
        wrapper:
          "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
        base: "",
        table: "card rounded-md",
        tbody: "overflow-y-auto h-72 max-h-80",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={rows}
        emptyContent={"No rows to display."}
        className=" "
      >
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};


export const DashboardSalesTable = () => {
  const TopContent = <h3 className="font-bold">Recent in-stock</h3>;
  const BottomContent = <h3 className="font-bold">Recent in-stock</h3>;

  return (
    <Table
      color="primary"
      radius="sm"
      selectionMode="single"
      aria-label="Example table with dynamic content"
      topContent={TopContent}
      // bottomContent={BottomContent}
      classNames={{
        wrapper:
          "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
        base: "",
        table: "card rounded-md",
        tbody: "overflow-y-auto h-72 max-h-80",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={rows}
        emptyContent={"No rows to display."}
        className=" "
      >
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const stockData = [
  {
    hash: "hash-1",
    date: new Date().toDateString(),
    product: "Tony Reichert",
    quantity: 285,
    price: 285,
    expenses: 285,
    verifications: 285,
    createdBy: "Leogenius",
    status: "Active",
  },
  {
    hash: "hash-2",
    date: new Date().toDateString(),
    product: "Zoey Lang",
    quantity: 453,
    price: 453,
    expenses: 453,
    verifications: 453,
    createdBy: "Technical Lead",
    status: "Paused",
  },
  {
    hash: "hash-3",
    date: new Date().toDateString(),
    product: "Jane Fisher",
    quantity: 685,
    price: 685,
    expenses: 685,
    verifications: 685,
    createdBy: "Senior Developer",
    status: "Active",
  },
  {
    hash: "hash-4",
    date: new Date().toDateString(),
    product: "William Howard",
    quantity: 34,
    price: 34,
    expenses: 34,
    verifications: 34,
    createdBy: "Community Manager",
    status: "Vacation",
  },
];

const stockFields = [
  {
    key: "hash",
    label: "HASH",
  },
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "product",
    label: "PRODUCT ID",
  },
  {
    key: "quantity",
    label: "QUANTITY",
  },
  {
    key: "price",
    label: "PRICE",
  },
  {
    key: "expenses",
    label: "EXPENSES",
  },
  {
    key: "verifications",
    label: "VERIFICATIONS",
  },
  {
    key: "createdBy",
    label: "CREATED BY",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export const CurrentStockTable = () => {
  const TopContent = <h3 className="font-bold">Current stock</h3>;
  const BottomContent = <h3 className="font-bold">Current stock</h3>;

  return (
    <Table
      color="primary"
      radius="sm"
      selectionMode="single"
      aria-label="table with dynamic content"
      topContent={TopContent}
      // bottomContent={BottomContent}
      classNames={{
        wrapper:
          "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
        table: "card rounded-md",
        tbody: "rounded-md",
        th: "font-bold",
      }}
    >
      <TableHeader columns={stockFields}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={stockData}
        emptyContent={"No rows to display."}
        className=" "
      >
        {(item) => (
          <TableRow key={item.hash}>
            {(columnKey) => (
              <TableCell
                className={clsx("min-w-24", {
                  // ["min-w-64"]: columnKey === "description",
                  // ["min-w-48"]: columnKey === "products",
                })}
              >
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const salesData = [
  {
    hash: "hash-1",
    date: new Date().toDateString(),
    products: "Tony Reichert, Tony Reichert, Tony Reichert, Tony Reichert",
    description:
      "Data Loading: The product data is fetched asynchronously, and appropriate loading states are shown until the data is available.",
    payment: "285",
    status: "Active",
  },
  {
    hash: "hash-2",
    date: new Date().toDateString(),
    products: "Tony Reichert, Tony Reichert, Tony Reichert, Tony Reichert",
    description:
      "Data Loading: The product data is fetched asynchronously, and appropriate loading states are shown until the data is available.",
    payment: "285",
    status: "Active",
  },
  {
    hash: "hash-3",
    date: new Date().toDateString(),
    products: "Tony Reichert, Tony Reichert, Tony Reichert, Tony Reichert",
    description:
      "Data Loading: The product data is fetched asynchronously, and appropriate loading states are shown until the data is available.",
    payment: "285",
    status: "Active",
  },
  {
    hash: "hash-4",
    date: new Date().toDateString(),
    products: "Tony Reichert, Tony Reichert, Tony Reichert, Tony Reichert",
    description:
      "Data Loading: The product data is fetched asynchronously, and appropriate loading states are shown until the data is available.",
    payment: "285",
    status: "Active",
  },
  {
    hash: "hash-5",
    date: new Date().toDateString(),
    products: "Tony Reichert, Tony Reichert, Tony Reichert, Tony Reichert",
    description:
      "Data Loading: The product data is fetched asynchronously, and appropriate loading states are shown until the data is available.",
    payment: "285",
    status: "Active",
  },
  {
    hash: "hash-6",
    date: new Date().toDateString(),
    products: "Tony Reichert, Tony Reichert, Tony Reichert, Tony Reichert",
    description:
      "Data Loading: The product data is fetched asynchronously, and appropriate loading states are shown until the data is available.",
    payment: "285",
    status: "Active",
  },
  {
    hash: "hash-7",
    date: new Date().toDateString(),
    products: "Tony Reichert, Tony Reichert, Tony Reichert, Tony Reichert",
    description:
      "Data Loading: The product data is fetched asynchronously, and appropriate loading states are shown until the data is available.",
    payment: "285",
    status: "Active",
  },
  {
    hash: "hash-8",
    date: new Date().toDateString(),
    products: "Tony Reichert, Tony Reichert, Tony Reichert, Tony Reichert",
    description:
      "Data Loading: The product data is fetched asynchronously, and appropriate loading states are shown until the data is available.",
    payment: "285",
    status: "Active",
  },
];

const salesFields = [
  {
    key: "hash",
    label: "HASH",
  },
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "products",
    label: "PRODUCTS",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "payment",
    label: "PAYMENT",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export const SalesTable = () => {
  const TopContent = <h3 className="font-bold">Sales Data</h3>;
  const BottomContent = <h3 className="font-bold">Current stock</h3>;

  return (
    <Table
      color="primary"
      radius="sm"
      selectionMode="single"
      aria-label="table with dynamic content"
      topContent={TopContent}
      // bottomContent={BottomContent}
      classNames={{
        wrapper:
          "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
        table: "card rounded-md",
        tbody: "rounded-md",
        th: "font-bold",
      }}
    >
      <TableHeader columns={salesFields}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={salesData}
        emptyContent={"No rows to display."}
        className=" "
      >
        {(item) => (
          <TableRow key={item.hash}>
            {(columnKey) => (
              <TableCell
                className={clsx("min-w-24", {
                  ["min-w-64"]: columnKey === "description",
                  ["min-w-48"]: columnKey === "products",
                })}
              >
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
