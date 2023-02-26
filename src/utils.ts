import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getDirname = (url: string): string => {
	const fileName = fileURLToPath(url);
	return dirname(fileName);
};
