'use strict';

const fastify = require('fastify');
const multer = require('fastify-multer');

// const imageFilter = function (req, file, cb) {
//   if (
//     !file.originalname.match(
//       /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG|webp|WEBP)$/
//     )
//   ) {
//     req.fileValidationError = 'Only image files are allowed!';
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

const limitsUpload = {
  fileSize: 1000000, // 15MB 15*1048576
  files: 1
};

// const upload = multer({
//   dest: '../public/uploads/',
//   fileFilter: imageFilter,
//   limits: limitsUpload,
//   filename: imageName
// });

const fileUploaded = function (req, reply) {
  console.log(req.file);
  // console.log(req.body);
  console.log('file has been uploaded');
  reply.code(200).send('SUCCESS');
};
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../public/uploads/');
  },
  filename(req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
  }
});

const upload = multer({ storage, limits: limitsUpload });

module.exports = {
  fileUploaded,
  upload
};
