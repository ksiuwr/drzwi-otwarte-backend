import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err);
	res.status(500).send(`<pre>${err.stack}</pre>`);
};
