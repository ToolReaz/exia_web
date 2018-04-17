

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Idea', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        SubmitOn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Title: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        Text: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        ID_Account: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Account',
                key: 'ID'
            }
        },
        Approved: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'Idea'
    });
};
