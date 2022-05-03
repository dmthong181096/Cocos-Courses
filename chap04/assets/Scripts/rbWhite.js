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
        duration: 0,
    },
    get isCompleted(){
        return this._isCompleted
    },
    set isCompleted(value){
        return this._isCompleted = value
    },
    
    // LIFE-CYCLE CALLBACKS:
    move(){
        return cc.moveBy(this.duration, this.movePixelX,0) 
    },
    checkCompleted(){
        return this.isCompleted = true
    },
    start () {
        cc.log("Rabbit White: Hello!")
        this.node.runAction(cc.sequence(this.move(),cc.callFunc(this.checkCompleted,this)));
    },
    // onLoad () {},
    // update (dt) {  },
});
