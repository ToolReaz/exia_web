

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Manifestation', {
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
        ImagePath: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        When: {
            type: DataTypes.DATE,
            allowNull: false
        },
        TimeSpan: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        Price: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        Public: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }
    }, {
        tableName: 'Manifestation'
    });
};
