var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var pool = require ('./models/bd'); //bd.js



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



///////////////SELECT//////////////////////
pool.query('select * from `empleados`').then(function (resultados){console.log(resultados)})

//////////////UPDATE//////////////////////

var id=21;
var obj={
  Nombre: 'Pablo',
  Apellido: 'Gomez'
}

pool.query('UPDATE empleados SET ? where `Id-empleado`=21', [obj, id]).then(function(resultados){
  console.log(resultados);
});

///////////////INSERT//////////////////////

pool.query("INSERT INTO `empleados`(`Id-empleado`, Nombre, Apellido, Trabajo, Edad, Salario, Mail)VALUES (22,'Diego', 'Cartelle', 'Programador', 45, 150000, 'diego@atob.com')", (err, res) => {
  console.log(err, res);
  pool.end();
}
);


///////////////DELETE//////////////////////
var id = 1;
pool.query("DELETE FROM `empleados` where `Id-empleado`= ?", [id]).then(function(resultados){console.log(resultados);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
