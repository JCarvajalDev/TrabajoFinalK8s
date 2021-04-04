# Address Book
---
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/150px-React-icon.svg.png" width="200" height="150"><img src="https://www.mysql.com/common/logos/includes-mysql-167x86.png" width="180" height="120"><img src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png" width="180" height="140"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/256px-Node.js_logo.svg.png" width="180" height="130">
---
##### CRUD app built using React.js and Redux on the frontend, Node.js and mySQL on the backend.
[Video of App](https://vimeo.com/265299862)
---
#### Functionality:
1. Ability to Create a contact
2. Ability to Read contacts
3. Edit contacts
4. Delete contacts

###### All data is persisted on the back end via mySQL and Node.js.
---
Install:
1. Download the zip file
2. Make sure you have mysql installed
3. Change the sql settings in Restify Server > config.js to match the password and username you have set for your mysql
4. Navigate to both Restify Server and AddressBookApp in seperate terminal tabs
5. Run `npm install` on both tabs
6. Run `npm start` on both tabs

#### TODO
- [ ] Add ability to search
- [ ] Sort address book

#### Notes
Currently I am using a few dependencies:

- [MV](https://www.npmjs.com/package/mv) - a handy utility to help move and save files
- [Restify](https://www.npmjs.com/package/restify) - used to create the REST webservice in the Restify Server folder.
- [mysql](https://www.npmjs.com/package/mysql) - used for the database
- [semantic-ui-react](https://www.npmjs.com/package/semantic-ui-react) - UI Library
