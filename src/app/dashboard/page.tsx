"use client";

import { Image } from "@nextui-org/react";
import { DashboardStats, StockOverview } from "@/components/showcase";
import { Logo } from "@/components/icons";
import { allowedUsers, siteConfig } from "@/config/site-config";
import { InStock } from "@/components/tables";
import { useAuth, withLoginRequired } from "@/auth/provider";
import { useRouter } from "next/navigation";
import { isAdminUser, isDeliveryUser, isSalesUser } from "@/auth/utils";
import { ReactNode } from "react";

const AdminPageWraper = ({ children }: { children: ReactNode }) => {
  return <div className="px-3">{children}</div>;
};

const Dashboard = () => {
  const router = useRouter;
  const { user } = useAuth();

  if (user && isAdminUser(user!)) {
    return (
      <AdminPageWraper>
        <section className="">
          <DashboardStats />

          <div className="grid w-full grid-flow-row gap-3 bg-transparent lg:grid-cols-2">
            <InStock />

            <InStock />
          </div>

          <StockOverview />

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
                  corporate research organization founded to promote academic
                  and perhaps educational, community development, and business
                  research activities. Students and research fellows in higher
                  education, development organisations, and corporate/business
                  entities are among our target audiences.
                </p>
                <p>
                  Brainbox Research Institute (BBRI) is a limited liability
                  corporate research organization founded to promote academic
                  and perhaps educational, community development, and business
                  research activities. Students and research fellows in higher
                  education, development organisations, and corporate/business
                  entities are among our target audiences.
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
        </section>
      </AdminPageWraper>
    );

  } else if (isSalesUser(user!)) {
    return (
      <AdminPageWraper>
        <h3>SALES PERSON DASHBOARD</h3>{" "}
      </AdminPageWraper>
    );

  } else if (isDeliveryUser(user!)) {
    return (
      <AdminPageWraper>
        {" "}
        <h3>DELIVERY PERSON DASHBOARD</h3>
      </AdminPageWraper>
    );

  } else return <AdminPageWraper> </AdminPageWraper>;
};

export default withLoginRequired(Dashboard);
