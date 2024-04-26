import { Router as ExpressRouter, Response, Request } from 'express';
import { Router } from './server/infrastructure/Router';
import { CatCreator } from './CatCreator';
import { CatFinder } from './CatFinder';

export class CatRouter implements Router {
  public path: string = '/cats';
  public router: ExpressRouter;
  constructor(private catCreator: CatCreator, private catFinder: CatFinder) {
    this.router = ExpressRouter();
  }

  registerRoutes(): void {
    throw new Error('Method not implemented.');
  }

  async createCat(req: Request, res: Response): Promise<void> {
    this.catCreator.execute(req.body);

    res.status(201);
    res.json();
  }

  async findCat(req: Request, res: Response): Promise<void> {
    const cat = await this.catFinder.execute(req.params.id);

    res.status(200);
    res.json(cat);
  }
}
