'use strict';

const config = require('config');
const mongoose = require('mongoose');
const axios = require('axios').default;
const Post = require('./Post');

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
const getPosts = async (req, reply) => {
  let posts;
  if (req.query) posts = await Post.find(req.query);
  else posts = await Post.find();
  reply.send(posts);
};

const getPost = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const post = await Post.findById(id);
  delete post.password;

  reply.send(post);
};

const createPost = async (req, reply) => {
  const {
    text, thread
  } = req.body;
  const author = req.user.id;
  console.log(author);
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const createdAt = `${date} ${time}`;
  const updatedAt = null;
  const post = new Post({
    text,
    thread,
    author,
    createdAt,
    updatedAt
  });
  post.save();
  reply.code(201).send(post);
};

const deletePost = (req, reply) => {
  const { id } = req.params;
  const loggedUser = req.user;
  const token = req.headers.authorization;
  const post = Post.findById(id);
  const authorId = post.author;
  if (checkPermissions(loggedUser, authorId)) {
    axios.delete(`http://localhost:5010/files?post=${id}`, {
      headers: {
        Authorization: token
      }
    });
    Post.deleteOne({ _id: id }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Removed Post : ', docs);
      }
    });
    reply.send({ message: `Post ${id} has been removed` });
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
          Authorization: token
        }
      });
    });
    Post.deleteMany({ thread: id }).then(() => {
      console.log('Data deleted'); // Success
    }).catch(error => {
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
  if (checkPermissions(loggedUser, authorId)) {
    // post = await Post.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    post.set(req.body);
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    post.updatedAt = `${date} ${time}`;
    post.save();
    reply.send(post);
  } else reply.code(403).send();
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  deletePost,
  deletePosts,
  updatePost
};
