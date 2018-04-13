

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Commentaires', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Texte: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        Public: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'Commentaires'
    });
};
