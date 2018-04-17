

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Account_Role', {
        ID_Account: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Account',
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
        tableName: 'Account_Role'
    });
};
