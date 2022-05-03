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
        scale: 0,
        movePixelX: 0,
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
    move() {
        return this.actions = [cc.scaleTo(this.duration,this.scale),cc.moveBy(this.duration,this.movePixelX,0),cc.flipX(true),cc.moveBy(this.duration,-this.movePixelX,0),cc.flipX(false)]
    },
    start () {
        cc.log("Rabbit Black: Hello!!!")
        this.node.runAction(cc.sequence(this.move()))
    },
    // onLoad () {},
    // update (dt) {},
});
