import { Cat } from './Cat';
import { CatRepository } from './CatRepository';

export class CatFinder {
  constructor(private catRepository: CatRepository) {}

  async execute(id: string): Promise<Cat> {
    return this.catRepository.find(id);
  }
}
