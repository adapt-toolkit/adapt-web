const uuid = require('uuid/v4');

'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('reserve', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuid()
            },
            email: Sequelize.STRING,
            image: {
                type: Sequelize.STRING,
            },
            confirmed: Sequelize.BOOLEAN,
            image_id: Sequelize.INTEGER,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('reserve');
    }
};