import Head from "../../components/head";
import Nav from "../../components/nav";
import { GetServerSideProps } from "next";

import { shape, string } from "prop-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function HopPage({ hop }) {
  return (
    <div>
      <Head title={hop.Name} />

      <Nav />

      <div className="w-full">
        <div>{hop.Name}</div>
        <div>{hop.Aroma}</div>
      </div>
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
