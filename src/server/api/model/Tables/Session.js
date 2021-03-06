

module.exports = function(sequelize, DataTypes) {
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
        LastConnection: {
            type: DataTypes.DATE,
            allowNull: false
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
        tableName: 'Session'
    });
};
