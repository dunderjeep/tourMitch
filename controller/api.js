var POI = require('../model/POI.js');

exports.post = function(req, res) {
    var location = new POI({name: req.body.name, description: req.body.descr,
        longitude: req.body.longitude, latitude: req.body.latitude});
    location.save(function (err) {
        if (err) throw err;
        console.log('Task saved.');
        
        res.send('POI saved.');
    });
}

exports.save = function(req, res) {
    var location = new POI({name: req.params.name, description: req.params.descr,
        longitude: req.params.longitude, latitude: req.params.latitude});
    location.save(function (err) {
        if (err) throw err;
        console.log('POI saved.');
	
        res.send('POI saved.');
    });
}

exports.list = function(req, res) {
    POI.find(function(err, location ) {
	res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] + '({"records":' +  JSON.stringify(location ) + '});');
    });
}

exports.show = (function(req, res) {
    POI.findOne({name: req.params.name}, function(error, location ) {
        res.send([{Dog: location }]);
    })
});

exports.near = function(req, res) {
    POI.find({coords : { $near : [req.params.lon, req.params.lat], $maxDistance : req.params.dist/68.91}}, function (error, location ) {        
        res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
        res.send(req.query["callback"] +'({"records":' + JSON.stringify(location ) + '});');
    })
}

