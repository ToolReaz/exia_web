export default function (sequelize, DataTypes) {
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
}