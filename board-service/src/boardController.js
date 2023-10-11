'use strict';

const config = require('config');
const mongoose = require('mongoose');
const axios = require('axios').default;
const Board = require('./Board');

const { mongoUrl, threadApi } = config;

mongoose.connect(mongoUrl);
function checkPermissions(user) {
  if (user.role === 'ADMIN') return true;
  return false;
}

const getBoards = async (req, reply) => {
  let boards;
  if (req.query) boards = await Board.find(req.query);
  else await Board.find();
  reply.send(boards);
};

const getBoard = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const board = await Board.findById(id);
  reply.send(board);
};

const createBoard = async (req, reply) => {
  const {
    name, course, semester, group
  } = req.body;
  const token = req.headers.authorization;
  console.log(token);
  const author = req.user.id;
  const loggedUser = req.user;
  console.log(author);
  if (checkPermissions(loggedUser)) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;
    const updatedAt = null;
    const board = new Board({
      name,
      course,
      semester,
      group,
      author,
      createdAt,
      updatedAt
    });
    board.save();
    reply.code(201).send(board);
  } else reply.code(403).send();
};

const deleteBoard = async (req, reply) => {
  const { id } = req.params;
  const loggedUser = req.user;
  const token = req.headers.authorization;
  console.log(token);

  if (checkPermissions(loggedUser)) {
    Board.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        axios.delete(`${threadApi}/board/${id}`, {
          headers: {
            Authorization: token
          }
        });
        console.log('Removed Board : ', docs);
      }
    });
    reply.send({ message: `Board ${id} has been removed` });
  } else reply.code(403).send();
};

const updateBoard = async (req, reply) => {
  const { id } = req.params;
  const board = await Board.findById(id);
  console.log('board ', board);
  const loggedUser = req.user;
  if (checkPermissions(loggedUser)) {
    // board = await Board.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: false });
    board.set(req.body);
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    board.updatedAt = `${date} ${time}`;
    board.save();
    console.log(board);
    reply.send(board);
  } else reply.code(403).send();
};

module.exports = {
  getBoard,
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard
};
