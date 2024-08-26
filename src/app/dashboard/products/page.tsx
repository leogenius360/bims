"use client";

import { useAuth, withLoginRequired } from "@/auth/provider";
import { isAdminUser, isSalesUser } from "@/auth/utils";
import { support, internalUrls } from "@/config/site-config";
import { Product } from "@/db/product";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable, {
  createTheme,
  defaultThemes,
  TableStyles,
} from "react-data-table-component";

const customStyles: TableStyles = {
  header: {
    style: {
      minHeight: "3rem",
      borderBottom: "solid 2px #d1fae5",
      // background:"black",
    },
  },
  // tableWrapper: {
  //   style: {
  //     padding: "2rem",
  //     background: "black",
  //   },
  // },
  responsiveWrapper: {
    style: {
      borderRadius: "0",
      background: "black",
    },
  },
};

const ProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[] | null>(null);

  const tableColumns = [
    {
      name: "Latest Update",
      selector: (row: { latestUpdateDate?: Date }) =>
        row.latestUpdateDate?.toUTCString() || "",
      sortable: true,
    },
    {
      name: "Image",
      selector: (row: { imageUrl: string }) => row.imageUrl,
      // sortable: true,
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: { price: number }) => row.price,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row: { stock: any }) => row.stock.qty,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: { category: string }) => row.category,
      sortable: true,
    },
    {
      name: "latest update by",
      selector: (row: { latestUpdateBy?: string }) => row.latestUpdateBy || "",
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Product.getAll();
        setProducts(data);
      } catch (e) {
        throw e;
      }
    };
    fetchData();
  });

  if (!user || (!isAdminUser(user!) && !isSalesUser(user))) {
    return (
      <section className="flex h-[75vh] flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className="text-center font-bold">Access Denied!</h1>
        <p className="text-center">
          Sorry, you don&apos;t have access to this route / page
        </p>

        <div className="text-center">
          <Button
            href={support.phone}
            as={Link}
            color="primary"
            variant="shadow"
          >
            Contact support
          </Button>
        </div>

        <p className="mt-5 text-center">
          <Link href={internalUrls.login} className="text-sky-500">
            login
          </Link>{" "}
          with a defferent credentials
        </p>
      </section>
    );
  }

  const Header = <h6 className="text-sm font-semibold">Products</h6>;

  return (
    <section className="inline-block w-full px-3 lg:px-5">
      <div className="card w-full overflow-hidden rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default">
        <DataTable
          title={Header}
          columns={tableColumns}
          data={products || []}
          // responsive
          striped
          highlightOnHover
          defaultSortFieldId={1}
          // selectableRows
          selectableRowsHighlight
          pagination
          paginationPerPage={50}
          fixedHeader
          fixedHeaderScrollHeight="80vh"
          className="rounded-none"
          // customStyles={customStyles}h
        />
      </div>
    </section>
  );
};

export default withLoginRequired(ProductsPage);
