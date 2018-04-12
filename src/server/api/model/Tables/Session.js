/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Session', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Token: {
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true
		},
		Derniere_connexion: {
			type: DataTypes.DATE,
			allowNull: false
		},
		ID_Compte: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'Compte',
				key: 'ID'
			},
			unique: true
		},
	}, {
			tableName: 'Session'
		});
};
