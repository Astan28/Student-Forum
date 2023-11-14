'use strict';

const config = require('config');

const mongoose = require('mongoose');
const { isAdmin } = require('../../common/lib/verify-token');
const Board = require('./Board');
const deleteThreads = require('./externalRequests');

const { mongoUrl } = config;

mongoose.connect(mongoUrl);

const getBoards = async (req, reply) => {
  const { course, semester, group } = req.query;
  const databaseQuery = {};
  if (course) databaseQuery.course = course;
  if (semester) databaseQuery.semester = semester;
  if (group) databaseQuery.group = group;
  const boards = await Board.find(databaseQuery);
  reply.send(boards);
};

const getBoard = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const board = await Board.findById(id);
  if (!board) reply.code(404).send('board not found');
  reply.send(board);
};

const createBoard = async (req, reply) => {
  const {
    name, course, semester, group
  } = req.body;
  const author = req.user.id;
  const loggedUser = req.user;
  if (isAdmin(loggedUser)) {
    const createdAt = new Date();
    const updatedAt = null;
    const board = new Board({
      name,
      course,
      semester,
      group,
      author,
      createdAt,
      updatedAt,
    });
    try {
      await board.save();
    } catch (error) {
      reply.send('Error: unable to create board');
    }
    reply.code(201).send(board);
  } else { reply.code(403).send('You do not have permission to perform this action'); }
};

const deleteBoard = async (req, reply) => {
  const { id } = req.params;
  const loggedUser = req.user;
  const token = req.headers.authorization;
  let board = null;
  if (isAdmin(loggedUser)) {
    try {
      board = await Board.findByIdAndDelete(id);
      if (!board) return reply.code(404).send('board not found');
      try {
        const resp = await deleteThreads(id, token);
        console.log('odpowiedz: ', resp);
        if (resp !== 200) throw new TypeError('threads not deleted');
      } catch (e) {
        return reply.status(502).send(e);
      }
    } catch (e) {
      return reply.sendStatus(400);
    }
  } else { reply.code(403).send('You do not have permission to perform this action'); }
  return reply.code(200).send(board);
};

const updateBoard = async (req, reply) => {
  const { id } = req.params;
  const board = await Board.findById(id);
  if (!board) reply.code(404).send('board not found');
  const loggedUser = req.user;
  if (isAdmin(loggedUser)) {
    // board = await Board.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: false });
    board.set(req.body);
    board.updatedAt = new Date();
    try {
      await board.save();
    } catch (error) {
      reply.send('Error: unable to create board');
    }
    reply.code(201).send(board);
  } else { reply.code(403).send('You do not have permission to perform this action'); }
};

module.exports = {
  getBoard,
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
};
