'use strict';

const config = require('config');
const mongoose = require('mongoose');
const Board = require('./Board');

const { mongoUrl } = config;

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
  const board = await board.findById(id);
  reply.send(board);
};

const createBoard = async (req, reply) => {
  const {
    name
  } = req.body;
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
      author,
      createdAt,
      updatedAt
    });
    board.save();
    reply.code(201).send(board);
  } else reply.code(403).send();
};

const deleteBoard = (req, reply) => {
  const { id } = req.params;
  const loggedUser = req.user;

  if (checkPermissions(loggedUser)) {
    Board.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Removed Board : ', docs);
      }
    });
    reply.send({ message: `Board ${id} has been removed` });
  } else reply.code(403).send();
};

const updateBoard = async (req, reply) => {
  const { id } = req.params;
  const board = await Board.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: false });
  console.log('board ', board);
  const loggedUser = req.user;
  if (checkPermissions(loggedUser)) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    board.updatedAt = `${date} ${time}`;
    const { threads } = req.body;
    console.log(board.threads);
    console.log(threads);
    board.threads.push(threads);
    board.save();
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
