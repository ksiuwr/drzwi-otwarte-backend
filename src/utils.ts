import path from 'path';
import url from 'url';

export const getDirname = (fileUrl: string): string => {
	const fileName = url.fileURLToPath(fileUrl);
	return path.dirname(fileName);
};
