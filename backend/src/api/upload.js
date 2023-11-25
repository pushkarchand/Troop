const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const { uploadToS3, getObjectSignedUrl } = require("../utils/upload");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
module.exports = (app) => {
  app.post("/upload", upload.single("image"), async (req, res) => {
    try {
      const file = req.file;
      const imageName = generateFileName();

      const fileBuffer = await sharp(file.buffer).toBuffer();

      await uploadToS3(fileBuffer, imageName, file.mimetype);
      const url = await getObjectSignedUrl(imageName);
      res.status(200).send({
        imageName,
        url,
      });
    } catch (error) {
      console.log(`API: /upload :: ${error}`);
    }
  });
};
