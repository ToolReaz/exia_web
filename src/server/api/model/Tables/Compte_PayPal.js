/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Compte_PayPal', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		GUID: {
			type: DataTypes.STRING(25),
			allowNull: false,
			unique: true
		},
		ID_Compte: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'Compte',
				key: 'ID'
			},
			unique: true
		}
	}, {
		tableName: 'Compte_PayPal'
	});
};