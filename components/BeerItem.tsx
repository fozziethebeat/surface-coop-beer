import Link from "next/link";
import { shape, string } from "prop-types";
import React from "react";

function BeerItem({ beer }) {
  return (
    <li>
      <Link as={`/beer/${beer.slug}`} href="/beer/[id]">
        <a className="hover:bg-blue-200 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 text-6xl text-center border border-gray-200 h-52">
          {beer.name}
        </a>
      </Link>
    </li>
  );
}

BeerItem.propTypes = {
  /**
   * A single beer
   */
  beer: shape({
    slug: string,
    name: string,
  }).isRequired,
};

export default BeerItem;
