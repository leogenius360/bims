/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
    // output: 'export',

    sassOptions: {
        includePaths: ["styles"]
    }

    // async redirects() {
    //     return [
    //         {
    //             source: "/",
    //             destination: "/home",
    //             permanent: true,
    //         }
    //     ]
    // }
};

export default nextConfig;
