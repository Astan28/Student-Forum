const {getUser, getUsers, registerUser, deleteUser, updateUser} = require('./userController')

const courses = {
IT: "IT specialist",
GR: "Graphic artist"
}

console.log(courses)

const User = {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      password: { type: "string" },
      email: { type: "string" },
      role: { type: "string" },
      course: { type: "object" },
      semester: { type: "string" },
      group: { type: "string" },
    },
  };

  const getUsersOpts = {
    schema: {
      response: {
        200: {
          type: "array",
          items: User,
        },
      },
    },
    handler: getUsers
  };

  const getUserOpts = {
    schema: {
      response: {
        200: User
      },
    },
    handler: getUser
  };

  const registerUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'password', 'email', 'course', 'semester', 'group'],
            properties: {
                name: { type: 'string'},
                password: { type: 'string'},
                email: { type: 'string'},
                role: { type: 'string'},
                course: { type: 'object'},
                semester: { type: 'string'},
                group: { type: 'string'},
            }
        },
      response: {
        201: User,
      },
    },
    handler: registerUser
  };

  const loginUserOpts = {
    schema: {
      body: {
        type: 'object',
        require: [ 'name', 'password' ],
        properties: {
          name: { type: 'string' },
          password: { type: 'string' }
        },
      },
      response: {
        200: {
          type: 'object',
          require: [ 'jwt' ],
          properties: {
            jwt: { type: 'string' }
          },
          additionalProperties: false
        }
      }
    }
  }


  const deleteUserOpts = {
    schema: {
      response: {
        200: 
        {
            type: 'object',
            properties: {
                message: {type: 'string'}
            }
        },
      },
    },
    handler: deleteUser
  };


  const updateUserOpts = {
    schema: {
      response: {
        200: User,
      },
    },
    handler: updateUser
  };


  module.exports = {
    getUsersOpts,
    getUserOpts,
    registerUserOpts,
    loginUserOpts,
    deleteUserOpts,
    updateUserOpts,
    courses
  }