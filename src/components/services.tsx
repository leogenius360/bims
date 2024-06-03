"use client"

import React from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import { Image, Tabs, Tab, Card, CardBody, CardHeader, Button } from "@nextui-org/react";


function tabContent() {
    return (
        <>
            <div className="flex flex-col-reverse md:flex-row gap-y-3 gap-x-5">
                <div className="w-full text-default-600 px-1">
                    {/* <small className="text-xs font-bold inline-block pb-1">TYPE HERE</small> */}
                    <p className="leading-relaxed font-medium custom-scrollbar overflow-y-auto max-h-80 pe-3">
                        Some quick example text to build on the card title and make up the bulk of the car&apos;s content.
                        Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don&apos;t get audited.
                        Some quick example text to build on the card title and make up the bulk of the car&apos;s content.
                        Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don&apos;t get audited.
                        Some quick example text to build on the card title and make up the bulk of the car&apos;s content.
                        Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don&apos;t get audited.
                        Some quick example text to build on the card title and make up the bulk of the car&apos;s content.
                        Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don&apos;t get audited.
                        Some quick example text to build on the card title and make up the bulk of the car&apos;s content.
                        Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don&apos;t get audited.
                    </p>
                </div>

                {/* <NextImage width="100" height="100" src="/images/timeflies.png"
                    className="w-2/5 xl:w-2/5 object-cover h-full rounded-md" alt="Alt" /> */}

                <Image classNames={{ wrapper: "w-2/5 xl:w-2/5", img: "object-cover h-full rounded-md" }} radius='none'
                    src="/images/timeflies.png"
                    fallbackSrc="https://via.placeholder.com/300x200"
                    alt="NextUI Image with fallback"
                />
            </div>

            <div className="w-full mt-6 px-1">
                <small className="font-bold inline-block pb-1">TYPE HERE</small>
                <p className="leading-tight font-semibold">
                    Some quick example text to build on the card title and make up the bulk of the car&apos;s content.
                </p>
            </div>
        </>
    )
}


export const ServiceOverview = () => {
    let tabs = [
        {
            id: "whatsNew",
            label: "Academic services",
            content: tabContent(),
        },
        {
            id: "events",
            label: "Community development services",
            content: tabContent(),
        },
        {
            id: "resources",
            label: "Corporate services",
            content: tabContent(),
        },
        {
            id: "events2",
            label: "Community development services",
            content: tabContent(),
        },
        {
            id: "whatsNew2",
            label: "Academic services",
            content: tabContent(),
        },
    ];

    return (
        <>
            <div className="max-w-screen-sm mx-auto text-center pt-6 lg:pt-10">
                <h3 className="font-bold font-mono text-lg md:text-2xl py-1">
                    You Altimate Research Institute
                </h3>
                <p className="text-sm">
                    Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don&apos;t get audited.
                </p>
            </div>

            <Tabs
                placement="start"
                aria-label="Services tab"
                items={tabs} variant="light"
                classNames={{
                    wrapper: "max-w-screen-2xl mx-auto gap-4 gap-x-6 flex-wrap lg:flex-nowrap justify-between py-6",
                    base: "w-full lg:w-2/5 lg:max-w-80 justify-end",
                    tabList: "w-full flex-row lg:flex-col lg:border dark:border-black rounded-md text-sm p-0 lg:py-0 lg:p-6 h-full shadow-md",
                    tab: "font-bold lg:text-start data-[focus-visible=true]:outline-1 data-[focus-visible=true]:outline-offset-1 py-3",
                    tabContent: "w-full text-white",
                    cursor: "bg-white dark:bg-black rounded",
                    panel: "w-full text-black dark:text-white card dark:bg-black rounded-lg py-6 px-4"
                }}
            >
                {(item) => (
                    <Tab key={item.id} title={item.label} className="focus-ring-primary">
                        {item.content}
                    </Tab>
                )}
            </Tabs>

            <div className="w-full mx-auto text-center">
            <Button as={NextLink} href="/" variant="light" color="primary"
                className="w-full md:w-1/2 rounded-md hover:border border-white text-white font-bold underline hover:no-underline underline-offset-8 py-3 mt-4">
                Check out our service page for details
            </Button>
            </div>
        </>
    );
}
