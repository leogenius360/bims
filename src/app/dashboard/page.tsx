"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";
import { CurrentStockTable, InStock } from "@/components/tables";
import { useAuth, withLoginRequired } from "@/auth/provider";
import { isAdminUser, isDeliveryUser, isSalesUser } from "@/auth/utils";
import { Sales } from "@/db/sales";
import { Stock, StockRequest } from "@/db/product";

const AdminPageWraper = ({ children }: { children: ReactNode }) => {
  return <section className="inline-block w-full px-3">{children}</section>;
};

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [salesExpenses, setSalesExpenses] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [pendingDeliveries, setPendingDeliveries] = useState<number>(0);

  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [pendingStockPayment, setPendingStockPayment] = useState<number>(0);
  const [pendingStock, setPendingStock] = useState<number>(0);

  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [pendingRequests, setPendingRequests] = useState<number>(0);
  const [verifiedRequests, setVerifiedRequests] = useState<number>(0);

  useEffect(() => {
    const fetchSalesStats = async () => {
      const salesData = await Sales.getAll();
      const revenue = salesData.reduce(
        (acc, sale) => acc + (sale.payment?.amountPaid || 0),
        0,
      );
      const expenses = salesData.reduce(
        (acc, sale) => acc + (sale.expenses || 0),
        0,
      );
      const pending = salesData.filter((sale) => sale.isPending()).length;
      const verified = salesData.filter((sale) => sale.isVerified()).length;

      setTotalRevenue(revenue);
      setSalesExpenses(expenses);
      setTotalSales(salesData.length);
      setPendingDeliveries(pending);
    };

    const fetchStockStats = async () => {
      const stockData = await Stock.getAll();
      const expenses = stockData.reduce(
        (exp, stock) => exp + (stock.expenses || 0),
        0,
      );
      const totalStockQty = stockData.reduce(
        (acc, stock) =>
          acc + stock.products.reduce((sum, product) => sum + product.qty, 0),
        0,
      );
      const pending = stockData.filter((stock) =>
        stock.payment?.status
          ? !stock.payment?.status.includes("FullPayment")
          : false,
      ).length;
      const verified = stockData.filter((stock) => !stock.isVerified()).length;

      setTotalExpenses(expenses);
      setTotalStock(totalStockQty);
      setPendingStockPayment(pending);
      setPendingStock(verified);
    };

    const fetchStockRequestStats = async () => {
      const stockRequestData = await StockRequest.getAll();
      const total = stockRequestData.length;
      const pending = stockRequestData.filter((req) => req.pending).length;
      const verified = stockRequestData.filter((req) =>
        req.isVerified(),
      ).length;

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
      <div className="mb-6 flex flex-nowrap justify-between gap-4 md:gap-6">
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

      {/* Other components like InStock */}
      <div className="grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2">
        <InStock />
        <InStock />
      </div>

      <div className="mx-auto my-6 inline-block w-full lg:my-8">
        <div className="grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2 xl:grid-cols-3">
          <div className="card w-full rounded-md border-emerald-200 bg-transparent px-5 py-4 shadow-inner drop-shadow-md dark:border-default">
            <h3 className="py-3 font-bold">Pending in-stock</h3>

            <p>
              Our office is currently in Wa, Ghana&apos;s Upper West Region,
              near RST Café and Pet Vero Guest House – Kpaguri residential
              extension area.
            </p>
          </div>

          <div className="card w-full rounded-md border-emerald-200 bg-transparent px-5 py-4 shadow-inner drop-shadow-md dark:border-default">
            <h3 className="py-3 font-bold">Pending out-stock</h3>

            <p>
              Brainbox Research Institute (BBRI) is a limited liability
              corporate research organization founded to promote academic and
              perhaps educational, community development, and business research
              activities. Students and research fellows in higher education,
              development organisations, and corporate/business entities are
              among our target audiences.
            </p>
          </div>

          <div className="card w-full rounded-md border-emerald-200 bg-transparent px-5 py-4 shadow-inner drop-shadow-md dark:border-default">
            <h3 className="py-3 font-bold">Pending verification</h3>

            <p>
              Our office is currently in Wa, Ghana&apos;s Upper West Region,
              near RST Café and Pet Vero Guest House – Kpaguri residential
              extension area.
            </p>
          </div>
        </div>
      </div>
    </AdminPageWraper>
  );
};

export default withLoginRequired(Dashboard);
