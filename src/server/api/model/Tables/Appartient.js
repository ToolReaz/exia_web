

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Appartient', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Compte',
                key: 'ID'
            }
        },
        ID_Role: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Role',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Appartient'
    });
};
