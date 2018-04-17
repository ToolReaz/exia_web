

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Category', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(25),
            allowNull: false
        }
    }, {
        tableName: 'Category'
    });
};
