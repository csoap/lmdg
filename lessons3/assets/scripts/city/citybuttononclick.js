cc.Class({
    extends: cc.Component,

    properties: {
        barrackPrefab:{
            default: null,
            type:cc.Prefab
        },
        detailPrefab:{      //详情
            default: null,
            type:cc.Prefab
        },
        upgradePrefab:{     //升级
            default: null,
            type:cc.Prefab
        },
        trainPrefab:{   //训练
            default: null,
            type:cc.Prefab
        },
        getMoneyPrefab:{    //征税 
            default: null,
            type:cc.Prefab
        },
        studyPrefab:{    //研究
            default: null,
            type:cc.Prefab
        },
        topshow:{
            default: null,
            type:cc.Node
        },
    },

    // onLoad () {},

    start () {

    },
    clickButton: function(event,customEventData){
        var tgnode = event.target;
        var tgname = tgnode.name;
        var topshow = this.topshow;
        var iconArray = new Array();
        switch(tgname){
            case 'barracks_one':
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.barrackPrefab;
                iconArray[2] = this.upgradePrefab;
                break;
            case 'barracks_two':
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.barrackPrefab;
                iconArray[2] = this.upgradePrefab;
                break;
            case 'trainning':
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.trainPrefab;
                iconArray[2] = this.upgradePrefab;
                break;
            case 'castle':  //城堡
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.getMoneyPrefab;
                iconArray[2] = this.upgradePrefab;
                break;
            case 'school':   //书院
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.studyPrefab;
                iconArray[2] = this.upgradePrefab;
                break;
            case 'warehouse_one':   //仓库1
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.upgradePrefab;
                break;
            case 'warehouse_two':   //仓库2
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.upgradePrefab;
                break;
            case 'warehouse_three':   //仓库3
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.upgradePrefab;
                break;
            case 'house':   //民居
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.upgradePrefab;
                break;
            case 'hood':   //伐木场
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.upgradePrefab;
                break;
            case 'stone':   //石材厂
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.upgradePrefab;
                break;
            case 'field':   //农田
                iconArray[0] = this.detailPrefab;
                iconArray[1] = this.upgradePrefab;
                break;
            default:

                cc.log('default');
        }
        var tx = event.getLocationX();
        var ty = event.getLocationY();
        var pnode2 = topshow.convertToNodeSpaceAR(cc.v2(tx, ty));
        if(topshow.childrenCount > 0){
            topshow.destroyAllChildren();
        }
        //存在第二个
        if(iconArray[2]){
            let node1 = cc.instantiate(iconArray[0]);
            let node2 = cc.instantiate(iconArray[1]);
            let node3 = cc.instantiate(iconArray[2]);
            topshow.addChild(node1);
            topshow.addChild(node2);
            topshow.addChild(node3);
            node2.y = pnode2.y - 80;
            node2.x = pnode2.x;
            node1.x = node2.x - 70;
            node1.y = node2.y + 30;
            node3.x = node2.x + 70;
            node3.y = node2.y + 30;
        }else{
            let node1 = cc.instantiate(iconArray[0]);
            let node2 = cc.instantiate(iconArray[1]);
            topshow.addChild(node1);
            topshow.addChild(node2);
            node1.x = pnode2.x - 40;
            node1.y = pnode2.y - 80;
            node2.x = pnode2.x + 40;
            node2.y = pnode2.y - 80;
        }

    },
    // update (dt) {},
});
