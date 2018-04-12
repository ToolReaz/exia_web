export default function (sequelize, DataTypes) {
	return sequelize.define('Likes', {
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
		}
	}, {
		tableName: 'Likes'
	});
}