import { Image } from "@nextui-org/react";
import { DashboardStats, StockOverview } from "@/components/showcase";
import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto px-3">
        <DashboardStats />
      </section>

      <section className="max-w-screen-2xl mx-auto px-3 xl:px-0">
        <div className="grid w-full grid-flow-row gap-3 bg-transparent sm:grid-cols-2 lg:grid-cols-3">
          <div className="card w-full rounded-md border-emerald-200 bg-transparent px-5 py-4 shadow-inner drop-shadow-md dark:border-default">
            <h3 className="py-3 font-bold">Resent in-stock</h3>

            <p>
              Our office is currently in Wa, Ghana&apos;s Upper West Region,
              near RST Café and Pet Vero Guest House – Kpaguri residential
              extension area.
            </p>
          </div>

          <div className="card w-full rounded-md border-emerald-200 bg-transparent px-5 py-4 shadow-inner drop-shadow-md dark:border-default">
            <h3 className="py-3 font-bold">Resent out-stock</h3>

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
            <h3 className="py-3 font-bold">Your tasks</h3>

            <p>
              Our office is currently in Wa, Ghana&apos;s Upper West Region,
              near RST Café and Pet Vero Guest House – Kpaguri residential
              extension area.
            </p>
          </div>
        </div>
      </section>

      <section className="my-6 px-3">
        <StockOverview />
      </section>

      <section className="my-8 px-3 lg:my-12">
        <div className="mx-auto my-6 max-w-screen-2xl lg:my-8">
          <div className="grid w-full grid-flow-row gap-3 bg-transparent sm:grid-cols-2 lg:grid-cols-3">
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
                perhaps educational, community development, and business
                research activities. Students and research fellows in higher
                education, development organisations, and corporate/business
                entities are among our target audiences.
              </p>
              <p>
                Brainbox Research Institute (BBRI) is a limited liability
                corporate research organization founded to promote academic and
                perhaps educational, community development, and business
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
    </>
  );
}
