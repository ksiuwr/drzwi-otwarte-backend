import { DataTypes } from 'sequelize';

import db from '../db.js';

const User = db.define(
	'users',
	{
		username: {
			allowNull: false,
			type: DataTypes.STRING(100),
			unique: true
		},
		serial: {
			allowNull: false,
			type: DataTypes.STRING(8),
			unique: true
		}
	},
	{
		freezeTableName: true,
		timestamps: false
	}
);

await User.sync();

export default User;
