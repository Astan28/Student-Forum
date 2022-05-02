'use strict';

const { v4: uuidv4 } = require('uuid');
const multer = require('fastify-multer');
const config = require('config');

const mongoose = require('mongoose');
const fs = require('fs');
const { promisify } = require('util');

const File = require('./File');

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

const limitsUpload = {
  fileSize: 1000000, // 15MB 15*1048576
  files: 3
};

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
    cb(null, `${file.fieldname}-${uuidv4()}.${extension}`);
  },
});

const upload = multer({ storage, limits: limitsUpload });

const fieldsUpload = upload.any('files');
// const fieldsUpload = upload.single('file');

const getFiles = async (req, reply) => {
  const { thread, post } = req.query;
  const databaseQuery = {};
  if (thread) databaseQuery.thread = thread;
  if (post) databaseQuery.post = post;
  const files = await File.find(databaseQuery);
  reply.send(files);
};

const getFile = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const file = await File.findById(id);

  reply.send(file);
};

// ogarnac try catch
const uploadFile = async (req, reply) => {
  const { files, user } = await req;
  const { thread, post } = req.body;
  const promises = Array.from(files).map(async ({ filename: name, destination: path }) => {
    const file = new File({
      name,
      path,
      author: user.id,
      thread,
      post
    });

    const newFile = await file.save();
    return newFile;
  });
  const fresult = await Promise.all(promises);
  reply.code(201).send(fresult);
};

const deleteFile = async (req, reply) => {
  const { id } = req.params;

  const file = await File.findById(id);
  const authorId = file.author;
  const loggedUser = req.user;
  if (checkPermissions(loggedUser, authorId)) {
    // przerobic callback na promise (async/await)
    await File.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        const filepath = (docs.path + docs.name);
        unlinkAsync(filepath);
      }
    });
    reply.send({ message: `Post ${id} has been removed` });
  } else reply.code(403).send();
};

const deleteFiles = async (req, reply) => {
  const loggedUser = req.user;
  const files = await File.find(req.query);

  if (isAdmin(loggedUser)) {
    files.forEach(async element => {
      try {
        await File.deleteOne({ _id: element.id });
      } catch (error) {
        reply.send('Error: unable to create board');
      }
      const filepath = (element.path + element.name);
      await unlinkAsync(filepath);
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
