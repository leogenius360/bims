"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  ProductsTable,
  SalesTable,
  StockRequestsTable,
  StocksTable,
  TransactionsTable,
} from "@/components/tables";
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
import { isAdminUser, isDeliveryUser, isSalesUser } from "@/auth/utils";

const AdminPageWraper = ({ children }: { children: ReactNode }) => {
  return <section className="inline-block w-full px-3">{children}</section>;
};

const Dashboard = () => {
  const { user } = useAuth();

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

  return (
    <AdminPageWraper>
      {!isDeliveryUser(user) && (
        <div className="flex flex-nowrap justify-between gap-4 px-1 md:gap-6">
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
                <span className="text-lg font-semibold">
                  {pendingDeliveries}
                </span>
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
                <span className="text-lg font-semibold">
                  {verifiedRequests}
                </span>
              </div>
              <hr />
            </div>
          </div>
        </div>
      )}
      <div className="mt-6 lg:mt-10">
        <SalesTable
          label="Recent sales"
          maxRow={15}
          // fields={["date", "customer", "processedBy"]}
        />
      </div>

      {/* Other components like Stock */}
      <div className="mb-3 mt-10 grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2">
        <StocksTable
          label="Recent stocks"
          maxRow={5}
          fields={["date", "supplier", "processedBy"]}
        />

        <StockRequestsTable
          label="Recent stock requests"
          maxRow={5}
          fields={["date", "supplier", "processedBy"]}
        />
      </div>

      <div className="mx-auto my-4 inline-block w-full lg:my-6">
        {isAdminUser(user) && (
          <TransactionsTable label="Recent transactions" maxRow={15} />
        )}

        {isSalesUser(user) && (
          <ProductsTable
            label="Resently added products"
            maxRow={15}
            // fields={["name", "category", "stock"]}
          />
        )}

        {isDeliveryUser(user) && (
          <SalesTable
            label="Pending delivery"
            maxRow={15}
            // fields={["date", "customer", "processedBy"]}
          />
        )}
        <div className="grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2">
          <ProductsTable
            label="Products out of stock"
            fields={["name", "category", "stock"]}
          />

          {isAdminUser(user) && (
            <StockRequestsTable
              label="Recent stock requests"
              maxRow={5}
              fields={["date", "supplier", "processedBy"]}
            />
          )}

          {isSalesUser(user) && (
            <StockRequestsTable
              label="Recent stock requests"
              maxRow={5}
              fields={["date", "supplier", "processedBy"]}
            />
          )}
        </div>
      </div>
    </AdminPageWraper>
  );
};

export default withLoginRequired(Dashboard);
