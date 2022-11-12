"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable("wallets", {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
			creator_id: Sequelize.STRING,
			total_earnings: Sequelize.STRING,
			previous_balance: Sequelize.STRING,
			current_balance: Sequelize.STRING,
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
