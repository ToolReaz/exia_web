

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Account_Manifestation', {
        ID_Account: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Account',
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
        tableName: 'Account_Manifestation'
    });
};
