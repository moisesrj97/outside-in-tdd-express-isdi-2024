import { Router as ExpressRouter, Response, Request } from 'express';
import { Router } from './server/infrastructure/Router';
import { CatCreator } from './CatCreator';
import { CatFinder } from './CatFinder';

export class CatRouter implements Router {
  public path: string = '/cats';
  public router: ExpressRouter;
  constructor(private catCreator: CatCreator, private catFinder: CatFinder) {
    this.router = ExpressRouter();
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.router.post('/', this.createCat.bind(this));
    this.router.get('/:id', this.findCat.bind(this));
  }

  async createCat(req: Request, res: Response): Promise<void> {
    await this.catCreator.execute(req.body);

    res.status(201);
    res.json();
  }

  async findCat(req: Request, res: Response): Promise<void> {
    const cat = await this.catFinder.execute(req.params.id);

    res.status(200);
    res.json(cat);
  }
}
