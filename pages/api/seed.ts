import { db, seedData } from '@/database';
import { Entry } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Access Denied' });
  }

  await db.connect();
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);
  await db.disconnect();

  res.status(200).json({ message: 'ok' });
}
