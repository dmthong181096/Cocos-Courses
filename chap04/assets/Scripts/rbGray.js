// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    properties: {
        _isCompleted : false,
        duration: 0,
        jumpHeightPixel: 0,
        jumpNumber: 0
    },
    get isCompleted(){
        return this._isCompleted
    },
    set isCompleted(value){
        return this._isCompleted = value
    },
    // LIFE-CYCLE CALLBACKS:
    checkCompleted(){
        return this.isCompleted = true
    },
    jump(){
        return cc.jumpBy(this.duration,0,0,this.jumpHeightPixel,this.jumpNumber)
    },
    start () {
        cc.log("Rabbit Gray: Hmmm!!!")
        this.node.runAction(cc.sequence(this.jump(),cc.callFunc(this.checkCompleted,this)));
    },
    // onLoad () {},
    // update (dt) {},
});
