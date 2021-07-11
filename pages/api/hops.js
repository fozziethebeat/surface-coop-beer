import fs from 'fs';

console.log(process.cwd());
fs.readdir(process.cwd() + '/.next/server/chunks', (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});


import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const start_index = Number(req.query.index) || 0;
  const size = Number(req.query.size) || 21;
  const end_index = start_index + size;

  if (req.query.prefix) {
    const result  = await prisma.hop.findMany({
      where: {
        Name: {
          startsWith: req.query.prefix,
        },
      },
      skip: start_index,
      take: size,
    });
    res.status(200).json(result);
    return;
  }
  const result  = await prisma.hop.findMany({
    skip: start_index,
    take: size,
  });
  res.status(200).json(result);
}
