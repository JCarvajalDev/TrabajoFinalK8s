'use strict'

var mysql = require('mysql');

module.exports = {
    name: 'rest-api',
    hostname : 'http://localhost',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    db: {
        get : mysql.createConnection({
			host     : 'dbmysql',
			user     : 'root',
			password : '123123', // SET YOUR MYSQL PASSWORD IF NECESSARY
			database : 'contacts',
            port: 3306            
		})
    }
}
