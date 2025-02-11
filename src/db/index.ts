import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const setup = () => {
  const mockDB = {
    select: ({}) => ({
      from: () => [],
    }),
    execute: async () => [],
    insert: () => ({
      values: () => {},
    }),
  };
  const databaseURL = process.env.DATABASE_URL;

  if (!databaseURL) {
    console.error('DATABASE_URL is not set');
    return mockDB;
  }

  // for query purposes
  try {
    const queryClient = postgres(databaseURL, {
      prepare: false,
    });
    const db = drizzle(queryClient);
    return db;
  } catch (error) {
    console.error('error during database setup:', error);
    return mockDB;
  }
};

export default setup();
