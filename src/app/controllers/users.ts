import { NextFunction, Request, Response } from 'express';
import { DataTypes } from 'sequelize';

import User from '../models/user.js';
import { AppError } from '../utils/exceptions.js';
import { HttpCode } from '../utils/httpCodes.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await User.findAll();
		res.status(HttpCode.OK).send(JSON.stringify(users));
	} catch (err) {
		next(err);
	}
};

export const getUser = async (
	req: Request<IUserDataParams, object, object>,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (user === null) throw userNotFoundError;
		res.sendStatus(HttpCode.OK).send(JSON.stringify(user));
	} catch (err) {
		next(err);
	}
};

export const deleteUser = async (
	req: Request<IUserDataParams, object, object>,
	res: Response,
	next: NextFunction
) => {
	const user = await User.findByPk(req.params.id);
	try {
		if (user === null) throw userNotFoundError;
		user.destroy();
		res.sendStatus(HttpCode.OK);
	} catch (err) {
		next(err);
	}
};

export const addUser = async (
	req: Request<object, object, IUserDataBody>,
	res: Response,
	next: NextFunction
) => {
	try {
		await User.create({ name: req.body.name, serial: req.body.serial });
		res.sendStatus(HttpCode.OK);
	} catch (err) {
		next(err);
	}
};

export const editUser = async (
	req: Request<IUserDataParams, object, IUserDataBody>,
	res: Response,
	next: NextFunction
) => {
	const user = await User.findByPk(req.params.id);
	try {
		if (user === null) throw userNotFoundError;

		await user.update({
			name: req.body.name,
			serial: req.body.serial,
			timestamp: DataTypes.NOW
		});

		res.sendStatus(HttpCode.OK);
	} catch (err) {
		next(err);
	}
};

const userNotFoundError = new AppError({
	httpCode: HttpCode.NOT_FOUND,
	description: "User with given id doesn't exists",
	name: 'User not found'
});

interface IUserDataBody {
	name: string;
	serial: string;
}

interface IUserDataParams {
	id: number;
}
