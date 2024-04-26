import { PrismaClient } from '@prisma/client';
import { CatRepository } from './CatRepository';
import { Cat } from './Cat';

export class PrismaCatRepository implements CatRepository {
  constructor(private prismaClient: PrismaClient) {}

  async find(id: string): Promise<Cat> {
    const cat = await this.prismaClient.cat.findFirst({
      where: {
        id,
      },
    });

    return new Cat(cat!.id, cat!.name, cat!.breed, cat!.age, cat!.weight);
  }

  async save(cat: Cat) {
    await this.prismaClient.cat.create({
      data: {
        id: cat.id,
        name: cat.name,
        breed: cat.breed,
        age: cat.age,
        weight: cat.weight,
      },
    });
  }
}
