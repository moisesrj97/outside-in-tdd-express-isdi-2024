import { Cat } from './Cat';

export interface CatRepository {
  find(find: any): Promise<Cat>;
  save(cat: Cat): Promise<void>;
}
