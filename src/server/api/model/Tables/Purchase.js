

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Purchase', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Done: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        ID_Account: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Account',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Purchase'
    });
};
