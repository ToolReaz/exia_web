/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Possede', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Permission',
				key: 'ID'
			}
		},
		ID_Role: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Role',
				key: 'ID'
			}
		}
	}, {
			tableName: 'Possede'
		});
};
