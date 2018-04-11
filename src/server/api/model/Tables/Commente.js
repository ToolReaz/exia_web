/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Commente', {
		Texte: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		Public: {
			type: DataTypes.INTEGER(1),
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
		tableName: 'Commente'
	});
};