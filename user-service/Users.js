const courses = require("./schemas")

console.log('kierunki ' + courses)
let users = [
    {id: '1', name: 'Astan', password: 'siema123', email: 'astan@gmail.com', role: 'ADMIN', course: courses.IT, semester: '7', group: 'ION'},
    {id: '2', name: 'test', password: 'siema321', email: 'test@gmail.com', role: 'USER', course: 'Graphic artist', semester: '2', group: 'AZI'}
]

module.exports = users