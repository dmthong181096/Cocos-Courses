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
        scoreGame: cc.RichText,
        score:100
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit(Variables.transScore, this);
    },
    updateScore() {
        // if (Variables.isCompleted) {
            let actions = [cc.callFunc(() => { this.checkScore() }),
                cc.delayTime(1),
                cc.callFunc(() => { this.scoreGame.string = "<color=#CD5555>SCORE:</c>" + ` <color=#FFCC33> ${this.score}</color>` })]
            this.scoreGame.node.runAction(cc.repeat(cc.sequence(actions), this.score))
        // }
        // score = 100

    },
    checkScore() {
        this.score -= 1
        if (this.score < 0) {
            // Variables.player.death(Variables.death, false)
            Variables.background.showResult(false);
        }
    },
    start () {

    },

    // update (dt) {},
});
