"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Chip,
} from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Product, Stock, StockRequest } from "@/db/product";
import { Sales } from "@/db/sales";
import { Transaction } from "@/db/transaction";

interface TableProps<T> {
  maxRow?: number;
  label?: string;
  fields?: string[];
  filter?: (data: T[]) => T[];
}

export const ProductsTable = ({
  maxRow,
  label,
  fields,
  filter,
}: TableProps<Product>) => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const TopContent = (
    <h3 className="font-bold">{label ? label : "Product products"} </h3>
  );
  const BottomContent = <h3 className="font-bold">Recent in stock</h3>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Product.getAll();
        maxRow ? setProducts(data.slice(0, maxRow)) : setProducts(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load products");
      }
    };
    fetchData();
  }, [maxRow]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!products) {
    return <div>Loading products...</div>;
  }

  const columns = [
    { key: "date", label: "Lastest update date" },
    { key: "name", label: "Product Name" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "stock", label: "Stock (Qty)" },
    { key: "latestUpdateBy", label: "Last Updated By" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        color="primary"
        radius="sm"
        selectionMode="none"
        aria-label="Stocks table"
        topContent={TopContent}
        // bottomContent={BottomContent}
        classNames={{
          wrapper:
            "card h-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
          table: "",
          tbody: "overflow-y-auto divide-y card rounded-md",
        }}
      >
        <TableHeader
          columns={
            fields ? columns.filter((col) => fields.includes(col.key)) : columns
          }
        >
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={products}
          emptyContent={"No rows to display."}
          className=" "
        >
          {(product) => (
            <TableRow key={product.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "date" ? (
                    product.latestUpdateDate?.toDateString()
                  ) : columnKey === "stock" ? (
                    product.stock.qty
                  ) : columnKey === "actions" ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => null}>
                        View
                      </Button>
                      <Button size="sm" color="danger" onClick={() => null}>
                        Delete
                      </Button>
                    </div>
                  ) : (
                    getKeyValue(product, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export const StocksTable = ({
  maxRow,
  label,
  fields,
  filter,
}: TableProps<Stock>) => {
  const [stocks, setStocks] = useState<Stock[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const TopContent = (
    <h3 className="font-bold">{label ? label : "Recieved stocks"} </h3>
  );
  const BottomContent = <h3 className="font-bold">Recent in stock</h3>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Stock.getAll();
        maxRow ? setStocks(data.slice(0, maxRow)) : setStocks(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load stocks");
      }
    };
    fetchData();
  }, [maxRow]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!stocks) {
    return <div>Loading stocks...</div>;
  }

  const columns = [
    { key: "date", label: "Date" },
    { key: "supplier", label: "Supplier" },
    { key: "totalCost", label: "Cost of stock" },
    { key: "expenses", label: "Expenses" },
    { key: "payment", label: "Payment" },
    { key: "processedBy", label: "Processed by" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        color="primary"
        radius="sm"
        selectionMode="none"
        aria-label="Stocks table"
        topContent={TopContent}
        // bottomContent={BottomContent}
        classNames={{
          wrapper:
            "card h-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
          table: "",
          tbody: "overflow-y-auto divide-y card rounded-md",
        }}
      >
        <TableHeader
          columns={
            fields ? columns.filter((col) => fields.includes(col.key)) : columns
          }
        >
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={stocks}
          emptyContent={"No rows to display."}
          className=" "
        >
          {(stock) => (
            <TableRow key={stock.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "date" ? (
                    stock.date.toDateString()
                  ) : columnKey === "supplier" ? (
                    stock.supplier.name
                  ) : columnKey === "totalCost" ? (
                    stock.getTotalCost()
                  ) : columnKey === "payment" ? (
                    stock.payment?.amountPaid
                  ) : columnKey === "actions" ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => null}>
                        View
                      </Button>
                      <Button size="sm" color="danger" onClick={() => null}>
                        Delete
                      </Button>
                    </div>
                  ) : (
                    getKeyValue(stock, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export const StockRequestsTable = ({
  maxRow,
  label,
  fields,
  filter,
}: TableProps<StockRequest>) => {
  const [requests, setStocks] = useState<StockRequest[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const TopContent = (
    <h3 className="font-bold">{label ? label : "Stock requests"} </h3>
  );
  const BottomContent = <h3 className="font-bold">Recent in stock</h3>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await StockRequest.getAll();
        maxRow ? setStocks(data.slice(0, maxRow)) : setStocks(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load requests");
      }
    };
    fetchData();
  }, [maxRow]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!requests) {
    return <div>Loading requests...</div>;
  }

  const columns = [
    { key: "date", label: "Date" },
    { key: "products", label: "Products (name: qty)" },
    { key: "supplier", label: "Supplier" },
    { key: "pending", label: "Status" },
    { key: "processedBy", label: "Processed by" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        color="primary"
        radius="sm"
        selectionMode="none"
        aria-label="Stocks table"
        topContent={TopContent}
        // bottomContent={BottomContent}
        classNames={{
          wrapper:
            "card h-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
          table: "",
          tbody: "overflow-y-auto divide-y card rounded-md",
        }}
      >
        <TableHeader
          columns={
            fields ? columns.filter((col) => fields.includes(col.key)) : columns
          }
        >
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={requests}
          emptyContent={"No rows to display."}
          className=" "
        >
          {(req) => (
            <TableRow key={req.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "date" ? (
                    req.date.toDateString()
                  ) : columnKey === "products" ? (
                    <div className="flex flex-wrap gap-1">
                      {req.products.map((product) => (
                        <Chip
                          key={product.id}
                          variant="flat"
                          size="sm"
                          radius="sm"
                        >
                          {product.name} : {product.qty}
                        </Chip>
                      ))}
                    </div>
                  ) : columnKey === "supplier" ? (
                    req.supplier?.name
                  ) : columnKey === "pending" ? (
                    req.pending ? (
                      "Pending"
                    ) : (
                      "Accepted"
                    )
                  ) : columnKey === "actions" ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => null}>
                        View
                      </Button>
                      <Button size="sm" color="danger" onClick={() => null}>
                        Delete
                      </Button>
                    </div>
                  ) : (
                    getKeyValue(req, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export const SalesTable = ({
  maxRow,
  label,
  fields,
  filter,
}: TableProps<Sales>) => {
  const [transactions, setTransactions] = useState<Sales[] | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);
  const TopContent = <h3 className="font-bold">{label ? label : "Sales"} </h3>;
  const BottomContent = <h3 className="font-bold">Recent in stock</h3>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Sales.getAll();
        maxRow ? setTransactions(data.slice(0, maxRow)) : setTransactions(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load sales");
      }
    };
    fetchData();
  }, [maxRow]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!transactions) {
    return <div>Loading sales...</div>;
  }

  const columns = [
    { key: "date", label: "Date" },
    { key: "customer", label: "Customer" },
    { key: "products", label: "Products (name: qty)" },
    { key: "totalCost", label: "Total" },
    { key: "expenses", label: "Expenses" },
    { key: "payment", label: "Payment" },
    { key: "delivery", label: "Delivery" },
    { key: "processedBy", label: "Processed by" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        color="primary"
        radius="sm"
        selectionMode="none"
        aria-label="Stocks table"
        topContent={TopContent}
        // bottomContent={BottomContent}
        classNames={{
          wrapper:
            "card h-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
          table: "",
          tbody: "overflow-y-auto divide-y card rounded-md",
        }}
      >
        <TableHeader
          columns={
            fields ? columns.filter((col) => fields.includes(col.key)) : columns
          }
        >
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={transactions}
          emptyContent={"No rows to display."}
          className=" "
        >
          {(sale) => (
            <TableRow key={sale.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "date" ? (
                    sale.date.toDateString()
                  ) : columnKey === "customer" ? (
                    sale.customer?.name
                  ) : columnKey === "products" ? (
                    <div className="flex flex-wrap gap-1">
                      {sale.products.map((product) => (
                        <Chip
                          key={product.id}
                          variant="flat"
                          size="sm"
                          radius="sm"
                        >
                          {product.name} : {product.qty} @ {product.price}
                        </Chip>
                      ))}
                    </div>
                  ) : columnKey === "totalCost" ? (
                    sale.getTotalPrice().toFixed(2)
                  ) : columnKey === "delivery" ? (
                    sale.delivery?.status
                  ) : columnKey === "payment" ? (
                    sale.payment?.amountPaid
                  ) : columnKey === "actions" ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => null}>
                        View
                      </Button>
                      <Button size="sm" color="danger" onClick={() => null}>
                        Delete
                      </Button>
                    </div>
                  ) : (
                    getKeyValue(sale, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export const TransactionsTable = ({
  maxRow,
  label,
  fields,
  filter,
}: TableProps<Sales>) => {
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);
  const TopContent = (
    <h3 className="font-bold">{label ? label : "Transactions"} </h3>
  );
  const BottomContent = <h3 className="font-bold">Recent in stock</h3>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Transaction.getAll();
        maxRow ? setTransactions(data.slice(0, maxRow)) : setTransactions(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load transactions");
      }
    };
    fetchData();
  }, [maxRow]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!transactions) {
    return <div>Loading transactions...</div>;
  }

  const columns = [
    { key: "timestamp", label: "Timestamp" },
    { key: "hash", label: "Transaction hash" },
    { key: "prevHash", label: "Previous hash" },
    { key: "signer", label: "Signer (User)" },
    { key: "data", label: "Data" },
    { key: "actions", label: "Action" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        color="primary"
        radius="sm"
        selectionMode="none"
        aria-label="Transactions table"
        topContent={TopContent}
        // bottomContent={BottomContent}
        classNames={{
          wrapper:
            "card h-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
          table: "",
          tbody: "overflow-y-auto divide-y card rounded-md",
        }}
      >
        <TableHeader
          columns={
            fields ? columns.filter((col) => fields.includes(col.key)) : columns
          }
        >
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={transactions}
          emptyContent={"No rows to display."}
          className=" "
        >
          {(trans) => (
            <TableRow key={trans.hash}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "timestamp" ? (
                    trans.timestamp.toDateString()
                  ) : columnKey === "signer" ? (
                    trans.signer.displayName || trans.signer.email
                  ) : columnKey === "data" ? (
                    <div className="flex flex-wrap gap-1">
                      {/* {trans.data?.map((product) => (
                        <Chip
                          key={product.id}
                          variant="flat"
                          size="sm"
                          radius="sm"
                        >
                          {product.name} : {product.qty} @ {product.price}
                        </Chip>
                      ))} */}
                    </div>
                  ) : (
                    getKeyValue(trans, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
