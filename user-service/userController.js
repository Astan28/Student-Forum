let users = require('./Users')
const { v4: uuidv4 } = require("uuid");
const { courses } = require('./schemas');

const getUsers = (req, reply) => {
    reply.send(users)
}

const getUser = (req, reply) => {
    const {id} = req.params

    const user = users.find((user) => user.id === id)

    reply.send(user)
}

const registerUser = (req, reply) => {
    const { name, password, email, role, semester, group } = req.body;
  const user = {
    id: uuidv4(),
    name,
    password,
    email,
    role,
    course: JSON.stringify(courses),
    semester,
    group
  };
  users = [...users, user];
  reply.code(201).send(user);
};

const deleteUser = (req, reply) => {

    const {id} = req.params

    users = users.filter(user => user.id !== id)
    reply.send({message: `User ${id} has been removed`})
}


const updateUser = (req, reply) => {

    const {id} = req.params
    const {name, password, email, role, course, semester, group } = req.body
    users = users.map(user => (user.id === id ? {id, name, password, email, role, course, semester, group } : user))
    user = users.find(user => user.id === id)
    reply.send(user)
}

module.exports = {
    getUser,
    getUsers,
    registerUser,
    deleteUser,
    updateUser
}