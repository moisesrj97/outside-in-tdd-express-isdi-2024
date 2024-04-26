import { Prisma, PrismaClient } from '@prisma/client';
import { ExpressServer } from './server/infrastructure/ExpressServer';
import { PrismaCatRepository } from './PrismaCatRepository';
import { CatRouter } from './CatRouter';
import { CatCreator } from './CatCreator';
import { CatFinder } from './CatFinder';

const prisma = new PrismaClient();
const repo = new PrismaCatRepository(prisma);
const server = new ExpressServer([
  new CatRouter(new CatCreator(repo), new CatFinder(repo)),
]);
server.start(3000);
