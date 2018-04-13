

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Participe', {
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
        tableName: 'Participe'
    });
};
