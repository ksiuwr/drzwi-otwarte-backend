import { HttpCode } from './httpCodes.js';

interface AppErrorArgs {
	name?: string;
	httpCode: HttpCode;
	description: string;
	isOperational?: boolean;
}

export class AppError extends Error {
	public readonly name: string;
	public readonly httpCode: HttpCode;
	public readonly isOperational: boolean;

	constructor(args: AppErrorArgs) {
		super(args.description);

		//restores prototype chain broken by Error class
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = args.name || 'Error';
		this.httpCode = args.httpCode;
		this.isOperational = args.isOperational || true;

		Error.captureStackTrace(this);
	}
}

export const isTrustedError = (error: Error | AppError) => {
	console.log(error);
	if (error instanceof AppError) return error.isOperational;
	return false;
};
