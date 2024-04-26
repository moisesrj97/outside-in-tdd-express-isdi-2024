import { describe, expect, it, vi } from 'vitest';
import { CatCreator } from './CatCreator';
import { Cat } from './Cat';

describe('Cat Creator', () => {
  it('should call repository save method with expected cat', () => {
    const catRepository = {
      save: vi.fn(),
    };
    const catCreator = new CatCreator(catRepository);

    catCreator.execute({
      id: 'some-uuid',
      name: 'Garfield',
      breed: 'Orange',
      age: 23,
      weight: 18.5,
    });

    const expectedCat = new Cat('some-uuid', 'Garfield', 'Orange', 23, 18.5);
    expect(catRepository.save).toHaveBeenCalledWith(expectedCat);
  });
});
