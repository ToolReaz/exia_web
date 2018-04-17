

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Idea_Manifestation', {
        ID_Idea: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Idea',
                key: 'ID'
            }
        },
        ID_Manifestation: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Manifestation',
                key: 'ID'
            }
        }
    }, {
        tableName: 'Idea_Manifestation'
    });
};
