

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Photo', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        ImagePath: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        Public: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'Photo'
    });
};
