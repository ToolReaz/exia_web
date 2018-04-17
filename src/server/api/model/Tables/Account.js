

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Account', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Mail: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        },
        LastName: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        FirstName: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }, {
        tableName: 'Account'
    });
};
