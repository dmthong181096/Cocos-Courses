
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        textSuccess : require("TextSuccess")

    },

    // LIFE-CYCLE CALLBACKS:    
    onEnable() {
        this.textSuccess.node.active = true
    },
    onLoad () {
    },
 
    start () {
    },

    update (dt) {
    },
});
