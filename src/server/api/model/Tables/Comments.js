

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Comments', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Text: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        Public: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'Comments'
    });
};
