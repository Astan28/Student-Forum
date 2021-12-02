const fp = require("fastify-plugin");
const { MongoClient } = require("mongodb");

const mongoPlugin = fp(async function (fastify) {
  const url = fastify.config.MONGO_URL;
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(fastify.config.MONGO_DB);
  console.log("connected succesfully to server");
  fastify.decorate("mongoDB", db);
}, "3.x");

module.exports = {
  mongoPlugin,
};
