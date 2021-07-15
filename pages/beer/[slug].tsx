import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { shape, string } from "prop-types";
import path from "path";
import React from "react";
import styled from "styled-components";

import Card from "../../components/Card";
import Container from "../../components/Container";
import Header1 from "../../components/Header1";
import Header2 from "../../components/Header2";
import Section from "../../components/Section";
import Subsection from "../../components/Subsection";
import Title from "../../components/Title";
import Head from "../../components/head";
import Nav from "../../components/nav";
import getbeers from "../../lib/getbeers";

const GridDiv = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export default function Beer({ beer }) {
  return (
    <div>
      <Head title={beer.name} />

      <Nav />

      <Container>
        <Section>
          <Title>{beer.name}</Title>
          <div>
            <Header1>Ingredients</Header1>

            <Subsection>
              <Header2>Malts</Header2>
              <GridDiv>
                {beer.ingredients.fermentable_additions.map((malt) => (
                  <Card font-size="1rem" key={malt.name}>
                    {malt.name} {malt.amount.value} {malt.amount.unit}
                  </Card>
                ))}
              </GridDiv>
            </Subsection>

            <Subsection>
              <Header2>Hops</Header2>
              <GridDiv>
                {beer.ingredients.hop_additions.map((hop, index) => (
                  <Card font-size="1rem" key={index}>
                    {hop.name} {hop.amount.value} {hop.amount.unit} @{" "}
                    {hop.timing.time.value} {hop.timing.time.unit}
                  </Card>
                ))}
              </GridDiv>
            </Subsection>

            <Subsection>
              <Header2>Yeasts</Header2>
              <GridDiv>
                {beer.ingredients.culture_additions.map((yeast) => (
                  <Card font-size="1rem" key={yeast.name}>{yeast.name}</Card>
                ))}
              </GridDiv>
            </Subsection>
          </div>
        </Section>
      </Container>
    </div>
  );
}

Beer.propTypes = {
  beer: shape({
    slug: string,
  }).isRequired,
};

export const getStaticPaths: GetStaticPaths = async () => {
  const beers = getbeers();
  return {
    paths: beers.map((beer) => ({
      params: {
        slug: beer.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const filePath = path.join(
    process.cwd(),
    "data/recipes",
    context.params.slug + ".json"
  );
  const beerJson = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const recipe = beerJson.beerjson.recipes[0];
  recipe.slug = context.params.slug;
  return { props: { beer: recipe } };
};
