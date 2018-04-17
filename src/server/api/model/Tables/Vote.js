

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Vote', {
        ID_Account: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Account',
                key: 'ID'
            }
        },
        ID_Idea: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Idea',
                key: 'ID'
            }
        },
        Pro: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'Vote'
    });
};
