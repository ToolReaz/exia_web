

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Achats', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Realise: {
            type: DataTypes.INTEGER(1),
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
        tableName: 'Achats'
    });
};
