import { Sequelize } from 'sequelize';

import { DB_NAME } from './config.js';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: DB_NAME,
	logging: false
});

export default sequelize;
