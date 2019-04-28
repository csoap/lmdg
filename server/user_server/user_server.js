//引入express模块
express = require('express')
//创建express对象
const app = express()

//引入mysql模块
var db = require('../utils/db');

//引入加密模块
var crypto = require('../utils/crypto');
//响应json数据
function send(res, ret){
    var str = JSON.stringify(ret);
    res.send(str);
}
var config = null;
exports.start = function(cfg){
    config = cfg;
    app.listen(config.CLIENT_PORT, () =>  console.log('Example app listening on port '+ config.CLIENT_PORT));
}

app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", "3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/aaa',function(req, res){
    console.log('aaa进入');
    var getVersionNum = req.query.comversion;
    console.log('versionNum: ' + getVersionNum);
    var data = {version:'2222'};
    send(res, data);
});

app.get('/bbb',function(req, res){
    console.log('bbb进入');
    db.getNameByUserid(391, function(name){
        console.log('name: ' + name);
        res.send('你要查询的姓名是： ' + name);
    });
});
//获取版本号响应
app.get('/getVersion',function(req, res){
    var verNumber = config.VERSION_NUMBER
    send(res,{'version': verNumber});
});

//登陆游戏响应
app.get('/loginGame',function(req,res){
    var account = req.query.account;
    var password = req.query.password;
    //判断是否为空
    if(account == "" || password == ""){
        send(res,{code : 1 ,msg :"account or password is null"});
    }
    //验证账号密码是否存在
    db.vercifyPassword(account, password, function(data){
        var sign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
        if(data){
            if(data[1] != null){
                send(res,{code : 0, msg : "ok",account : account, sign : sign,username:data[1]});
            }else{
                send(res,{code : 0, msg : "ok",account : account, sign : sign});
            }
        }else{
            send(res,{code : 0, msg : "the password or account is wrong"});
        }
    });
});
//注册响应
app.get('/register',function(req,res){
    var account = req.query.account;
    var password = req.query.password;
    //判断是否为空
    if(account == "" || password == ""){
        send(res,{code : 1 ,msg :"account or password is null"});
    }
    db.judgeAccount(account,function(has){
        if(has){
            send(res,{code:1,msg : "the account is used"});
        }else{
            //没有的话，就创建一个账号
            db.createAccount(account,password,function(suc){
                if(suc){
                    var sign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
                    send(res,{code : 0, msg : "ok",account : account, sign : sign});
                }else{
                    send(res,{code : 1, msg : "create account happened error"});
                }
            });
            
        }
    });
});

//创建角色
app.get('/createRole',function(req,res){
    var account = req.query.account;
    var sign = req.query.sign;
    var sex = req.query.sex;
    var username = req.query.username;
    //判断是否为空
    if(account == "" || sign == "" || sex == "" || username == ""){
        send(res,{code : 1 ,msg :"params is null"});
        return;
    }
    var mySign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
    if(mySign != sign){
        send(res,{code : 1 ,msg :"sigin is err"});
        return;
    }
    db.judgeUsername(username,function(has){
        if(has){
            send(res,{code:1,msg : "the username is used"});
        }else{
            //没有的话，就更新用户信息
            db.updateInfo(sex,username, account,function(suc){
                if(suc){
                    send(res,{code : 0, msg : "ok",username : username, sex : sex});
                }else{
                    send(res,{code : 1, msg : "update user info happened error"});
                }
            });
            
        }
    });
});