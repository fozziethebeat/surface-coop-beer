import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { shape, string } from "prop-types";
import path from "path";
import React from "react";
import styled from "styled-components";

import Head from "../../components/head";
import Nav from "../../components/nav";
import getbeers from "../../lib/getbeers";

const Card = styled.div`
  border-color: rgba(229, 231, 235);
  border-radius: 0.5rem;
  border-style: solid;
  border-width: 1px;
  display: block;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 1rem;
  text-align: center;

  :hover {
    background-color: rgba(219, 234, 254);
  }
`;

const GridDiv = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const Container = styled.div`
  text-align: center;
`;

const Section = styled.section`
  padding-bottom: 0.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
`;

const SubSection = styled.div`
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
`;

const Header1 = styled.div`
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const Header2 = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
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

            <SubSection>
              <Header2>Malts</Header2>
              <GridDiv>
                {beer.ingredients.fermentable_additions.map((malt) => (
                  <Card key={malt.name}>
                    {malt.name} {malt.amount.value} {malt.amount.unit}
                  </Card>
                ))}
              </GridDiv>
            </SubSection>

            <SubSection>
              <Header2>Hops</Header2>
              <GridDiv>
                {beer.ingredients.hop_additions.map((hop, index) => (
                  <Card key={index}>
                    {hop.name} {hop.amount.value} {hop.amount.unit} @{" "}
                    {hop.timing.time.value} {hop.timing.time.unit}
                  </Card>
                ))}
              </GridDiv>
            </SubSection>

            <SubSection>
              <Header2>Yeasts</Header2>
              <GridDiv>
                {beer.ingredients.culture_additions.map((yeast) => (
                  <Card key={yeast.name}>{yeast.name}</Card>
                ))}
              </GridDiv>
            </SubSection>
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
