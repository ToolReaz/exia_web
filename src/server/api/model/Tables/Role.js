/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Role', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Nom_role: {
			type: DataTypes.STRING(25),
			allowNull: false,
			unique: true
		}
	}, {
		tableName: 'Role'
	});
};