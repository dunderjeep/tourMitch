#!/bin/env node
/*
 * Copyright (c) 2012., Qualcomm, Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

var express = require('express');
var mongoose = require('mongoose');
var app = express();

//  Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_INTERNAL_IP;
var port    = process.env.OPENSHIFT_INTERNAL_PORT || 80;
var dbhost  = process.env.OPENSHIFT_MONGODB_DB_HOST;
var dbport  = process.env.OPENSHIFT_MONGODB_DB_PORT;
var dbuname = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
var dbpwd   = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;

// Establish connection to MongoDB
mongoose.connect('mongodb://'+dbuname+':'+dbpwd+'@'+dbhost+':'+dbport+'/tourdb');

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

// set up the RESTful API, handler methods are defined in api.js
var api = require('./controller/api.js');
app.post('/poi', api.post);
app.get('/poi/:lon/:lat/:dist?', api.near);
app.get('/poi/:name/:descr/:latitude/:longitude?', api.save);
app.get('/poi/:name.:format?', api.show);
app.get('/poi', api.list);


//  And start the app on that interface (and port).
app.listen(port, ipaddr, function() {
   console.log('%s: Node server started on %s:%d ...', Date(Date.now() ),
               ipaddr, port);
});
