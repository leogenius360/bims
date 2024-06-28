"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export const InStock = () => {
  const TopContent = <h3 className="font-bold">Resent in-stock</h3>;
  const BottomContent = <h3 className="font-bold">Resent in-stock</h3>;
  return (
    <Table
      color="primary"
      radius="sm"
      selectionMode="single"
      aria-label="Example table with dynamic content"
      topContent={TopContent}
      // bottomContent={BottomContent}
      classNames={{
        wrapper:
          "card w-full rounded-md border-emerald-200 bg-transparent shadow-inner drop-shadow-md dark:border-default",
        base: "",
          table: "card rounded-md",
        tbody: "overflow-y-auto h-72 max-h-80"
        
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={"No rows to display."} className=" ">
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
