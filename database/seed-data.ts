interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pending: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'In progress: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
      status: 'in-progress',
      createdAt: Date.now(),
    },
    {
      description:
        'Completed: lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
      status: 'finished',
      createdAt: Date.now(),
    },
  ],
};
