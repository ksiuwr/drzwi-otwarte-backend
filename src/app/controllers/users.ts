import { NextFunction, Request, Response } from 'express';
import { DataTypes } from 'sequelize';

import User from '../models/user.js';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
	User.findAll()
		.then(users => res.send(JSON.stringify(users)))
		.catch(err => next(err));
};

export const getUser = (
	req: Request<IUserDataParams, object, object>,
	res: Response,
	next: NextFunction
) => {
	User.findByPk(req.params.id)
		.then(user => {
			if (user === null) throw new Error('User doesnt exist');
			res.send(JSON.stringify(user));
		})
		.catch(err => next(err));
};

export const deleteUser = (
	req: Request<IUserDataParams, object, object>,
	res: Response,
	next: NextFunction
) => {
	User.findByPk(req.params.id)
		.then(user => {
			if (user === null) throw new Error('User doesnt exist');
			user.destroy();
			res.sendStatus(200);
		})
		.catch(err => next(err));
};

export const addUser = (
	req: Request<object, object, IUserDataBody>,
	res: Response,
	next: NextFunction
) => {
	User.create({ name: req.body.name, serial: req.body.serial })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
};

export const editUser = (
	req: Request<IUserDataParams, object, IUserDataBody>,
	res: Response,
	next: NextFunction
) => {
	User.findByPk(req.params.id)
		.then(user => {
			if (user === null) throw new Error('User doesnt exist');
			user
				.update({
					name: req.body.name,
					serial: req.body.serial,
					timestamp: DataTypes.NOW
				})
				.then(() => res.sendStatus(200))
				.catch(err => next(err));
		})
		.catch(err => next(err));
};

interface IUserDataBody {
	name: string;
	serial: string;
}

interface IUserDataParams {
	id: number;
}
