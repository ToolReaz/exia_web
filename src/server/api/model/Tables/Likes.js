

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Likes', {
        ID_Account: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Account',
                key: 'ID'
            }
        },
        ID_Photo: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Photo',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Likes'
    });
};
