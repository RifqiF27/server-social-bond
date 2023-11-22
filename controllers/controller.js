const { comparePassword } = require("../helpers/bcrypt");
const { signInToken } = require("../helpers/jwt");
const { User, Comment, Thread } = require("../models");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class Controller {
  static async register(req, res, next) {
    try {
      const data = await User.create(req.body);
      //   const access_token = signInToken({ id: data.id });
      res.status(201).json({
        message: `User with id ${data.id} has been created`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "InvalidInput" };
      const data = await User.findOne({ where: { email } });
      if (!data)
        throw {
          name: "InvalidEmail/Password",
        };
      console.log(password, data.password, "<<<<<");
      const isPasswordValid = comparePassword(password, data.password);
      if (!isPasswordValid)
        throw {
          name: "InvalidEmail/Password",
        };
      const access_token = signInToken({ id: data.id });
      res.status(200).json({ access_token, data });
    } catch (err) {
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT,
      });
      const payload = ticket.getPayload();

      let user = await User.findOne({
        where: { email: payload.email },
      });
      if (!user) {
        user = await User.create(
          {
            email: payload.email,
            username: payload.name,
            password: String(Math.random() * 977513),
          },
          {
            hooks: false,
          }
        );
      }
      let access_token = signInToken({
        id: user.id,
      });

      res.status(200).json({
        access_token,
        id: user.id,
        username: user.username,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async showThread(req, res, next) {
    try {
      const { myThread } = req.query;
      // const data = await Thread.findAll({include: [User, Comment]})
      const query = {
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
            // where: {id: req.user.id},
          },
          {
            model: Comment,
            include: {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            order: [["createdAt", "ASC"]],
          },
        ],
        order: [["createdAt", "DESC"]],
      };

      if (myThread === "true") {
        query.include[0].where = { id: req.user.id };
      }

      const data = await Thread.findAll(query);
      // console.log("Authenticated User ID:", req.user.id);
      // console.log("Query:", JSON.stringify(query, null, 2));
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async showDetailThread(req, res, next) {
    try {
      const data = await Thread.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: Comment,
            order: [["createdAt", "ASC"]],

            include: {
              model: User,
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          },
        ],
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async postThread(req, res, next) {
    try {
      console.log(req.file);
      console.log(req.body);

      const data = await Thread.create({
        ...req.body,
        UserId: req.user.id,
        imageUrl: req.file?.path || null,
      });

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async postComment(req, res, next) {
    try {
      const data = await Comment.create({
        ...req.body,
        UserId: req.user.id,
        ThreadId: req.params.id,
      });

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async editThread(req, res, next) {
    try {
      const data = await Thread.update(
        { ...req.body, UserId: req.user.id },
        {
          where: { id: req.params.id },
        }
      );
      res.status(200).json({ message: `Your thread has been updated` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteThread(req, res, next) {
    try {
      const thread = await Thread.findOne({
        where: { id: req.params.id },
      });
      if (!thread) throw { name: "NotFound" };
      await Thread.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: `Your thread has been deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const comment = await Comment.findOne({
        where: { id: req.params.id },
      });
      if (!comment) throw { name: "NotFound" };
      await comment.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: `Your comment has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
