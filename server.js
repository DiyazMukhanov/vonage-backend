const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./api');
console.log(process.env.DATABASE_PASSWORD);
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

