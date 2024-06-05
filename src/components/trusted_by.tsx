import { siteConfig } from "@/config/site";
import { Logo } from "./icons";


export const TrustedBy = () => {
    return (
        <>
            <h3 className="font-semibold font-mono text-sm lg:text-base py-6">
                <span className="text-emerald-600">Trusted by </span> these institutions so far
            </h3>
            <ul className="flex flex-wrap justify-center gap-4 gap-y-1 font-bold text-sm md:text-base lg:text-lg">
                <li className="flex flex-nowrap items-center">
                    <Logo />
                    <p aria-label="Brainbox Research Institute">{siteConfig.name}</p>
                </li>
                <li className="flex flex-nowrap items-center">
                    <Logo />
                    <p aria-label="Brainbox Research Institute">{siteConfig.name}</p>
                </li>
                <li className="flex flex-nowrap items-center">
                    <Logo />
                    <p aria-label="Brainbox Research Institute">{siteConfig.name}</p>
                </li>
                <li className="flex flex-nowrap items-center">
                    <Logo />
                    <p aria-label="Brainbox Research Institute">{siteConfig.name}</p>
                </li>
                <li className="flex flex-nowrap items-center">
                    <Logo />
                    <p aria-label="Brainbox Research Institute">{siteConfig.name}</p>
                </li>
            </ul>
        </>
    )
}