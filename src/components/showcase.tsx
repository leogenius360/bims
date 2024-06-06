"use client";

import Link from "next/link";
import { Button, Card, CardBody, Image, Tab, Tabs } from "@nextui-org/react";
import { FiChevronsRight } from "react-icons/fi";

function buldTabItem() {
  return (
    <div className="card flex w-full flex-row rounded border-emerald-200 shadow-inner drop-shadow-md hover:underline hover:shadow-md dark:border-default">
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

interface TabProps {}

function buildTabContent({ tabItems }: any) {
  const tabContent = (
    <>
      <Link href={"/"}>{buldTabItem()}</Link>

      <Link href={"/"}>{buldTabItem()}</Link>

      <Link href={"/"}>{buldTabItem()}</Link>

      <Link href={"/"}>{buldTabItem()}</Link>
    </>
  );
  return tabContent;
}

export const ShowcaseTab = () => {
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
        wrapper:
          "max-w-screen-2xl mx-auto gap-3 flex-wrap lg:flex-nowrap justify-between py-5",
        base: "w-full",
        tabList:
          "gap-6 overflow-x-auto scrollbar custom-scrollbar thumb-none p-0 ",
        tab: "font-bold px-0 py-6",
        tabContent: "dark:text-white group-data-[selected=true]:text-primary",
        cursor: "w-full bg-primary rounded-md",
        panel:
          "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-3 lg:gap-5 px-0 py-6",
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
    <div className="card xs:min-w-80 mb-2 flex min-w-full snap-start flex-row rounded border-emerald-200 shadow-inner dark:border-default">
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
    <div className="mx-auto max-w-screen-2xl">
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
