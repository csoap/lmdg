function initManager(){
    cc.vv = {};
    cc.vv.http = require("../HTTP");
    var UserMgr= require("../UserManager");
    cc.vv.userMgr = new UserMgr();
}

cc.Class({
    extends: cc.Component,

    properties: {
        status:{
            default : null,
            type: cc.Label
        }
    },

    onLoad () {
        initManager();
        //获取本地 版本号
        cc.loader.loadRes("version/versionNumber.txt", function (err, data) {
            // cc.log('客户端版本号： '+ data.text,1111);  //本地文件数据
            this.getVersion(data.text);
        }.bind(this));

    },

    getVersion : function(localVersion){

        var self = this;
        //请求成功后的业务处理函数
        var onSuccess = function(serverVersion){
            cc.log("versionServer:",serverVersion.version);
            cc.log("localVersion:",localVersion);
            //比较版本号
            if(serverVersion.version != localVersion){
                cc.log("The version is older!");
            }else{
                self.status.string = "连接成功";
                cc.log("The same game version!");
                //场景淡出
                self.picFadeOut(function(){
                    cc.director.loadScene("login");
                });
            }
        };
    
        var xhr = null;
        var comp = false;
        //请求连接函数
        var connectServ = function(){
            //取服务器上的版本号
            self.status.string = "正在连接服务器...";
            var xhr = cc.vv.http.sendRequest("/getVersion",null,function(serverVersion){
                xhr = null;
                comp = true;
                onSuccess(serverVersion);
            });
            if(!comp){
                setTimeout(conn,3000);
            }
        };
            
        //请求启动函数
        var conn = function(){
            if(!comp){
                if(xhr){
                    xhr.abort(); 
                } 
                self.status.string = "连接失败，即将重新尝试！"; 
                setTimeout(connectServ,4000);
            }
        };
        connectServ();
     
        },

    // getVersion: function(localVersion){
    //     //获取服务端版本号
    //     cc.vv.http.sendRequest('/getVersion', null, function(data){
    //         console.log('客户端版本号： ' + localVersion);
    //         console.log('服务端版本号： ' + data.version);
    //         if(localVersion == data.version){
    //             this.picFadeOut(function(){
    //                 cc.director.loadScene('login');
    //             });
    //         }else{
    //             cc.log('版本不一致', '客户端版本号： ' + localVersion, '服务端版本号： ' + data.version)
    //         }
    //     }.bind(this));
    // },
    //淡出场景
    picFadeOut: function(callback){
        var picN = cc.find('Canvas/q');
        var fadeTime = 1500;
        var nowTime = Date.now();
        var timePercent = 0;
        if(picN.getComponent(cc.Sprite).spriteFrame == null){
            callback();
            return;
        }
        var changeFade = function(){
            var duringTime = Date.now() - nowTime;
            timePercent = duringTime/fadeTime;
            if(timePercent > 1){
                timePercent = 1;
            }
            picN.opacity = 255 - 255 * timePercent;
            if(timePercent == 1){
                picN.active = false;
                callback();
                return;
            }else{
                setTimeout(changeFade, 30);
            }
        }
        setTimeout(changeFade, 30);
    },
    start () {

    },

    // update (dt) {},
});
