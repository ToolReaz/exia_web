

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Permission_Role', {
        ID_Permission: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Permission',
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
        tableName: 'Permission_Role'
    });
};
