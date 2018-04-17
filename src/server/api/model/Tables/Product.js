

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        Price: {
            type: DataTypes.INTEGER(11),
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
        tableName: 'Product'
    });
};
