import { arrayOf, shape, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import BeerItem from "./BeerItem";

const BeerSection = styled.section`
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
`;

const BeerUnorderedList = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
`;

function BeerList({ beers }) {
  return (
    <BeerSection>
      <BeerUnorderedList>
        {beers.map((beer) => (
          <BeerItem key={beer.slug} beer={beer} />
        ))}
      </BeerUnorderedList>
    </BeerSection>
  );
}

BeerList.propTypes = {
  beers: arrayOf(
    shape({
      slug: string,
    })
  ).isRequired,
};

export default BeerList;
