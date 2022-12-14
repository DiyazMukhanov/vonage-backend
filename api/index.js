const express = require('express');
const OpenTok = require('opentok');
const { Video } = require('@vonage/video');
const opentok = new OpenTok('47570931', '3ab20542b94f539189a94509b1bb09e642b1f3bb');
const SessionRoom = require('../sessionModel');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();
// dotenv.config({path: '../config.env'});
const sessionRouter = express.Router();

const jsonParser = bodyParser.json()

app.use('/api/v1/sessions', cors(), sessionRouter );

//New platform
// console.log(Video)

const getAllSessions = async (req, res, next) => {
    try{
        const sessions = await SessionRoom.find();
        res.status(201).json({
            status: 'success',
            data: {
                sessions
            }
        });

    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}


const createSessionRoom = async (req, res, next) => {
    try{
        opentok.createSession({ mediaMode: "routed", archiveMode: "always" }, async function(err, session) {
            if(err) console.log(err);
            const sessionId = await session.sessionId;
            if(sessionId) {
                req.body.sessionId = sessionId;
                const newSessionRoom = await SessionRoom.create(req.body);

                res.status(201).json({
                    status: 'success',
                    data: {
                        tour: newSessionRoom
                    }
                })
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

}

const getChatRoomToken = async (req, res, next) => {
   try{
       let sessionId;
       let token;
   const ChatRoom = await SessionRoom.findById(req.params.id);
   if(ChatRoom) {
       sessionId = ChatRoom.sessionId;
       token = opentok.generateToken(sessionId);
   }

   res.status(200).json({
       status:'success',
       data: {
           token,
           sessionId
       }
   })
   } catch(err) {
       res.status(404).json({
           status: 'fail',
           message: err
       })
   }
}

sessionRouter.route('/')
    .get(jsonParser, getAllSessions);

sessionRouter.route('/')
    .post(jsonParser, createSessionRoom);

sessionRouter.route('/:id')
    .get(getChatRoomToken);

module.exports = app;


// const app = require('./api');
// const dotenv = require("dotenv");
dotenv.config({path: './config.env'});



const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect('mongodb+srv://diyaz:Diyaz247757@cluster0.shdge3p.mongodb.net/natours?retryWrites=true&w=majority', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true
}).then(() =>
    console.log('DB connection successful')).catch(err => console.log('DB connection failed'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});