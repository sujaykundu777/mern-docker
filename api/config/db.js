import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;


const options = {
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true, 
    autoIndex: false, 
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, 
    poolSize: 10,
    bufferMaxEntries: 0
  }


const dbConnectionURL = {
    // 'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
   'LOCALURL': `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
};

mongoose.set('debug', true);
mongoose.connect(dbConnectionURL.LOCALURL, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:'));
db.once('open', () => {
     // we're connected !
     console.log('Mongodb Connection Successful');
});

