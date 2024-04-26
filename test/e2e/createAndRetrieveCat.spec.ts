import { ExpressServer } from '../../src/server/infrastructure/ExpressServer';
import request from 'supertest';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import { CatRouter } from '../../src/CatRouter';
import { CatCreator } from '../../src/CatCreator';
import { CatFinder } from '../../src/CatFinder';
import { PrismaCatRepository } from '../../src/PrismaCatRepository';
describe('User', () => {
  let container: StartedPostgreSqlContainer;
  let prisma: PrismaClient;
  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    const dbUrl = container.getConnectionUri();
    execSync(`DATABASE_URL=${dbUrl} yarn prisma db push`);
    prisma = new PrismaClient({
      datasourceUrl: dbUrl,
    });
  });
  afterEach(async () => {
    await prisma.cat.deleteMany();
  });
  afterAll(() => {
    container.stop();
  });
  it('should be able to create and retrieve a cat', async () => {
    const repo = new PrismaCatRepository(prisma);
    const server = new ExpressServer([
      new CatRouter(new CatCreator(repo), new CatFinder(repo)),
    ]);
    const cat = {
      id: '1',
      name: 'Whiskers',
      breed: 'Siamese',
      age: 3,
      weight: 10,
    };
    const saveResponse = await request(server.app).post('/cats').send(cat);

    expect(saveResponse.status).toBe(201);

    const getResponse = await request(server.app).get(`/cats/${cat.id}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(cat);
  });
});
