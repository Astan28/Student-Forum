'use strict';

const config = require('config');
const mongoose = require('mongoose');
const Thread = require('./Thread');

const { mongoUrl } = config;

mongoose.connect(mongoUrl);
function checkPermissions(user, authorId) {
  if (user.id === authorId || user.role === 'ADMIN') return true;
  return false;
}

const getThreads = async (req, reply) => {
  const threads = await Thread.find();
  reply.send(threads);
};

const getThread = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const thread = await thread.findById(id);

  reply.send(thread);
};

const createThread = async (req, reply) => {
  const {
    name, text, board
  } = req.body;
  const author = req.user.id;
  console.log(author);
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const createdAt = `${date} ${time}`;
  const updatedAt = null;
  const thread = new Thread({
    name,
    text,
    board,
    author,
    createdAt,
    updatedAt
  });
  thread.save();
  reply.code(201).send(thread);
};

const deleteThread = (req, reply) => {
  const { id } = req.params;
  const loggedUser = req.user;

  const thread = Thread.findById(id);
  const authorId = thread.author;
  if (checkPermissions(loggedUser, authorId)) {
    Thread.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Removed Thread : ', docs);
      }
    });
    reply.send({ message: `Thread ${id} has been removed` });
  } else reply.code(403).send();
};

const updateThread = async (req, reply) => {
  const { id } = req.params;
  const thread = await Thread.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
  console.log('thread ', thread);
  const authorId = thread.author;
  const loggedUser = req.user;
  if (checkPermissions(loggedUser, authorId)) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    thread.updatedAt = `${date} ${time}`;
    thread.save();
    reply.send(thread);
  } else reply.code(403).send();
};

module.exports = {
  getThread,
  getThreads,
  createThread,
  deleteThread,
  updateThread
};
