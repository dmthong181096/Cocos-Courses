
const Emitter = require('mEmitter');
const Variables = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreGame: cc.RichText,
        score: 100
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.emit(Variables.transScore, this);
    },
    updateScore() {
        let actions = [cc.callFunc(() => { this.checkScore() }),
                        cc.delayTime(1),
                        cc.callFunc(() => { this.scoreGame.string = "<color=#CD5555>SCORE:</c>" + ` <color=#FFCC33> ${this.score}</color>` })]
        this.scoreGame.node.runAction(cc.repeat(cc.sequence(actions), this.score))
    },
    checkScore() {
        this.score -= 1
        if (this.score <= 0) {
            Variables.background.showResult(false);
        }
    },
    start() {

    },

    // update (dt) {},
});
