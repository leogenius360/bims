"use client";

import { ReactNode, useEffect, useState } from "react";
import { CurrentStockTable, InStock } from "@/components/tables";
import { useAuth, withLoginRequired } from "@/auth/provider";
import { Sales } from "@/db/sales";
import { Stock, StockRequest } from "@/db/product";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const AdminPageWraper = ({ children }: { children: ReactNode }) => {
  return <section className="inline-block w-full px-3">{children}</section>;
};

const Dashboard = () => {
  const [salesData, setSalesData] = useState<Sales[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [salesExpenses, setSalesExpenses] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [pendingDeliveries, setPendingDeliveries] = useState<number>(0);

  const [stockData, setStockData] = useState<Stock[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [pendingStockPayment, setPendingStockPayment] = useState<number>(0);
  const [pendingStock, setPendingStock] = useState<number>(0);

  const [stockRequestData, setStockRequestData] = useState<StockRequest[]>([]);
  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [pendingRequests, setPendingRequests] = useState<number>(0);
  const [verifiedRequests, setVerifiedRequests] = useState<number>(0);

  useEffect(() => {
    const fetchSalesStats = async () => {
      const sales = await Sales.getAll();
      setSalesData(sales);
      const revenue = sales.reduce(
        (acc, sale) => acc + (sale.payment?.amountPaid || 0),
        0,
      );
      const expenses = sales.reduce(
        (acc, sale) => acc + (sale.expenses || 0),
        0,
      );
      const pending = sales.filter((sale) => sale.isPending()).length;
      // const verified = salesData.filter((sale) => sale.isVerified()).length;

      setTotalRevenue(revenue);
      setSalesExpenses(expenses);
      setTotalSales(sales.length);
      setPendingDeliveries(pending);
    };

    const fetchStockStats = async () => {
      const stocks = await Stock.getAll();
      setStockData(stocks);
      const expenses = stocks.reduce(
        (exp, stock) => exp + (stock.expenses || 0),
        0,
      );
      const totalStockQty = stocks.reduce(
        (acc, stock) =>
          acc + stock.products.reduce((sum, product) => sum + product.qty, 0),
        0,
      );
      const pending = stocks.filter((stock) =>
        stock.payment?.status
          ? !stock.payment?.status.includes("FullPayment")
          : false,
      ).length;
      const verified = stocks.filter((stock) => !stock.isVerified()).length;

      setTotalExpenses(expenses);
      setTotalStock(totalStockQty);
      setPendingStockPayment(pending);
      setPendingStock(verified);
    };

    const fetchStockRequestStats = async () => {
      const stockRequests = await StockRequest.getAll();
      setStockRequestData(stockRequests);
      const total = stockRequests.length;
      const pending = stockRequests.filter((req) => req.pending).length;
      const verified = stockRequests.filter((req) => req.isVerified()).length;

      setTotalRequests(total);
      setPendingRequests(pending);
      setVerifiedRequests(verified);
    };

    fetchSalesStats();
    fetchStockStats();
    fetchStockRequestStats();
  }, []);

  const salesTableColumns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "getTotalPrice",
      label: "TOTAL COST",
    },
    {
      key: ["payment", "amountPaid"],
      label: "PAYMENT",
    },
    {
      key: "expenses",
      label: "EXPENSES",
    },
  ];

  const stockTableColumns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "getTotalPrice",
      label: "TOTAL COST",
    },
    {
      key: ["payment", "amountPaid"],
      label: "PAYMENT",
    },
    {
      key: "expenses",
      label: "EXPENSES",
    },
  ];

  return (
    <AdminPageWraper>
      <div className="flex flex-nowrap justify-between gap-4 md:gap-6 px-1">
        {/* Sales Overview Card */}
        <div className="card w-full min-w-64 rounded-md border-2 bg-transparent px-4 shadow-md">
          <h6 className="my-4 text-lg font-bold">Sales Overview</h6>
          <div className="pb-3">
            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Sales Revenue <span className="text-xs">(GHC)</span>:
              </span>
              <span className="text-lg font-semibold">
                {totalRevenue.toLocaleString()}
              </span>
            </div>
            <hr />

            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Sales Expenses <span className="text-xs">(GHC)</span>:
              </span>
              <span className="text-lg font-semibold">
                {salesExpenses.toLocaleString()}
              </span>
            </div>
            <hr />

            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Total Sales <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{totalSales}</span>
            </div>
            <hr />

            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Pending Deliveries <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{pendingDeliveries}</span>
            </div>
            <hr />
          </div>
        </div>

        {/* Stock Overview Card */}
        <div className="card w-full min-w-64 rounded-md border-2 bg-transparent px-4 shadow-md">
          <h6 className="my-4 text-lg font-bold">Stock Overview</h6>
          <div className="pb-3">
            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Stock Expenses <span className="text-xs">(GHC)</span>:
              </span>
              <span className="text-lg font-semibold">
                {totalExpenses.toLocaleString()}
              </span>
            </div>
            <hr />

            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Total Stock <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{totalStock}</span>
            </div>
            <hr />

            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Pending Payment <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">
                {pendingStockPayment}
              </span>
            </div>
            <hr />

            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Pending Stock <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{pendingStock}</span>
            </div>
            <hr />
          </div>
        </div>

        {/* Stock Request Overview Card */}
        <div className="card w-full min-w-64 rounded-md border-2 bg-transparent px-4 shadow-md">
          <h6 className="my-4 text-lg font-bold">Stock Request Overview</h6>
          <div className="pb-3">
            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Total Requests <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{totalRequests}</span>
            </div>
            <hr />

            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Pending Requests <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{pendingRequests}</span>
            </div>
            <hr />

            <div className="my-1 flex flex-nowrap items-center justify-between gap-6">
              <span className="text-sm font-medium">
                Verified Requests <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{verifiedRequests}</span>
            </div>
            <hr />
          </div>
        </div>
      </div>

      {/* Other components like Stock */}
      <div className="mb-3 mt-10 grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2">
        <Table
          color="primary"
          radius="sm"
          selectionMode="single"
          aria-label="Example table with dynamic content"
          topContent={<h3 className="font-bold">Recent sales</h3>}
          // bottomContent={BottomContent}
          classNames={{
            wrapper:
              "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
            base: "",
            table: "card rounded-md",
            tbody: "overflow-y-auto h-full max-h-80",
          }}
        >
          <TableHeader columns={salesTableColumns}>
            {(column) => (
              <TableColumn key={column.label}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={salesData}
            emptyContent={"No sales data to display."}
            className=" "
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Table
          color="primary"
          radius="sm"
          selectionMode="single"
          aria-label="Example table with dynamic content"
          topContent={<h3 className="font-bold">Recent stock</h3>}
          // bottomContent={BottomContent}
          classNames={{
            wrapper:
              "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
            base: "",
            table: "card rounded-md",
            tbody: "overflow-y-auto h-full max-h-80",
          }}
        >
          <TableHeader columns={stockTableColumns}>
            {(column) => (
              <TableColumn key={column.label}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={stockData}
            emptyContent={"No stock data to display."}
            className=" "
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mx-auto my-4 inline-block w-full lg:my-6">
        <Table
          color="primary"
          radius="sm"
          selectionMode="single"
          aria-label="Example table with dynamic content"
          topContent={<h3 className="font-bold">Recent transactions</h3>}
          // bottomContent={BottomContent}
          classNames={{
            wrapper:
              "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
            base: "",
            table: "rounded-md",
            tbody: "overflow-y-auto h-full max-h-80",
          }}
        >
          <TableHeader columns={stockTableColumns}>
            {(column) => (
              <TableColumn key={column.label}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={stockData}
            emptyContent={"No transactions to display."}
            className=" "
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="mt-8 grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2 xl:grid-cols-3">
          <Table
            color="primary"
            radius="sm"
            selectionMode="single"
            aria-label="Example table with dynamic content"
            topContent={<h3 className="font-bold">Products out of stock</h3>}
            // bottomContent={BottomContent}
            classNames={{
              wrapper:
                "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
              base: "",
              table: "rounded-md",
              tbody: "overflow-y-auto h-full max-h-80",
            }}
          >
            <TableHeader columns={salesTableColumns}>
              {(column) => (
                <TableColumn key={column.label}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={salesData}
              emptyContent={"No product out of stock."}
              className=" "
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Table
            color="primary"
            radius="sm"
            selectionMode="single"
            aria-label="Example table with dynamic content"
            topContent={<h3 className="font-bold">Pending stock requests</h3>}
            // bottomContent={BottomContent}
            classNames={{
              wrapper:
                "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
              base: "",
              table: "rounded-md",
              tbody: "overflow-y-auto h-full max-h-80",
            }}
          >
            <TableHeader columns={stockTableColumns}>
              {(column) => (
                <TableColumn key={column.label}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={stockData}
              emptyContent={"No pending stock requests."}
              className=" "
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminPageWraper>
  );
};

export default withLoginRequired(Dashboard);
