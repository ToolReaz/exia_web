

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Comments_Account_Photo', {
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
        },
        ID_Comments: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Comments',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Comments_Account_Photo'
    });
};
