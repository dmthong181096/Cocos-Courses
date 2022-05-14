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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance = new Emitter();
        // Emitter.instance.registerEvent("HELLO", this.onHello.bind(this));
        Emitter.instance.registerEvent("transScore", this.transScore,this);
        Emitter.instance.registerEvent("transBestScore", this.transBestScore,this);
        
    },
    transScore(data){
        Variables.score = data
    },
    transBestScore(data) {
        Variables.bestScore = data
    },
    start () {
        // console.log( Variables.score.node);
        this.init()
    },
    init() {
        Variables.score.updateScore(10)
        Variables.bestScore.updateBestScore(20)
    },

    // update (dt) {},
});
