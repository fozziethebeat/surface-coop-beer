import { arrayOf, shape, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import BeerItem from "./BeerItem";
import Section from "./Section";

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

function BeerList({ beers }) {
  return (
    <Section>
      <Grid>
        {beers.map((beer) => (
          <BeerItem key={beer.slug} beer={beer} />
        ))}
      </Grid>
    </Section>
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
