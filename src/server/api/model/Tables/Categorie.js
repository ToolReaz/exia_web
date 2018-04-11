/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Categorie', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Nom: {
			type: DataTypes.STRING(25),
			allowNull: false
		}
	}, {
		tableName: 'Categorie'
	});
};