'use strict';

const multer = require('fastify-multer');
const config = require('config');

const mongoose = require('mongoose');
const fs = require('fs');
const { promisify } = require('util');

// const fastify = require('fastify')();
const uploadPath = require('path');

const File = require('./File');

console.log(uploadPath.join(__dirname, '../public/uploads'));

const unlinkAsync = promisify(fs.unlink);

const { mongoUrl, fileDir } = config;

mongoose.connect(mongoUrl);
function checkPermissions(user, authorId) {
  if (user.id === authorId || user.role === 'ADMIN') return true;
  return false;
}
function isAdmin(user) {
  if (user.role === 'ADMIN') return true;
  return false;
}

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
  path(req, file, cb) {
    cb(null, fileDir);
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
  let files;
  if (req.query) files = await File.find(req.query);
  else files = await File.find();
  reply.send(files);
};

const getFile = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const file = await File.findById(id);

  reply.send(file);
};

const uploadFile = async (req, reply) => {
  console.log('req', req);
  const { files, user } = await req;
  console.log('author: ', user);
  console.log('files: ', files);
  const { thread, post } = req.body;
  const fileArray = [];
  Array.from(files).forEach(element => {
    console.log('file: ', element);
    const name = element.filename;
    const path = element.destination;
    // const filename = JSON.stringify(req.file);
    // console.log('filename', filename);
    const file = new File({
      name,
      path,
      author: user.id,
      thread,
      post
    });
    console.log(file);
    fileArray.push(file);
    file.save();
    // reply.code(200).send('SUCCESS');
  });
  reply.code(201).send(fileArray);
};

const deleteFile = async (req, reply) => {
  const { id } = req.params;

  const file = await File.findById(id);
  const authorId = file.author;
  const loggedUser = req.user;
  console.log('file: ', file);
  if (checkPermissions(loggedUser, authorId)) {
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
  } else reply.code(403).send();
};

const deleteFiles = async (req, reply) => {
  // const { id } = req.params;
  // console.log('postId: ', id);
  const loggedUser = req.user;
  const files = await File.find(req.query);

  console.log(files);
  if (isAdmin(loggedUser)) {
    files.forEach(element => {
      File.deleteOne({ _id: element.id }, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          const filepath = (element.path + element.name);
          console.log(filepath);
          unlinkAsync(filepath);
          console.log('Removed File : ', docs);
        }
      });
    });
    reply.send(files);
  } else reply.code(403).send();
};

module.exports = {
  uploadFile,
  fieldsUpload,
  getFiles,
  getFile,
  deleteFile,
  deleteFiles
};
