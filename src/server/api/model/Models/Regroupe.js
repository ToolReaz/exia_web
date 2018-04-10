/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Regroupe', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Produit',
				key: 'ID'
			}
		},
		ID_Categorie: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Categorie',
				key: 'ID'
			}
		}
	}, {
		tableName: 'Regroupe'
	});
};