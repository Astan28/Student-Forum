'use strict';

const config = require('config');
const mongoose = require('mongoose');
const axios = require('axios').default;
const { isAdmin, isAuthor } = require('../../common/lib/verify-token');
const Post = require('./Post');
const User = require('./User');
const Thread = require('./Thread');

const { mongoUrl } = config;

mongoose.connect(mongoUrl);

// function checkPermissions(user, authorId) {
//   if (user.id === authorId || user.role === "ADMIN") return true;
//   return false;
// }
// function isAdmin(user) {
//   if (user.role === "ADMIN") return true;
//   return false;
// }
const getPosts = async (req, reply) => {
  const { thread, author } = req.query;
  const databaseQuery = {};
  if (thread) databaseQuery.thread = thread;
  if (author) databaseQuery.author = author;
  const posts = await Post.find(databaseQuery)
    .populate({
      path: 'author',
      select: ['name', 'role', 'course', 'semester', 'group'],
    })
    .populate({
      path: 'thread',
      select: ['name', 'createdAt'],
    });
  reply.send(posts);
};

const getPost = async (req, reply) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate({
    path: 'author',
    select: ['name', 'role', 'course', 'semester', 'group'],
  });

  reply.send(post);
};

const createPost = async (req, reply) => {
  const { text, thread } = req.body;
  const author = req.user.id;
  console.log(author);

  const createdAt = new Date();
  const updatedAt = null;
  const post = new Post({
    text,
    thread,
    author,
    createdAt,
    updatedAt,
  });
  try {
    await post.save();
  } catch (error) {
    reply.send('Error: unable to create post');
  }
  reply.code(201).send(post);
};

const deletePost = async (req, reply) => {
  const { id } = req.params;
  const loggedUser = req.user;
  const token = req.headers.authorization;
  const post = Post.findById(id);
  if (!post) return reply.code(404).send('post not found');
  const authorId = post.author;

  if (isAuthor(loggedUser, authorId) || isAdmin(loggedUser)) {
    try {
      axios.delete(`http://localhost:5010/files?post=${id}`, {
        headers: {
          Authorization: token,
        },
      });
      try {
        await Post.deleteOne({ _id: id });
        reply.send({ message: `Post ${id} has been removed` });
      } catch (e) {
        return reply.sendStatus(400);
      }
      // Post.deleteOne({ _id: id }, (err, docs) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("Removed Post : ", docs);
      //   }
      // });
    } catch (e) {
      return reply.status(502).send(e);
    }
  } else reply.code(403).send();
};

const deletePosts = async (req, reply) => {
  const { id } = req.params;
  console.log('threadId: ', id);
  console.log('postservice called');
  const loggedUser = req.user;
  if (isAdmin(loggedUser)) {
    const token = req.headers.authorization;
    const posts = await Post.find({ thread: id });

    posts.forEach(element => {
      axios.delete(`http://localhost:5010/files?post=${element.id}`, {
        headers: {
          Authorization: token,
        },
      });
    });
    Post.deleteMany({ thread: id })
      .then(() => {
        console.log('Data deleted'); // Success
      })
      .catch(error => {
        console.log(error); // Failure
      });
    reply.send(posts);
  } else reply.code(403).send();
};

const updatePost = async (req, reply) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  console.log('post ', post);
  const authorId = post.author;
  const loggedUser = req.user;
  if (isAuthor(loggedUser, authorId) || isAdmin(loggedUser)) {
    // post = await Post.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    post.set(req.body);
    post.updatedAt = new Date();
    try {
      await post.save();
    } catch (error) {
      reply.send('Error: unable to create board');
    }
    reply.code(201).send(post);
  } else {
    reply.code(403).send('You do not have permission to perform this action');
  }
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  deletePost,
  deletePosts,
  updatePost,
};
