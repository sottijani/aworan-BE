"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable("bookmarks", {
			id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
			user_id: Sequelize.STRING,
			creator_id: Sequelize.STRING,
			img_url: Sequelize.STRING,
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
