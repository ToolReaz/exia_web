

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product_Category', {
        ID_Product: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Product',
                key: 'ID'
            }
        },
        ID_Category: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Category',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Product_Category'
    });
};
