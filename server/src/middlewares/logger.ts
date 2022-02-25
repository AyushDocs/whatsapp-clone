/** @format */

import {NextFunction, Request, Response} from 'express';

export default (req: Request, _: Response, next: NextFunction) => {
	console.log(req.url);
	next();
};
