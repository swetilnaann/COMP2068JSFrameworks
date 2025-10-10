var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', { title: 'Home' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About Me' });
});

router.get('/PROJECTS', (req, res) => {
  res.render('PROJECTS'); 
});

// Individual Project Pages
router.get('/PROJECT1', (req, res) => {
  res.render('PROJECT1');
});

router.get('/PROJECT2', (req, res) => {
  res.render('PROJECT2');
});

router.get('/PROJECT3', (req, res) => {
  res.render('PROJECT3');
});

// Contact Page
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
