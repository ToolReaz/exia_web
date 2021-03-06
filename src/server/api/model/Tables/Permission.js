

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Permission', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        PermissionCode: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'Permission'
    });
};
