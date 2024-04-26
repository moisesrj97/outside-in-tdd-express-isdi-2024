import { vi, describe, it, expect, Mock } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
import { CatRepository } from '../../src/CatRepository';
import { PrismaCatRepository } from '../../src/PrismaCatRepository';
import { CatCreator } from '../../src/CatCreator';
import { CatFinder } from '../../src/CatFinder';
import { CatRouter } from '../../src/CatRouter';

describe('Given an user', () => {
  it('should be able to create and retrieve a cat', async () => {
    const prismaClient = {
      cat: {
        create: vi.fn(),
        findFirst: vi.fn(),
      },
    } as unknown as PrismaClient;

    const catRepository: CatRepository = new PrismaCatRepository(prismaClient);
    const catCreator = new CatCreator(catRepository);
    const catFinder = new CatFinder(catRepository);
    const router = new CatRouter(catCreator, catFinder);

    const req = {
      body: {
        id: 'some-uuid',
        name: 'Garfield',
        breed: 'Orange',
        age: 23,
        weight: 18.5,
      },
    } as unknown as Request;
    const res = {
      status: vi.fn(),
      json: vi.fn(),
    } as unknown as Response;

    await router.createCat(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();

    (prismaClient.cat.findFirst as Mock).mockResolvedValueOnce({
      id: 'some-uuid',
      name: 'Garfield',
      breed: 'Orange',
      age: 23,
      weight: 18.5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await router.findCat({ params: { id: 'some-uuid' } } as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 'some-uuid',
      name: 'Garfield',
      breed: 'Orange',
      age: 23,
      weight: 18.5,
    });
  });
});
