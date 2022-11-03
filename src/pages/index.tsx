import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";

const ConnectButtonDynamic = dynamic(
  async () => (await import("@rainbow-me/rainbowkit")).ConnectButton,
  { ssr: false }
);

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div>
      <Head>
        <title>Pixels</title>
        <meta name="description" content="Just random pixels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-500 md:text-[5rem]">
          Mint Pixel Pack
        </h1>
        <div className="h-2"></div>
        <ConnectButtonDynamic />
      </main>
    </div>
  );
};

export default Home;
