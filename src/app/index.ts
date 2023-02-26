import express from 'express';
import fs from 'fs';
import path from 'path';

import { getDirname } from '../utils.js';

const __dirname = getDirname(import.meta.url);

const app = express();
const routeFolder = 'routes';
const routeDir = path.join(__dirname, routeFolder);

fs.readdirSync(routeDir).forEach(async file => {
	const routeFilePath = path.join(routeDir, file);
	try {
		const item = await import(routeFilePath);
		app.use(`/api/${path.parse(file).name}`, item.default);
		console.log(`Successfully loaded ${routeFolder}/${file}`);
	} catch (error) {
		console.error(error);
	}
});

export default app;
