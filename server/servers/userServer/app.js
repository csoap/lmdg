var cfg = require('../../config');
var config = cfg.userServer();

var db = require('../../utils/db');
db.init(cfg.mysql());

var redisConfig = cfg.redis();
var userRedis = require('../../redis/userRedis');
userRedis.connect(redisConfig);

var us = require('./userServer');
us.start(config);