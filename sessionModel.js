const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Session room must have an instructors name']
    },
    instructorId:  {
        type: String
    },
    sessionId: {
        type: String,
        required: [true, 'session must have a sessionId']
    }
});


const SessionRoom = mongoose.model('SessionRoom', sessionSchema);

module.exports = SessionRoom;
