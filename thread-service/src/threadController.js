'use strict';

const config = require('config');
const mongoose = require('mongoose');
const axios = require('axios').default;
const Thread = require('./Thread');

const { mongoUrl } = config;

mongoose.connect(mongoUrl);
function checkPermissions(user, authorId) {
  if (user.id === authorId || user.role === 'ADMIN') return true;
  return false;
}
function isAdmin(user) {
  if (user.role === 'ADMIN') return true;
  return false;
}

const getThreads = async (req, reply) => {
  let threads;
  if (req.query) threads = await Thread.find(req.query);
  else threads = await Thread.find();
  reply.send(threads);
};

const getThread = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const thread = await Thread.findById(id);

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

const deleteThread = async (req, reply) => {
  const { id } = req.params;
  const loggedUser = req.user;

  const thread = Thread.findById(id);
  const token = req.headers.authorization;
  if (isAdmin(loggedUser)) {
    axios.delete(`http://localhost:5010/files?thread=${id}`, {
      headers: {
        Authorization: token
      }
    });

    axios.delete(`http://localhost:5020/posts/thread/${id}`, {
      headers: {
        Authorization: token
      }
    });
    Thread.deleteOne({ _id: id }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Removed Thread : ', docs);
      }
    });
    reply.send({ message: `Thread ${id} has been removed` });
  } else reply.code(403).send();
};

const deleteThreads = async (req, reply) => {
  // console.log('thread called');
  const loggedUser = req.user;
  const { id } = req.params;
  const token = req.headers.authorization;
  const threads = await Thread.find({ board: id });
  if (isAdmin(loggedUser)) {
    threads.forEach(element => {
      axios.delete(`http://localhost:5010/files?thread=${element.id}`, {
        headers: {
          Authorization: token
        }
      });
      axios.delete(`http://localhost:5020/posts/thread/${element.id}`, {
        headers: {
          Authorization: token
        }
      });
    });
    Thread.deleteMany({ board: id }).then(() => {
      console.log('Data deleted'); // Success
    }).catch(error => {
      console.log(error); // Failure
    });
    reply.send(threads);
  } else reply.code(403).send();
};

const updateThread = async (req, reply) => {
  const { id } = req.params;
  // const thread = await Thread.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
  const thread = await Thread.findById(id);
  console.log('thread ', thread);
  const authorId = thread.author;
  const loggedUser = req.user;
  if (checkPermissions(loggedUser, authorId)) {
    thread.set(req.body);
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
  deleteThreads,
  updateThread
};
