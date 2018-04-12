/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Compte', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		Adresse_Mail: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		Nom: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		Prenom: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		Mot_de_passe: {
			type: DataTypes.STRING(64),
			allowNull: false
		}
	}, {
			tableName: 'Compte'
		});
};
