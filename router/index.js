const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
const {
  authorization,
  authorizationComment,
} = require("../middlewares/authorization");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

router.get("/", (req, res) => {
  res.send("Welcome!");
});
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleLogin);
router.use(authentication);
router.get("/threads", Controller.showThread);

cloudinary.config({
  cloud_name: "dil34wsfc",
  api_key: "836263556126976",
  api_secret: "zRXl45g4ud39M7jbFefsvk_qSBw",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "SocialBond",
    allowedFormats: ["jpg", "jpeg", "png", "gif"],
  },
});

const upload = multer({ storage: storage });

router.post("/threads", upload.single("imageUrl"), Controller.postThread);
router.get("/threads/:id", Controller.showDetailThread);
router.post("/threads/:id", Controller.postComment);
router.put("/threads/:id", authorization, Controller.editThread);
router.delete("/threads/:id", authorization, Controller.deleteThread);
router.delete(
  "/threads/:id/comment",
  authorizationComment,
  Controller.deleteComment
);

module.exports = router;
