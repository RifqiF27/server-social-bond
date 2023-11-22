const { Thread, Comment } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const thread = await Thread.findOne({ where: { id: req.params.id } });
    if (!thread) throw { name: "NotFound" };
    if (thread.UserId !== req.user.id) throw { name: "Forbidden" };

    next();
  } catch (err) {
    console.log("🚀 ~ file: authorization.js:17 ~ authorization ~ err:", err);
    next(err);
  }
};
const authorizationComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Thread,
        },
      ],
    });
    if (!comment) throw { name: "NotFound" };
    if (comment.Thread.UserId !== req.user.id) throw { name: "Forbidden" };
    next();
  } catch (err) {
    console.log("🚀 ~ file: authorization.js:17 ~ authorization ~ err:", err);
    next(err);
  }
};
module.exports = { authorization, authorizationComment };
