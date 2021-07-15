import fs from "fs";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { arrayOf, shape, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import BeerList from "../components/BeerList";
import Container from "../components/Container";
import Header2 from "../components/Header2";
import Title from "../components/Title";
import Head from "../components/head";
import Nav from "../components/nav";
import getbeers from "../lib/getbeers";

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default function IndexPage({ beers }) {
  return (
    <div>
      <Head title="Home" />

      <Nav />

      <Container>
        <ImageDiv>
          <Image alt="Suface" src="/Surface.svg" height={360} width={360} />
        </ImageDiv>

        <Title>Surface Beer</Title>
        <Header2>Checkout the beers so far</Header2>
      </Container>

      <BeerList beers={beers} />
    </div>
  );
}

IndexPage.propTypes = {
  beers: arrayOf(
    shape({
      slug: string,
    })
  ).isRequired,
};

export const getStaticProps: GetStaticProps = async () => {
  const beers = getbeers();
  return {
    props: {
      beers,
    },
  };
};
