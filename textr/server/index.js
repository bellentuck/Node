'use strict';

/** Questions:
 1) To what extent are require statements deprecated in favor of import statements?
  const express = require('express');
  const bodyParser = require('body-parser');
  const ejs = require('ejs');
 2) To what extent is ejs deprecated in favor of done.js?
*/

/** Glossary:
 - body-parser: middleware to parse form input onto a body property of the JSONified request.
 - ejs: HTML templating tool.
*/

// Setup
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app = express();
const server = app.listen(4000);

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serving HTML
app.get('/', (req, res) => {
  res.render('index');
});
