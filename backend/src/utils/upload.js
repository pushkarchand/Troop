// s3-upload.js
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { ACCESS_KEY, SECRET_ACCESS_KEY, BUCKET_REGION, BUCKET_NAME } = require("../config");

const s3Client = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

async function uploadToS3(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  const response = s3Client.send(new PutObjectCommand(uploadParams));
}

async function getObjectSignedUrl(key) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 3600 * 24 * 2;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
}

module.exports = { uploadToS3, getObjectSignedUrl };
