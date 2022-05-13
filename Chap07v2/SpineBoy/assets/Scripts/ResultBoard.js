
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        textResult: cc.RichText
    },
    lose(score){
        let countScore = 0
        let actions = [  cc.callFunc(() => {countScore +=1 }),
                        cc.delayTime(0.01),
                        cc.callFunc(() => {   this.textResult.string = `<color=#00ff00>YOU </c><color=#0fffff>LOSE</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${countScore}</color>`;})]
        this.node.runAction(cc.repeat(cc.sequence(actions), score))
       
    },
    win(score) {
        let countScore = 0
        let actions = [  cc.callFunc(() => {countScore +=1 }),
                        cc.delayTime(0.01),
                        cc.callFunc(() => {   this.textResult.string = `<color=#00ff00>YOU </c><color=#0fffff>WIN</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${countScore}</color>`;})]
        this.node.runAction(cc.repeat(cc.sequence(actions), score))
        // this.textResult.string = `<color=#00ff00>YOU </c><color=#0fffff>WIN</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${score}</color>`;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
