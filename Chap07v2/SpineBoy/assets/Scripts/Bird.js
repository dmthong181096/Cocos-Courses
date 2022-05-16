// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
    fly() {
        // this.random = Math.floor(Math.random() * (850 - 650) ) + 650 
        let actions = [cc.moveBy(10,1500,0),
            // cc.callFunc( ()=> { this.random = Math.floor(Math.random() * (850 - 650 ) ) + 650 ; console.log(this.random);}),
            cc.moveTo(0,-100,650)]
        this.node.runAction(cc.repeatForever(cc.sequence(actions)))
    },

    start () {

    },

    // update (dt) {},
});
