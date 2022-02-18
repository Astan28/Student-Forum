'use strict';

const multer = require('fastify-multer');
const config = require('config');
const mongoose = require('mongoose');
const fs = require('fs');
const { promisify } = require('util');

const fastify = require('fastify')();
const uploadPath = require('path');

const File = require('./File');

// fastify.register(require('fastify-static'), {
//   root: uploadPath.join(__dirname, 'public/uploads'),
//   prefix: '/public/',
//   list: {
//     format: 'html',
//     render: (dirs, files) => `
// <html><body>
// <ul>
//   ${dirs.map(dir => `<li><a href="${dir.href}">${dir.name}</a></li>`).join('\n  ')}
// </ul>
// <ul>
//   ${files.map(file => `<li><a href="${file.href}" target="_blank">${file.name}</a></li>`).join('\n  ')}
// </ul>
// </body></html>
// `,
//   }
// });

const unlinkAsync = promisify(fs.unlink);

const { mongoUrl } = config;

mongoose.connect(mongoUrl);

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
  files: 3
};

// const upload = multer({
//   dest: '../public/uploads/',
//   fileFilter: imageFilter,
//   limits: limitsUpload,
//   filename: imageName
// });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage, limits: limitsUpload });

const fieldsUpload = upload.any('files');
// const fieldsUpload = upload.single('file');

const getFiles = async (req, reply) => {
  const files = await File.find();
  reply.send(files);
};

const getFile = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const file = await File.findById(id);

  reply.send(file);
};

const uploadFile = async (req, reply) => {
  console.log('req', req.files);
  const { files } = req;
  files.forEach(element => {
    console.log('file: ', element);
    const { thread, post } = req.body;
    const name = element.filename;
    const path = element.destination;
    // const filename = JSON.stringify(req.file);
    // console.log('filename', filename);
    const file = new File({
      name,
      path,
      thread,
      post
    });
    console.log(file);
    file.save();
    // reply.code(200).send('SUCCESS');
  });
  reply.code(201).send(files);
};

const deleteFile = async (req, reply) => {
  const { id } = req.params;

  const file = await File.findById(id);
  console.log('file: ', file);

  File.findByIdAndDelete(id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      const filepath = (docs.path + docs.name);
      console.log(filepath);
      unlinkAsync(filepath);
      console.log('Removed File : ', docs);
    }
  });
  reply.send({ message: `Post ${id} has been removed` });
};
module.exports = {
  uploadFile,
  fieldsUpload,
  getFiles,
  getFile,
  deleteFile
};
