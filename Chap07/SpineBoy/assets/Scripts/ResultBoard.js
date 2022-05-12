
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        textResult: cc.RichText
    },
    lose(score){
        this.textResult.string = `<color=#00ff00>YOU </c><color=#0fffff>LOSE</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${score}</color>`;
    },
    win(score) {
        this.textResult.string = `<color=#00ff00>YOU </c><color=#0fffff>WIN</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${score}</color>`;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
