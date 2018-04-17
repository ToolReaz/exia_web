

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Basket', {
        Quantity: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Account',
                key: 'ID'
            }
        },
        ID_Product: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Product',
                key: 'ID'
            }
        },
        ID_Purchase: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Purchase',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Basket'
    });
};
