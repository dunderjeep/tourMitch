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

var Tour = require('../model/tour.js');

exports.post = function(req, res) {
    var tour = new Tour({name: req.body.name, description: req.body.descr});
    tour.save(function (err) {
        if (err) throw err;
        console.log('Task saved.');
        
        res.send('Tour saved.');
    });
}

exports.save = function(req, res) {
    var tour = new Tour({name: req.params.name, description: req.params.descr});
    tour.save(function (err) {
        if (err) throw err;
        console.log('Tour saved.');
	
        res.send('Tour saved.');
    });
}

exports.list = function(req, res) {
    Tour.find(function(err, tour) {
	res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] + '({"records":' +  JSON.stringify(tour) + '});');
    });
}

exports.show = (function(req, res) {
    Tour.findOne({name: req.params.name}, function(error, tour) {
        res.send([{Tour: tour}]);
    })
});


