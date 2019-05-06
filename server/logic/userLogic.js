//引入userDao
var userDao = require('../dao/userDao');
var crypto = require('../utils/crypto');

function nop(a,b,c,d,e,f,g){}

//获取建筑信息
exports.getBuildingIF = function(callback){
    callback = callback == null ? nop : callback;

    userDao.getBuildingIF(function(rows){
        if(rows){
            callback(rows);
        }else{
            callback(false);
        }
    });
}

//更新昵称和性别
exports.updateInfo = function(sex, username, account, callback){
    callback = callback == null ? nop : callback;
    if(sex == null || username == null){
        callback(null);
        return;
    }

    userDao.updateInfo(sex,username, account,function(suc){
        if(suc){
            callback(true);
        }else{
            callback(false);
        }
    });
}

exports.vercifyPassword = function(account, password, callback){
    callback = callback == null ? nop : callback;
    if(account == null || password == null){
        callback(null);
        return;
    }

    userDao.vercifyPassword(account, password, function(data){
        if(data){
            callback(data);
        }else{
            callback(false);
        }
    });
}

exports.createAccount = function(account, password, callback){
    callback = callback == null ? nop : callback;
    if(account == null || password == null){
        callback(null);
        return;
    }

    userDao.createAccount(account,password,function(suc){
        if(suc){
            callback(true);
        }else{
            callback(false);
        }
    });
}
//判断账户是否被注册
exports.judgeAccount = function(account, callback){
    callback = callback == null ? nop : callback;
    if(account == null){
        callback(null);
        return;
    }
    userDao.judgeAccount(account,function(has){
        if(has){
            callback(true);
        }else{
            callback(false);
        }
    });
}
//判断昵称是否被使用
exports.judgeUsername = function(username, callback){
    callback = callback == null ? nop : callback;
    if(username == null){
        callback(null);
        return;
    }

    userDao.judgeUsername(username,function(has){
        if(has){
            callback(true);
        }else{
            callback(false);
        }
    });
}
