import Link from "next/link";
import { shape, string } from "prop-types";
import React from "react";
import styled from "styled-components";

const BeerLink = styled.a`
  :hover {
    background-color: rgba(191, 219, 254);
    border-color: transparent;
  }

  border-color: rgba(229, 231, 235);
  border-radius: 0.5rem;
  border-style: solid;
  border-width: 1px;
  color: black;
  box-sizing: border-box;
  display: block;
  float: none;
  font-size: 3.75rem;
  height: 13rem;
  line-height: 60px;
  padding: 1rem;
  positin: static;
  text-decoration: none;
  text-align: center;
  z-index: auto;
`;

function BeerItem({ beer }) {
  return (
    <li>
      <Link as={`/beer/${beer.slug}`} href="/beer/[id]" passHref>
        <BeerLink>{beer.name}</BeerLink>
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
