'use strict';

const config = require('config');
const axios = require('axios').default;

const { threadApi } = config;
async function deleteThreads(id, token) {
  console.log('thread called');
  try {
    const resp = await axios.delete(`${threadApi}/board/${id}`, {
      headers: {
        Authorization: token
      }
    });
    console.log('response: ', resp);
    return resp;
  } catch (e) {
    console.log('error: ', e);
    return e;
  }
}

module.exports = deleteThreads;
