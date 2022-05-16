
const Emitter = require('mEmitter');
const Variables = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit(Variables.transPrincess, this)
    },
    stopAllAnim() {
        this.node.stopAllActions()
    },
    anim() {
        this.node.runAction(cc.repeatForever(cc.jumpBy(1,0,0,50,1)))
    },
    start () {
        
    },

    // update (dt) {},
});
