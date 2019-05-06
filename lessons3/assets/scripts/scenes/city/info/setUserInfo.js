
cc.Class({
    extends: cc.Component,

    properties: {
        vipLabel : {            //vip等级
            default : null,
            type : cc.Label,
        },
        lvLabel : {            //等级
            default : null,
            type : cc.Label,
        },
        powerLabel : {            //战斗力
            default : null,
            type : cc.Label,
        },
        coinsLabel : {            //金币
            default : null,
            type : cc.Label,
        },
        expBar  : {         //经验进度条
            default : null,
            type : cc.ProgressBar,
        },
    },

    onLoad () {
        this.setInfo();
    },

    start () {

    },

    setInfo(){
        var userMG =  cc.vv.userMgr;
        this.vipLabel.getComponent(cc.Label).string = userMG.vip;
        this.lvLabel.getComponent(cc.Label).string = "Lv." + userMG.lv;
        this.coinsLabel.getComponent(cc.Label).string = userMG.coins;
        this.powerLabel.getComponent(cc.Label).string  = userMG.power + "M";
        this.expBar.getComponent(cc.ProgressBar).progress = userMG.exp / userMG.expAll;
    },

    // update (dt) {},
});
