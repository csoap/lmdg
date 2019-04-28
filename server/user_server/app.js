var cfg = require('../config');
var config = cfg.userServer();

var db = require('../utils/db');
db.init(cfg.mysql());

var us = require('./user_server');
us.start(config);