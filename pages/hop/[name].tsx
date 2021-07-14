import { GetServerSideProps } from "next";
import { shape, string } from "prop-types";
import styled from "styled-components";

import { PrismaClient } from "@prisma/client";

import Head from "../../components/head";
import Nav from "../../components/nav";

const prisma = new PrismaClient();

const ContainerDiv = styled.div`
width: 100%;
`;

export default function HopPage({ hop }) {
  return (
    <div>
      <Head title={hop.Name} />

      <Nav />

      <ContainerDiv>
        <div>{hop.Name}</div>
        <div>{hop.Aroma}</div>
      </ContainerDiv>
    </div>
  );
}

HopPage.propTypes = {
  hop: shape({
    Name: string,
    Aroma: string,
  }),
};

interface HopParams {
  name?: string,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params: HopParams = context.params;

  const result = await prisma.hop.findUnique({
    where: {
      Name: params.name,
    },
  });
  return { props: { hop: result } };
};
