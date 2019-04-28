var CLIENT_PORT = '8889';
var CLIENT_IP = 'localhost';
var ACCOUNT_KEY = '#!#!#@!ASDAS12';

exports.userServer = function(){
    return {
        CLIENT_PORT:CLIENT_PORT,
        CLIENT_IP:CLIENT_IP,
        VERSION_NUMBER:"20190422",
    }
}

exports.mysql = function(){
    return {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "root",
        DATABASE: "gamedata",
        PORT: 3306
    }
}