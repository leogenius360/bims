"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react"
import { CurrentStockTable, InStock } from "@/components/tables";
import { useAuth, withLoginRequired } from "@/auth/provider";
import { isAdminUser, isDeliveryUser, isSalesUser } from "@/auth/utils";

const AdminPageWraper = ({ children }: { children: ReactNode }) => {
  return <section className="inline-block w-full px-3">{children}</section>;
};

const Dashboard = () => {
  const router = useRouter;
  const { user } = useAuth();

  return (
    <AdminPageWraper>
      {/* <DashboardStats /> */}

      <CurrentStockTable />

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
