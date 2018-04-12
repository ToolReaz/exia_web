export default function (sequelize, DataTypes) {
	return sequelize.define('Commente', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Compte',
				key: 'ID'
			}
		},
		ID_Photos: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Photos',
				key: 'ID'
			}
		},
		ID_Commentaires: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Commentaires',
				key: 'ID'
			}
		}
	}, {
		tableName: 'Commente'
	});
}