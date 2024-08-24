"use client";

import { useAuth, withLoginRequired } from "@/auth/provider";
import { isAdminUser, isSalesUser } from "@/auth/utils";
import { support, internalUrls } from "@/config/site-config";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import DataTable, {
  createTheme,
  defaultThemes,
  TableStyles,
} from "react-data-table-component";

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

const columns1 = [
  {
    name: "Title",
    selector: (row: { title: any }) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row: { year: any }) => row.year,
    sortable: true,
  },
];

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
          columns={columns1}
          data={data}
          responsive
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
          customStyles={customStyles}
        />
      </div>
    </section>
  );
};

export default withLoginRequired(ProductsPage);
