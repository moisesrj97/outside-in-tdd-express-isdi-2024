import { CatRepository } from './CatRepository';
import { Cat } from './Cat';

export class CatCreator {
  constructor(private catRepository: CatRepository) {}

  async execute(catDto: {
    id: string;
    name: string;
    breed: string;
    age: number;
    weight: number;
  }) {
    await this.catRepository.save(
      new Cat(catDto.id, catDto.name, catDto.breed, catDto.age, catDto.weight)
    );
  }
}
