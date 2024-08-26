"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";
import { CurrentStockTable, InStock } from "@/components/tables";
import { useAuth, withLoginRequired } from "@/auth/provider";
import { isAdminUser, isDeliveryUser, isSalesUser } from "@/auth/utils";
import { Sales } from "@/db/sales";
import { Stock } from "@/db/product";

const AdminPageWraper = ({ children }: { children: ReactNode }) => {
  return <section className="inline-block w-full px-3">{children}</section>;
};

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [pendingDeliveries, setPendingDeliveries] = useState<number>(0);
  const [verifiedSales, setVerifiedSales] = useState<number>(0);

  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [pendingStockPayment, setPendingStockPayment] = useState<number>(0);
  const [pendingStock, setPendingStock] = useState<number>(0);

  useEffect(() => {
    const fetchSalesStats = async () => {
      const salesData = await Sales.getAll();
      const revenue = salesData.reduce(
        (acc, sale) => acc + (sale.payment?.amountPaid || 0),
        0,
      );
      const pending = salesData.filter((sale) => sale.isPending()).length;
      const verified = salesData.filter((sale) => sale.isVerified()).length;

      setTotalRevenue(revenue);
      setTotalSales(salesData.length);
      setPendingDeliveries(pending);
      setVerifiedSales(verified);
    };

    const fetchStockStats = async () => {
      const stockData = await Stock.getAll();
      const cost = await Promise.all(
        stockData.map((stock) => stock.getTotalCost()),
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

      setTotalCost(cost.reduce((acc, c) => acc + c, 0));
      setTotalStock(totalStockQty);
      setPendingStockPayment(pending);
      setPendingStock(verified);
    };

    fetchSalesStats();
    fetchStockStats();
  }, []);

  return (
    <AdminPageWraper>
      <div className="mb-6 flex flex-wrap items-center justify-between">
        {/* Sales Overview Card */}
        <div className="card min-w-64 rounded-md border-2 bg-transparent px-4 py-5 shadow-md">
          <h6 className="mb-4 text-lg font-bold">Sales Overview</h6>
          <div className="">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                Total Revenue <span className="text-xs">(GHC)</span>:
              </span>
              <span className="text-lg font-semibold">
                {totalRevenue.toLocaleString()}
              </span>
            </div>
            <hr />

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                Total Sales <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{totalSales}</span>
            </div>
            <hr />

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                Pending Deliveries <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{pendingDeliveries}</span>
            </div>
            <hr />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Verified Sales <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{verifiedSales}</span>
            </div>
          </div>
        </div>

        {/* Stock Overview Card */}
        <div className="card min-w-64 rounded-md border-2 bg-transparent px-4 py-5 shadow-md">
          <h6 className="mb-4 text-lg font-bold">Stock Overview</h6>
          <div className="">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                Total Cost <span className="text-xs">(GHC)</span>:
              </span>
              <span className="text-lg font-semibold">
                {totalCost.toLocaleString()}
              </span>
            </div>
            <hr />

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                Total Stock <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{totalStock}</span>
            </div>
            <hr />

            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                Pending Payment <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{pendingStockPayment}</span>
            </div>
            <hr />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Pending Stock <span className="text-xs">(QTY)</span>:
              </span>
              <span className="text-lg font-semibold">{pendingStock}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Other components like InStock */}
      <div className="grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2">
        <InStock />
        <InStock />
      </div>

      <div className="mt-5 grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2">
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
