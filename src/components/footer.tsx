import Link from "next/link";
import { siteFooter } from "@/config/site-config";

export const Footer = () => {
  return (
    <footer className="card mt-auto border-0 border-t-1 border-emerald-200 px-4 py-3 shadow-inner shadow-emerald-50 dark:border-default dark:shadow-default">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-between">
        <div className="inline-flex flex-nowrap gap-x-6">
          {siteFooter.termsAndConditions.map((item) => (
            <Link
              target="blank"
              key={item.href}
              className="flex flex-wrap items-center gap-1 text-current underline-offset-2 hover:text-sky-600 hover:underline"
              href={item.href}
              title={item.label}
            >
              <small className="font-bold"> {item.label} </small>
            </Link>
          ))}
        </div>

        <div className="inline-flex flex-nowrap gap-x-6">
          {siteFooter.socialLinks.map((item) => (
            <Link
              target="blank"
              key={item.href}
              className="flex flex-wrap items-center gap-1 text-current underline-offset-2 hover:text-sky-600 hover:underline"
              href={item.href}
              title={item.label}
            >
              <small className="font-bold"> {item.label} </small>
            </Link>
          ))}
        </div>

        <Link
          target="blank"
          className="flex flex-wrap items-center gap-1 text-current underline-offset-2 hover:text-sky-600 hover:underline"
          href={siteFooter.developer.href}
          title={siteFooter.developer.label}
        >
          <small className="font-bold"> {siteFooter.developer.label} </small>
        </Link>
      </div>
    </footer>
  );
};
