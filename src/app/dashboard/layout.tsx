"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import clsx from "clsx";
import { dashboardNavItems } from "@/config/site-config";
import useWindowSize from "@/lib/window_size";
import DashboardHeader from "@/components/headers/dashboard-header";
import { useAuth } from "@/auth/provider";
import { isAdminUser, isDeliveryUser } from "@/auth/utils";
import { Button } from "@nextui-org/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const pathname = usePathname();
  const [error, setError] = useState<string | null>(null); // Error state
  const [isMenuOpen, setIsMenuOpen] = useState(
    width && width < 1024 ? false : true,
  );

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination state
  const itemsPerPage = 8; // Number of items per page

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  // Filter products based on selected categories/tags and search term
  // const filteredProducts = useMemo(() => {
  //   return products.filter((product) => {
  //     const matchesCategory = selectedValue
  //       ? selectedValue
  //           .toLowerCase()
  //           .includes(product.category.toLowerCase()) ||
  //         selectedValue.toLowerCase().includes(product.name.toLowerCase())
  //       : true;

  //     const matchesSearch = searchTerm
  //       ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         product.description.toLowerCase().includes(searchTerm.toLowerCase())
  //       : true;

  //     return matchesCategory && matchesSearch;
  //   });
  // }, [products, selectedValue, searchTerm]);

  // Paginate filtered products
  // const paginatedProducts = useMemo(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  // }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <>
      <section className="relative inline-flex gap-1">
        <aside
          className={clsx(
            "custom-scrollbar z-50 me-1 bg-white dark:bg-black",
            { ["hidden"]: !isMenuOpen },
            {
              ["sticky inset-y-0 left-0 top-16 h-full lg:w-2/12"]:
                isMenuOpen && width && width > 1024,
            },
            {
              ["fixed inset-0 top-16"]: isMenuOpen && width && width <= 1024,
            },
          )}
        >
          <div className="flex h-full flex-row-reverse items-start gap-2 py-2">
            <button
              aria-label="Dashboard Menu"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              // className={clsx({ ["hidden"]: width && width >= 768 })}
              className="ms-auto px-2 py-2"
            >
              {isMenuOpen ? <FiX size={22} /> : null}
            </button>

            <ul className="flex w-11/12 flex-col gap-3 ps-3">
              {dashboardNavItems.map((item) => (
                <li
                  key={item.href}
                  className={clsx(
                    "rounded-sm font-medium shadow-sm hover:shadow-emerald-400 dark:hover:shadow-slate-500",
                    {
                      ["shadow-emerald-400 dark:shadow-slate-500"]:
                        item.href === pathname,
                      ["hidden"]:
                        (["transactions", "stock requests"].includes(
                          item.label.toLowerCase(),
                        ) &&
                          !isAdminUser(user!)) ||
                        (item.label.toLowerCase() === "sales" &&
                          isDeliveryUser(user!)),
                    },
                  )}
                >
                  <NextLink
                    color="foreground"
                    href={item.href}
                    className="inline-block w-full px-3 py-1 text-sm font-semibold"
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
              {isAdminUser(user) ? (
                <li>
                  <Button
                    data-bs-toggle="offcanvas"
                    data-bs-target="#newProductCategoryForm"
                    aria-controls="newProductCategoryForm"
                    size="sm"
                    radius="sm"
                    color="primary"
                    variant="ghost"
                    // startContent={<FiPlus className="" />}
                    className="mt-3 w-full text-sm font-semibold dark:text-white"
                  >
                    <span className="hidden sm:flex">Categories</span>
                  </Button>
                </li>
              ) : null}
            </ul>
          </div>
        </aside>
        <main
          className={clsx(
            "w-full border-emerald-200 pb-6 dark:border-default",
            {
              ["sticky inset-y-0 right-0 border-l-1 lg:w-10/12"]: isMenuOpen,
            },
          )}
        >
          <DashboardHeader
            user={user!}
            keys={["Today", "This week", "Last week", "This month"]}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            selectedValue={selectedValue}
            onSearchEnter={(e) => setSearchTerm(e.target.value)}
            searchValue={searchTerm}
            valueToggler={setIsMenuOpen}
            value={isMenuOpen}
          />
          {children}
        </main>
      </section>
    </>
  );
}
