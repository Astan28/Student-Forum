const fastify = require('fastify')({logger: true})
const PORT = 5000



const start = async () => {
    try {
        await fastify.listen(PORT)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

async function connectToDatabases (fastify) {
    fastify
      .register(require('fastify-mongodb'), { url: fastify.config.MONGODB_URL, useNewUrlParser: true })
}

start()