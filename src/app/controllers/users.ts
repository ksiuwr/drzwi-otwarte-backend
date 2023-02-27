import { NextFunction, Request, Response } from 'express';

import User from '../models/user.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	User.findAll()
		.then(users => res.send(JSON.stringify(users)))
		.catch(err => next(err));
};

export const addUser = (
	req: Request<object, object, IAddUserPayload>,
	res: Response,
	next: NextFunction
) => {
	User.create({ name: req.body.name, serial: req.body.serial })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
};

interface IAddUserPayload {
	name: string;
	serial: string;
}
