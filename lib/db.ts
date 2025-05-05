import { PrismaClient } from '../lib/generated/prisma';

const db = new PrismaClient();

async function test() {
  const users = await db.user.findMany({
    where: { username: { contains: 'est' } },
  });
  console.log(users);
}

test();

export default db;
