"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable("roles", {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
			role_title: Sequelize.STRING,
			deletedAt: { allowNull: true, type: Sequelize.DATE },
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		});
	},
	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable("users");
	},
};
