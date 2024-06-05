import { Image } from "@nextui-org/react";
import { ShowcaseTab } from "@/components/showcase";
import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto px-3">
        <ShowcaseTab />
      </section>

      <section className="px-3">
        <div className="max-w-screen-2xl mx-auto">
          <h3 className="font-bold py-3">Current stock overview</h3>

          <div className="flex flex-nowrap gap-3 w-full custom-scrollbar overflow-x-auto scroll-mt-6 snap-x">
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-12 px-3">
        <div className="max-w-screen-2xl mx-auto my-6 lg:my-8">
          <div className=" bg-transparent grid sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-3 w-full">
            <div className="card rounded-md bg-transparent w-full px-5 py-4 border-emerald-200 dark:border-default drop-shadow-md shadow-inner">
              <h3 className="font-bold py-3">Pending in-stock</h3>

              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>

            <div className="card rounded-md bg-transparent w-full px-5 py-4 border-emerald-200 dark:border-default drop-shadow-md shadow-inner">
              <h3 className="font-bold py-3">Pending out-stock</h3>

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

            <div className="card rounded-md bg-transparent w-full px-5 py-4 border-emerald-200 dark:border-default drop-shadow-md shadow-inner">
              <h3 className="font-bold py-3">You tasks</h3>

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
