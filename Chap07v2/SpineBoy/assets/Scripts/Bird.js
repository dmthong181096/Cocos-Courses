const Emitter = require('mEmitter');
const Variables = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        // random: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit(Variables.transBird, this)
    },
    stopAllAnim() {
        let anim  =  this.node.getComponent(cc.Animation)
        anim.enabled = false
        this.node.stopAllActions()
    },
    fly() {
        let actions = [cc.moveBy(10,1500,0),
                       cc.moveTo(0,-100,650)]
        this.node.runAction(cc.repeatForever(cc.sequence(actions)))
    },

    start () {

    },

    // update (dt) {},
});
