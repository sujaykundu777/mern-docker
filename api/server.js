import createError from 'http-errors';
import express from 'express';
import path from 'path';
import ejs from 'ejs';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import './config/db';

// Routes
import indexRouter from './routes';
import userRouter from './routes/users';

// Initialize app
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));

// logging 
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Routes
app.use('/', indexRouter);
app.use('/users', userRouter);

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