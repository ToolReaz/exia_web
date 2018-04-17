

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('PayPalAccount', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        GUID: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        ID_Account: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Account',
                key: 'ID'
            },
            unique: true
        }
    }, {
        tableName: 'PayPalAccount'
    });
};
