const express = require('express')
const app = express()

app.listen(7777, () => console.log('Example app listening on port 7777!'))

//响应json数据
function send(res, ret){
    var str = JSON.stringify(ret);
    res.send(str);
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
    // send(res,'aaaaa');
    res.send('欢迎进入aaa')
});

// app.get('/', (req, res) => res.send('Hello World!'))

