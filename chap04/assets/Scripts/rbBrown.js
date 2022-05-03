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
        movePixelX: 0,
        rotate: 0,
        numberRepeat: 0,
        duration:0,
    },
    get isCompleted(){
        return this._isCompleted
    },
    set isCompleted(value){
        return this._isCompleted = value
    },
    move() {
        return cc.repeat(cc.spawn(cc.rotateBy(this.duration,this.rotate),cc.moveBy(this.duration,this.movePixelX,0)),this.numberRepeat)
    },
    checkCompleted(){
        return this.isCompleted = true
    },
    // LIFE-CYCLE CALLBACKS:
    start () {
        cc.log("Rabbit Brown: Hello!!!")
        cc.log("Rabbit Brown: I'm Brownie!!!")
        this.node.runAction(cc.sequence(this.move(),cc.callFunc(this.checkCompleted,this)));
    },
    // onLoad () {},
    // update (dt) {},
});