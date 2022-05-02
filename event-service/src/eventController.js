'use strict';

const config = require('config');
const mongoose = require('mongoose');
const Event = require('./Event');

const { mongoUrl } = config;

mongoose.connect(mongoUrl);

function checkPermissions(user, authorId) {
  if (user.id === authorId || user.role === 'ADMIN') return true;
  return false;
}

const getEvents = async (req, reply) => {
  const { course, semester, group } = req.query;
  const databaseQuery = {};
  if (course) databaseQuery.course = course;
  if (semester) databaseQuery.semester = semester;
  if (group) databaseQuery.group = group;
  const events = await Event.find(databaseQuery);
  reply.send(events);
};

const getEvent = async (req, reply) => {
  const { id } = req.params;

  // const user = users.find(user => user.id === id);
  const event = await Event.findById(id);
  reply.send(event);
};

const createEvent = async (req, reply) => {
  const {
    name, description, startDate, finishDate
  } = req.body;
  const author = req.user.id;
  const { semester, group, course } = req.user;
  console.log(author);

  const event = new Event({
    name, description, author, course, semester, group, startDate, finishDate
  });
  await event.save();
  reply.code(201).send(event);
  // if (checkPermissions(loggedUser)) {
  //   const today = new Date();
  //   const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  //   const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  //   const createdAt = `${date} ${time}`;
  //   const updatedAt = null;
  //   const event = new Board({
  //     name,
  //     author,
  //     createdAt,
  //     updatedAt
  //   });
  //   event.save();
  //   reply.code(201).send(event);
  // } else
  reply.code(403).send();
};

const deleteEvent = (req, reply) => {
  const { id } = req.params;
  const loggedUser = req.user;

  const event = Event.findById(id);
  const authorId = event.author;
  if (checkPermissions(loggedUser, authorId)) {
    Event.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Removed Event : ', docs);
      }
    });
    reply.send({ message: `Event ${id} has been removed` });
  } else reply.code(403).send();
};

const updateEvent = async (req, reply) => {
  const { id } = req.params;
  // const event = await Event.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: false });
  const event = await Event.findById(id);
  console.log('event ', event);
  const loggedUser = req.user;
  const authorId = event.author;
  if (checkPermissions(loggedUser, authorId)) {
    event.set(req.body);
    event.save();
    reply.send(event);
  } else reply.code(403).send();
};

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent
};
