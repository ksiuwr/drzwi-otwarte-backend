import { NextFunction, Request, Response } from 'express';

import { AppError, isTrustedError } from '../utils/exceptions.js';
import { HttpCode } from '../utils/httpCodes.js';

export const errorHandler = (
	err: Error | AppError,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	if (isTrustedError(err)) trustedErrorHandler(err as AppError, res);
	else criticalErrorHandler(err, res);
};

const trustedErrorHandler = (appErr: AppError, res: Response) => {
	console.log(appErr);
	res.status(appErr.httpCode).json({ name: appErr.name, message: appErr.message });
};

const criticalErrorHandler = (err: Error, res: Response) => {
	if (res != undefined) {
		res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
	}

	console.log('Application encountered a critical error. Exiting');
	console.log(err);
	process.exit(1);
};
