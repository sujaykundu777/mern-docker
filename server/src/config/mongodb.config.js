import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0
};

// mongodb environment variables
const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;

const dbConnectionURL = {
     'LOCAL_DB_URL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
     'REMOTE_DB_URL': process.env.MONGODB_URI  //atlas url
};
mongoose.connect(dbConnectionURL.LOCAL_DB_URL, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
db.once('open', () => {
     // we're connected !
     console.log('Mongodb Connection Successful');
});

export default db;