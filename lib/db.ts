import { PrismaClient } from '../lib/generated/prisma';

const db = new PrismaClient();

async function test() {
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    include: {
      user: true, // 실제로는 userId가 저장되어 있고, 이 include 옵션을 통해서 유저 정보를 가져올 수도 있음.
    },
  });
  console.log(token);
}

test();

export default db;
