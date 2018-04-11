/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Manifestation', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Nom: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		Description: {
			type: DataTypes.STRING(1024),
			allowNull: false
		},
		Chemin_Image: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		Quand: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		Intervale: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		Prix: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		Public: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		}
	}, {
		tableName: 'Manifestation'
	});
};