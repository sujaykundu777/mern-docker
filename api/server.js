import createError from 'http-errors';
import express from 'express';
import path from 'path';
import ejs from 'ejs';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// config
import './config/db';
const config = require('./config/main');
const auth = require('./config/passport')();
const allowOnly = require('./config/permissions').allowOnly;

// Routes
import indexRouter from './routes';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import dashboardRouter from './routes/dashboard';

// Initialize app
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));

// Initialize modules
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth.initialize());

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Initialize Routes
app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/dashboard',  auth.authenticate(), allowOnly(config.accessLevels.user, dashboardRouter));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});
  
// devlopment error handler
// stackstraces leaked to user
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

// production error handler 
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
});

export default app;