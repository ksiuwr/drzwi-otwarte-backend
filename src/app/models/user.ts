import { DataTypes } from 'sequelize';

import db from '../db.js';

const User = db.define(
	'users',
	{
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		serial: {
			type: DataTypes.STRING(8),
			allowNull: false,
			unique: true
		},
		last_used: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	},
	{
		freezeTableName: true,
		timestamps: false
	}
);

await User.sync();

export default User;
