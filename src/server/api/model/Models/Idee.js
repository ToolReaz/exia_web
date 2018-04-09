/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Idee', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Soumis_le: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		Titre: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		Texte: {
			type: DataTypes.STRING(1024),
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
		tableName: 'Idee'
	});
};
