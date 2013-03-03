
//This is the model used my mongoose to store data in the database
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

  //the model schema
var poiSchema = new Schema({
    name:String,
    description:String,
    date: {type: Date, default: Date.now},
    longitude: Number,
    latitude: Number,
    tourName: String
	//pictureURL: String
});

module.exports = mongoose.model('poi', poiSchema);
