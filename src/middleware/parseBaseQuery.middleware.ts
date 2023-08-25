import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class ParseBaseQueryMiddleware implements NestMiddleware {
  async use(req, res: Response, next: NextFunction) {
    if (req.method === 'GET') {
      const limit = parseInt(req.query.limit, 10);
      const skip = parseInt(req.query.skip, 10);
      const sort = parseInt(req.query.sort, 10);
      req.query.limit = Number.isNaN(limit) ? 25 : Math.max(0, limit);
      req.query.skip = Number.isNaN(skip) ? 0 : Math.max(0, skip);
      req.query.sort = sort === 1 ? 1 : -1;
    }
    next();
  }
}
