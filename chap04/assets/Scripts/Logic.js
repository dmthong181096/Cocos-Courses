// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        _isCompletedAll: false,
        rabbitWhite: {
            default: null,
            type: cc.Component
        },
        rabbitBrown: {
            default: null,
            type: cc.Component
        },
        rabbitGray: {
            default: null,
            type: cc.Component
        },
        rabbitBlack: {
            default: null,
            type: cc.Component
        },
    },
    get isCompletedAll(){
        return this._isCompletedAll
    },
    set isCompletedAll(value){
        return this._isCompletedAll = value
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {this.rabbitWhite.getComponent("rbWhite").movePixelX = 500},
    start () {
        this.rabbitWhite.active = true
    },
    update (dt) {
        if (this.isCompletedAll) {
            cc.log("Break Check Complete")
            return 
        }
        if (this.rabbitWhite.getComponent("rbWhite").isCompleted) {
            this.rabbitBrown.node.active = true
        }
        if (this.rabbitBrown.getComponent("rbBrown").isCompleted) {
            this.rabbitGray.node.active = true
        }        
        if (this.rabbitGray.getComponent("rbGray").isCompleted) {
            this.rabbitBlack.node.active = true
        }        
    },
});
