import { CatCreator } from './CatCreator';
import { CatFinder } from './CatFinder';
import { CatRouter } from './CatRouter';
import { describe, expect, it, vi, Mock } from 'vitest';
import { Request, Response } from 'express';
import { Cat } from './Cat';

describe('CatRouter', () => {
  it('should call the use case with the information from the payload', async () => {
    const catCreator = {
      execute: vi.fn(),
    } as unknown as CatCreator;
    const catFinder = {} as CatFinder;
    const catController = new CatRouter(catCreator, catFinder);
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

    await catController.createCat(req, res);

    expect(catCreator.execute).toHaveBeenCalledWith(req.body);
  });

  it('should call response with correct status and empty body', async () => {
    const catCreator = {
      execute: vi.fn(),
    } as unknown as CatCreator;
    const catFinder = {} as CatFinder;

    const catController = new CatRouter(catCreator, catFinder);

    const req = {} as unknown as Request;

    const res = {
      status: vi.fn(),
      json: vi.fn(),
    } as unknown as Response;

    await catController.createCat(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
  it('should call use case to get cat by id', async () => {
    const catFinder = {
      execute: vi.fn(),
    } as unknown as CatFinder;

    const catCreator = {} as CatCreator;

    const catController = new CatRouter(catCreator, catFinder);

    const req = {
      params: {
        id: 'some-uuid',
      },
    } as unknown as Request;

    const res = {
      status: vi.fn(),
      json: vi.fn(),
    } as unknown as Response;

    await catController.findCat(req, res);

    expect(catFinder.execute).toHaveBeenCalledWith('some-uuid');
  });

  it('should call response with correct status and empty body', async () => {
    const catCreator = {
      execute: vi.fn(),
    } as unknown as CatCreator;
    const catFinder = {
      execute: vi.fn(),
    } as unknown as CatFinder;

    const catController = new CatRouter(catCreator, catFinder);

    const req = {
      params: {
        id: 'some-uuid',
      },
    } as unknown as Request;

    const res = {
      status: vi.fn(),
      json: vi.fn(),
    } as unknown as Response;

    (catFinder.execute as Mock).mockResolvedValue(
      new Cat('some-uuid', 'Garfield', 'Orange', 23, 18.5)
    );

    await catController.findCat(req, res);

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
