cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,    //地图移动速度
        topshow:{
            default: null,
            type:cc.Node
        }
    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, function ( event ) {
            //点击其他地方，提示就删除
            if(this.topshow.childrenCount > 0){
                this.topshow.destroyAllChildren();
            }
        },this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function ( event ) {
            var lx = event.getDeltaX();
            var ly = event.getDeltaY();
            var x = this.node.x;
            var y = this.node.y;
            if(x + lx * this.speed < 1400 && x + lx * this.speed > -1400){
                this.node.x = x + lx * this.speed;
            }
            if(y + ly * this.speed  < 384 && y + ly * this.speed > -384){
                this.node.y = y + ly * this.speed;
            }
        },this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, function ( event ) {
            
        // },this);
        // this.node.on(cc.Node.EventType.TOUCH_END, function ( event ) {
            
        // },this);

    },

    start () {

    },

    // update (dt) {},
});
