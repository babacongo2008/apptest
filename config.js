var env = process.env;
var nodeEnv = env.NODE_ENV || 'development';

exports.nodeEnv;

exports.logStars = function(message) {
  console.info('**********');
  console.info(message);
  console.info('**********');
};

exports.port = env.PORT || 8000;
exports.host = env.HOST || 'localhost';
exports.mongodbUri = 'mongodb://root:root@ds157799.mlab.com:57799/taxi_db';
//exports.mongodbUri = 'mongodb://root:root@127.0.0.1:27017/taxi_db';
