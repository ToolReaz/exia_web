

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Role', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        RoleName: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'Role'
    });
};
