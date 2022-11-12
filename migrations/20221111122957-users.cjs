"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable("users", {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
			first_name: Sequelize.STRING,
			last_name: Sequelize.STRING,
			email: Sequelize.STRING,
			phone: { type: Sequelize.STRING, allowNull: true },
			password: Sequelize.STRING,
			primary_role: Sequelize.STRING,
			sub_date: { type: Sequelize.STRING, allowNull: true },
			sub_status: Sequelize.STRING,
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
