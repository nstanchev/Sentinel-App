const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

module.exports = (app) => {
  app.set('view engine', 'pug');
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(session({
    secret: 'neshto-taino!@#$%',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user;
    }

    next();
  });

  app.use(express.static('public'));

  console.log('Express ready!');
};
