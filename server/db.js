const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const connection =(closure) => {
    return MongoClient.connect('mongodb://localhost:27017', (err,client) => {
        if(err){
            return console.log(err);
        }
        var db = client.db('mean');
        closure(db);
    });
}

const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
}

module.exports = {connection, sendError};