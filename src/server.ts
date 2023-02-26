import { PORT } from './app/config.js';
import app from './app/index.js';

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
