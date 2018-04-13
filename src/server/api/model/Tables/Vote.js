

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Vote', {
        Pour: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Compte',
                key: 'ID'
            }
        },
        ID_Idee: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Idee',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Vote'
    });
};
