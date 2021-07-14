import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface HopParams {
  index?: string,
  size?: string,
  prefix?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const params: HopParams = req.query;

  const start_index = Number(params.index) || 0;
  const size = Number(params.size) || 21;
  const end_index = start_index + size;

  if (req.query.prefix !== undefined) {
    const result = await prisma.hop.findMany({
      where: {
        Name: {
          startsWith: params.prefix,
        },
      },
      skip: start_index,
      take: size,
    });
    res.status(200).json(result);
    return;
  }
  const result = await prisma.hop.findMany({
    skip: start_index,
    take: size,
  });
  res.status(200).json(result);
};
