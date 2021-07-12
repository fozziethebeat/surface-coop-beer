import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";

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
  beer: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default BeerItem;
