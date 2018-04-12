export default function (sequelize, DataTypes) {
	return sequelize.define('Panier', {
		Quantite: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Compte',
				key: 'ID'
			}
		},
		ID_Produit: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Produit',
				key: 'ID'
			}
		}
	}, {
		tableName: 'Panier'
	});
}