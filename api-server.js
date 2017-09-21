/**** 
 * Sample API
 * 
 * Using express for API server
 * API will serve JSON Object having menu items data
 * 
 ***/

// express server configuration
var express = require('express');
var api = express();

// api port, api will be running on 8080
var port = 8080;

// enable cors
api.all('/*', function(req, res, next) {
  console.log('request made for: %s', req.originalUrl);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  next();
});

// api root
api.get('/', function(req, res) {
  res.send(
    'api running... <br> please use "/api/menu-items" for getting all menu items!'
  );
});

// menu items data structure
var menuItems = [
  { id: 1, name: 'one' },
  { id: 2, name: 'two' },
  { id: 3, name: 'three' },
  { id: 4, name: 'four' }
];

// get all menus items
api.get('/api/menu-items', function(req, res) {
  res.send(menuItems);
});

// search menu items
api.get('/api/menu-items/search', function(req, res) {
  var searchResult = menuItems;
  if (req.query.searchText) {
    var searchText = req.query.searchText;
    var searchResult = menuItems.filter(item => {
      return item.name.indexOf(searchText) >= 0;
    });
  }
  res.send(searchResult);
});

// api listen
api.listen(port, function() {
  console.log('api listening on port ' + port);
});

// api call
// fetch("http://localhost:8080/api/menu-items")
//   .then(response => response.json())
//   .then(items => {
//     this.setState({items});
//   }, e => {
//     console.log(e);
//   });
