import { CatFinder } from './CatFinder';
import { describe, expect, it, vi } from 'vitest';
import { CatRepository } from './CatRepository';

describe('CatFinder', () => {
  it('should call repository find method with expected id', async () => {
    const catRepository = {
      find: vi.fn(),
    } as unknown as CatRepository;
    const catFinder = new CatFinder(catRepository);
    await catFinder.execute('some-uuid');

    expect(catRepository.find).toHaveBeenCalledWith('some-uuid');
  });
});
