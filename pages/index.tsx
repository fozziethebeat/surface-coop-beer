import fs from "fs";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { arrayOf, shape, string } from "prop-types";
import React from "react";
import styled from "styled-components";

import BeerList from "../components/BeerList";
import Head from "../components/head";
import Nav from "../components/nav";
import getbeers from "../lib/getbeers";

const ContainerDiv = styled.div`
width: 100%;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleDiv = styled.div`
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  width: 100%;
`;

const SubtitleDiv = styled.p`
  text-align: center;
`;

export default function IndexPage({ beers }) {
  return (
    <div>
      <Head title="Home" />

      <Nav />

      <ContainerDiv>
        <ImageDiv>
          <Image src="/Surface.svg" height={360} width={360} />
        </ImageDiv>

        <TitleDiv>Surface Beer</TitleDiv>
        <SubtitleDiv>Checkout the beers so far</SubtitleDiv>
      </ContainerDiv>

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
