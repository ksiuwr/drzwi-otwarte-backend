import bodyParser from 'body-parser';
import express, { Application } from 'express';
import fs from 'fs';
import path from 'path';

import { getDirname } from '../utils.js';
import { errorHandler } from './middleware/errorHandler.js';

const loadRoutes = async (app: Application) => {
	const __dirname = getDirname(import.meta.url);
	const routeFolder = 'routes';
	const routeDir = path.join(__dirname, routeFolder);
	const routeFiles = fs.readdirSync(routeDir);
	for (const file of routeFiles) {
		const routeFilePath = path.join(routeDir, file);
		try {
			const item = await import(routeFilePath);
			app.use(`/api/${path.parse(file).name}`, item.default);
			console.log(`Successfully loaded ${routeFolder}/${file}`);
		} catch (error) {
			console.error(error);
		}
	}
	console.log('Routes loaded');
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

await loadRoutes(app);

app.use(errorHandler);

export default app;
