var cfg = require('../../config');
var config = cfg.cityServer();

var db = require('../../utils/db');
db.init(cfg.mysql());

var redisConfig = cfg.redis();
var cityRedis = require('../../redis/cityRedis');
cityRedis.connect(redisConfig);

var us = require('./cityServer');
us.start(config);