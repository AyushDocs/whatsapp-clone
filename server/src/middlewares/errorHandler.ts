/** @format */

import {NextFunction, Request, Response} from 'express';

export default (_: Request, res: Response, next: NextFunction) => {
	try {
		next();
	} catch (err) {
		console.error(err.message);
		res.status(500).send({
			status: 'error',
			message: err.message,
		});
	}
};
