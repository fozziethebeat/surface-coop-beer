import Link from "next/link";
import { shape, string } from "prop-types";
import React from "react";

import Card from "./Card";

function BeerItem({ beer }) {
  return (
    <Link as={`/beer/${beer.slug}`} href="/beer/[id]" passHref>
      <Card fontSize="3.75rem" height="13rem" color="black">{beer.name}</Card>
    </Link>
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
