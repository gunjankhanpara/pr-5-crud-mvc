const express = require('express');

const routes = express.Router();

const fileupload = require('../config/fileupload');

const crudcontroller = require('../controllers/CrudController');

routes.get('/',crudcontroller.index);
routes.post('/insertData',fileupload,crudcontroller.addRecord);
routes.get('/deleteData',crudcontroller.deleteData);
routes.get('/edit',crudcontroller.editData);


module.exports = routes;
