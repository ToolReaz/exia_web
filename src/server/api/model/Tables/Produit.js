export default function (sequelize, DataTypes) {
	return sequelize.define('Produit', {
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
		Prix: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		ID_Compte: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'Compte',
				key: 'ID'
			}
		}
	}, {
		tableName: 'Produit'
	});
}