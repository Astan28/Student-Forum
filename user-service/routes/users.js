const {getUsersOpts, getUserOpts, registerUserOpts, deleteUserOpts, updateUserOpts} = require('../schemas')

function userRoutes(fastify, options, done) {

    fastify.get('/users', getUsersOpts);

    fastify.get('/users/:id', getUserOpts);

    fastify.post('/users', registerUserOpts)

    fastify.delete('/users/:id', deleteUserOpts)

    fastify.put('/users/:id', updateUserOpts)

    done()
}

module.exports = userRoutes