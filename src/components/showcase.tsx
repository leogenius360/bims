"use client"

import Link from 'next/link';
import { Button, Card, CardBody, Image, Tab, Tabs } from "@nextui-org/react";
import { FiChevronsRight } from 'react-icons/fi';


function buldTabItem() {
    return (
        <div className="card w-full flex flex-row hover:underline rounded border-orange-200 dark:border-default drop-shadow-md hover:shadow-md shadow-inner">
            <Image classNames={{ img: "object-cover max-w-[6em] h-full rounded-l-md" }} radius='none'
                src="/images/timeflies.png"
                fallbackSrc="https://via.placeholder.com/300x200"
                alt="NextUI Image with fallback"
            />

            <div className="text-xs px-2 lg:px-3">
                <small className="font-bold text-primary inline-block py-1">TYPE HERE</small>
                <p className="text-medium leading-tight font-semibold pb-2 ">Some quick example text to build on the card title and make up the bulk of the car&apos;s content.</p>
            </div>
        </div>
    )
}

interface TabProps {

}

function buildTabContent({ tabItems }: any) {

    const tabContent = (
        <>
            <Link href={"/"}>
                <div className="card w-full flex flex-row hover:underline rounded border-orange-200 dark:border-default drop-shadow-md hover:shadow-md shadow-inner">
                    <Image classNames={{ img: "object-cover max-w-[6em] h-full rounded-l-md" }} radius='none'
                        src="/images/timeflies.png"
                        fallbackSrc="https://via.placeholder.com/300x200"
                        alt="NextUI Image with fallback"
                    />

                    <div className="text-xs px-2 lg:px-3">
                        <small className="font-bold text-primary inline-block py-1">TYPE HERE</small>
                        <p className="text-medium leading-tight font-semibold pb-2 ">Some quick example text to build on the card title and make up the bulk of the car&apos;s content.</p>
                    </div>
                </div>
            </Link>

            <Link href={"/"}>
                {buldTabItem()}
            </Link>

            <Link href={"/"}>
                {buldTabItem()}
            </Link>

            <Link href={"/"}>
                {buldTabItem()}
            </Link>

        </>
    )
    return tabContent
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
            content: buildTabContent(1)
        },
        {
            id: "week",
            label: "This week's overview",
            content: buildTabContent(2)
        },
        {
            id: "month",
            label: "This month's overview",
            content: buildTabContent(3)
        }
    ];

    return (
        <Tabs aria-label="New and trending activities tab" placement="top" items={tabs} variant="underlined"
            classNames={{
                wrapper: "max-w-screen-2xl mx-auto gap-3 flex-wrap lg:flex-nowrap justify-between py-5",
                base: "w-full",
                tabList: "gap-6 overflow-x-auto scrollbar custom-scrollbar thumb-none p-0 ",
                tab: "font-bold px-0 py-6",
                tabContent: "dark:text-white group-data-[selected=true]:text-primary",
                cursor: "w-full bg-primary rounded-md",
                panel: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-3 lg:gap-5 px-0 py-6"
            }}>
            {(item) => (
                <Tab key={item.id} title={item.label} className=''>
                    {item.content}
                </Tab>
            )}
        </Tabs>
    );
}
