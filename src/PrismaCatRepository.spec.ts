import { describe, expect, it, vi } from 'vitest';
import { PrismaCatRepository } from './PrismaCatRepository';
import { PrismaClient } from '@prisma/client';
import { Cat } from './Cat';

describe('PrismaCatRespository', () => {
  it('should persist Cat on db', async () => {
    const prismaClient = {
      cat: {
        create: vi.fn(),
      },
    } as unknown as PrismaClient;

    const cat = new Cat('some-uuid', 'Garfield', 'Orange', 23, 18.5);
    const repository = new PrismaCatRepository(prismaClient);
    await repository.save(cat);

    expect(prismaClient.cat.create).toHaveBeenCalledWith({
      data: {
        id: cat.id,
        age: cat.age,
        name: cat.name,
        breed: cat.breed,
        weight: cat.weight,
      },
    });
  });

  it('should retrieve cat from db by id', async () => {
    const prismaClient = {
      cat: {
        findFirst: vi.fn(),
      },
    } as unknown as PrismaClient;

    (prismaClient.cat.findFirst as any).mockResolvedValueOnce({
      id: 'some-uuid',
      name: 'Garfield',
      breed: 'Orange',
      age: 23,
      weight: 18.5,
    });

    const repository = new PrismaCatRepository(prismaClient);
    await repository.find('some-uuid');

    expect(prismaClient.cat.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'some-uuid',
      },
    });
  });
});
