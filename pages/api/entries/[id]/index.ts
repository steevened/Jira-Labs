import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'invalid ID ' + id });
  }

  switch (req.method) {
    case 'GET':
      return getEntryById(req, res);

    case 'PUT':
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: 'Invalid endpoint' });
  }
}

// get by id
const getEntryById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  try {
    const entryById = await Entry.findById(id);

    if (!entryById) {
      await db.disconnect();
      return res.status(400).json({ message: 'Invalid ID' });
    }
    await db.disconnect();
    res.status(200).json(entryById);
  } catch (error) {}

  await db.disconnect();
};

// update
const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const {
    status = entryToUpdate.status,
    description = entryToUpdate.description,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        status,
        description,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

  await db.disconnect();
};
