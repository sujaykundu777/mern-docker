import createError from 'http-errors';
import express from 'express';
import path from 'path';
import ejs from 'ejs';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dbConnectionURL from './config/db';

// Routes
import indexRouter from './routes';

// mongoose options for connecting to mongodb
const options = {
    useNewUrlParser: true, // Use the new URL Parser
    useFindAndModify: false,  // For findOneAndUpdate and findOneAndDelete
    useCreateIndex: true, 
    autoIndex: false, // Don't build Indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect 
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 Socket Connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

  
  // connection string 
mongoose.set('debug', true);
console.log(dbConnectionURL.LOCALURL);
mongoose.connect(dbConnectionURL.LOCALURL, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
     // we're connected !
     console.log('Mongodb Connection Successful');
});

// Initialize app
const app = express();

// View engine setup
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', ejs);

// logging 
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
  });
  

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

export default app;