const config  = require('./config'),
      restify = require('restify'),
      mysql = require('mysql'),
      mv = require('mv')


/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    url : config.hostname
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

var connection = config.db.get;
connection.connect(function(err) {
  if (err) throw err;
  var sql = 'CREATE TABLE IF NOT EXISTS `contacts` ('
  + '`id` int(11) unsigned NOT NULL AUTO_INCREMENT,'
  + '`first_name` varchar(30) NOT NULL DEFAULT "",'
  + '`last_name` varchar(30) NOT NULL DEFAULT "",'
  + '`image` varchar(255) DEFAULT "",'
  + '`phone_number` varchar(30) NOT NULL DEFAULT "",'
  + '`description` varchar(50) DEFAULT NULL,'
  + 'PRIMARY KEY (`id`)'
  +  ') ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8'
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
});

/**
 * Routing
 * TODO: Move routing to its own folder
 */

const apiURL = '/api/'

server.get(apiURL, function (req, res) {
   return res.end('API Working!');
});

// Get all contacts
server.get(apiURL + 'contacts', function (req, res) {
   connection.query('SELECT * FROM contacts', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

// Get contact by ID
server.get(apiURL + 'contacts/:id', function (req, res) {
   connection.query('SELECT * FROM contacts WHERE id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

// Create contact
server.post(apiURL + 'contacts', function (req, res, next) {

  var postData = req.body;
  var newPath = null

  //TODO Create checks for image

  // create new path for uploaded file
  if (req.files.image) {
    const nameArr = req.files.image.type.split('/')
    const extension = nameArr[nameArr.length - 1]
    var file = req.files.image;
    var img_name=file.name;
    newPath = `uploads/${img_name}_${new Date().getTime()}.${extension}`;

    // NPM Module to help store files
    mv(file.path, newPath, {
      mkdirp: true
    }, function(err, result) {
      if(err) {
        throw err;
      } else {
        return result
      }
    });
  }

  var params = [postData.first_name, postData.last_name, postData.phone_number, postData.description, newPath] // callback function in query below must be second
  connection.query('INSERT INTO contacts SET first_name=?, last_name=?, phone_number=?, description=?, image=?', params, function (error, results, fields) {

	  if (error) throw error;
    connection.query('SELECT * FROM contacts WHERE `id`= LAST_INSERT_ID()', function (error, results, fields) {
      res.end(JSON.stringify(results));
    })
	});
});

// Edit contact
server.put(apiURL + 'contacts', function (req, res) {
  var newPath = req.body.image

  //TODO Create checks for image

  // create new path for uploaded file
  if (req.files.image) {
    const nameArr = req.files.image.type.split('/')
    const extension = nameArr[nameArr.length - 1]
    var file = req.files.image;
    var img_name=file.name;
    newPath = `uploads/${img_name}_${new Date().getTime()}.${extension}`;

    // NPM Module to help store files
    mv(file.path, newPath, {
      mkdirp: true
    }, function(err, result) {
      if(err) {
        throw err;
      } else {
        return result
      }
    });
  }

  const params = [req.body.first_name, req.body.last_name, req.body.phone_number, req.body.description, newPath, req.body.id]
   connection.query('UPDATE contacts SET first_name=?, last_name=?, phone_number=?, description=?, image=? WHERE id=?', params, function (error, results, fields) {
	  if (error) throw error;
    connection.query('SELECT * FROM contacts WHERE `id`=?', req.body.id, function (error, results, fields) {
      res.end(JSON.stringify(results));
    })
	});
});

// Delete contact
server.del(apiURL + 'contacts/:id/*', function (req, res) {
   connection.query('DELETE FROM `contacts` WHERE `id`=?', [req.params.id], function (error, results, fields) {

    if (error) throw error;

    // Remove photo from disk
    var fs = require('fs');
    var filePath = req.params['*']; // file path should be parameter after id
    fs.unlink(filePath, function(err) {
      if(err){
        console.log(err);
      }
    });

    res.end(JSON.stringify(results));
  });
});

// Endpoint to statically serve profile pictures
server.get('/uploads/*', restify.plugins.serveStatic({
  directory: __dirname,
  default: 'index.html'
}))

server.listen(3001, function () {
  console.log('%s listening at %s', server.name, server.url);
});
