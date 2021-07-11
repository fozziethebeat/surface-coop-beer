import Head from "../../components/head";
import Nav from "../../components/nav";

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

export async function getServerSideProps({ params }) {
  const name = params.name;

  const result = await prisma.hop.findUnique({
    where: {
      Name: name,
    },
  });
  return { props: { hop: result } };
}
