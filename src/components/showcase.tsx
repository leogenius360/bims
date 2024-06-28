"use client";

import Link from "next/link";
import { Button, Card, CardBody, Image, Tab, Tabs } from "@nextui-org/react";
import { FiChevronsRight } from "react-icons/fi";

function buldStatItem({
  title,
  currentFigure,
  diff,
}: {
  title: string;
  currentFigure: number;
  diff: number;
}) {
  return (
    <div className="card flex w-full flex-row rounded border-emerald-200 shadow-inner drop-shadow-md hover:shadow-md dark:border-default">
      <div className="w-full px-3 py-2 text-xs">
        <h6 className="inline-block py-1 font-bold text-primary">{title}</h6>
        <div className="flex w-full items-baseline">
          <span className="mr-auto text-2xl font-bold">{currentFigure}</span>
          <small className="text-xs font-bold">{diff} </small>
        </div>
      </div>
    </div>
  );
}

interface TabProps {}

function buildTabContent({ tabItems }: any) {
  const tabContent = (
    <>
      {buldStatItem({
        title: "TOTAL REVENUE (GHC)",
        currentFigure: 6833,
        diff: 16,
      })}
      {buldStatItem({
        title: "TOTAL OUT-STOCK (QTY)",
        currentFigure: 126,
        diff: 16,
      })}
      {buldStatItem({
        title: "TOTAL IN-STOCK (QTY)",
        currentFigure: 126,
        diff: 16,
      })}
      {buldStatItem({
        title: "TOTAL EXPENSES (GHC)",
        currentFigure: 126,
        diff: 16,
      })}
      {buldStatItem({
        title: "TOTAL TRANSACTIONS (QTY)",
        currentFigure: 126,
        diff: 16,
      })}
      {buldStatItem({
        title: "PENDING VERIFICATION (QTY)",
        currentFigure: 126,
        diff: 16,
      })}
      {buldStatItem({
        title: "INVALID TRANSACTIONS (QTY)",
        currentFigure: 126,
        diff: 16,
      })}
    </>
  );
  return tabContent;
}

export const DashboardStats = () => {
  // const getTabs = [3, 3, 3]

  // let tabs: any = []

  // getTabs.forEach(tab => {
  //     tabs.push(buildTabContent(tab));
  // });

  let tabs = [
    {
      id: "today",
      label: "Today's overview",
      content: buildTabContent(1),
    },
    {
      id: "week",
      label: "This week's overview",
      content: buildTabContent(2),
    },
    {
      id: "month",
      label: "This month's overview",
      content: buildTabContent(3),
    },
  ];

  return (
    <Tabs
      aria-label="New and trending activities tab"
      placement="top"
      items={tabs}
      variant="underlined"
      classNames={{
        wrapper: "mx-auto gap-3 flex-wrap lg:flex-nowrap justify-between py-5",
        base: "w-full",
        tabList:
          "gap-6 overflow-x-auto scrollbar custom-scrollbar thumb-none p-0 ",
        tab: "font-bold px-0 py-6",
        tabContent: "dark:text-white group-data-[selected=true]:text-primary",
        cursor: "w-full bg-primary rounded-md",
        panel:
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-row gap-3 lg:gap-5 px-0 py-6",
      }}
    >
      {(item) => (
        <Tab key={item.id} title={item.label} className="">
          {item.content}
        </Tab>
      )}
    </Tabs>
  );
};

function buldStockItemOverview() {
  return (
    <div className="card mb-2 flex min-w-full snap-start flex-row rounded border-emerald-200 shadow-inner xs:min-w-80 dark:border-default">
      <Image
        classNames={{
          img: "object-cover max-w-[6em] h-full rounded-l-md",
        }}
        radius="none"
        src="/images/timeflies.png"
        fallbackSrc="https://via.placeholder.com/300x200"
        alt="NextUI Image with fallback"
      />

      <div className="px-2 text-xs lg:px-3">
        <small className="inline-block py-1 font-bold text-primary">
          TYPE HERE
        </small>
        <p className="pb-2 text-medium font-semibold leading-tight">
          Some quick example text to build on the card title and make up the
          bulk of the car&apos;s content.
        </p>
      </div>
    </div>
  );
}

export const StockOverview = () => {
  return (
    <div className="mx-auto my-5 inline-block w-full">
      <h3 className="py-3 font-bold text-primary">
        Current stock overview
        <hr className="h-[0.16rem] w-44 bg-primary" />
      </h3>

      <div className="custom-scrollbar flex w-full snap-x flex-nowrap gap-3 overflow-x-auto">
        {buldStockItemOverview()}
        {buldStockItemOverview()}
        {buldStockItemOverview()}
        {buldStockItemOverview()}
        {buldStockItemOverview()}
        {buldStockItemOverview()}
        {buldStockItemOverview()}
        {buldStockItemOverview()}
      </div>
    </div>
  );
};
