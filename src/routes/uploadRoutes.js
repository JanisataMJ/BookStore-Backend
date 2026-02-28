const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { uploadFile } = require("../controllers/uploadController");




router.post("/uploadFile", upload.single("excel"), uploadFile);


module.exports = router;
