import fs from "fs";
import path from "path";

import Image from "next/image";
import Link from "next/link";

import BeerList from "../components/BeerList";
import Head from "../components/head";
import Nav from "../components/nav";
import getbeers from "../lib/getbeers";

export default function IndexPage({ beers }) {
  return (
    <div>
      <Head title="Home" />

      <Nav />

      <div className="w-full">
        <div className="flex justify-center">
          <Image src="/static/Surface.svg" height={360} width={360} />
        </div>

        <div className="w-full text-xl text-center">Surface Beer</div>
        <p className="text-center">Checkout the beers so far</p>
      </div>

      <BeerList beers={beers} />
    </div>
  );
}

export async function getStaticProps() {
  const beers = getbeers();
  return {
    props: {
      beers,
    },
  };
}
