import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function findSessionByToken(token:string) {
  return prisma.session.findFirst({
    where:{
      token
    }
  });
}

const sessionRepository = {
  create,
  findSessionByToken
};

export default sessionRepository;
