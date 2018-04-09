/* jshint indent: 2 */

module.exports = function(sequelize,DataTypes) {
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
		ID_Manifestation: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Manifestation',
				key: 'ID'
			}
		}
	}, {
		tableName: 'Likes'
	});
};
