"use strict";

const { hasPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = [
      {
        username: "Demo",
        email: "demo@mail.com",
        password: "1234",
      },
      {
        username: "User",
        email: "user@mail.com",
        password: "1234",
      },
    ];
    const data = user.map((el) => {
      el.password = hasPassword(el.password)
      el.createdAt = el.updatedAt = new Date();
      return el
    });
    const threads = [
      {
        UserId: 1,
        content: "Never give up",
        imageUrl: "",
      },
    ];
    const thread = threads.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el
    });
    const comments = [
      {
        UserId: 2,
        ThreadId: 1,
        text: "Nice",
      },
    ];
    const comment = comments.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el
    });
    await queryInterface.bulkInsert("Users", data);
    await queryInterface.bulkInsert("Threads", thread);
    await queryInterface.bulkInsert("Comments", comment);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Threads", null, {});
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
