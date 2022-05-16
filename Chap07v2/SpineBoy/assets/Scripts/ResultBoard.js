
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        textResult: cc.RichText,
        animLose: cc.Node,
        animWin: cc.Node,
        rePlayBtn: cc.Node,
    },
    lose(score){
        let actions = [ cc.callFunc( ()=> { this.hideScore()}),cc.scaleTo(2,1.5),cc.scaleTo(1,1),cc.blink(1,8),cc.callFunc( ()=> {this.showScore()}),cc.callFunc( ()=>{this.updateScore(score)})]
        this.animLose.runAction(cc.sequence(actions))
    },
    win(score){
        let actions = [ cc.callFunc( ()=> { this.hideScore()}),cc.scaleTo(2,1.5),cc.scaleTo(1,1),cc.blink(1,8),cc.callFunc( ()=> {this.showScore()}),cc.callFunc( ()=>{this.updateScore(score)})]
        this.animWin.runAction(cc.sequence(actions))
    },
    hideScore() {
        this.textResult.node.active = false
        this.rePlayBtn.active = false
    },
    showScore() {
        this.textResult.node.active = true

    },
    // win(score) {
    //     let countScore = 0
    //     let actions = [  cc.callFunc(() => {countScore +=1 }),
    //                     cc.delayTime(0.01),
    //                     cc.callFunc(() => {   this.textResult.string = `<color=#00ff00>YOU </c><color=#0fffff>WIN</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${countScore}</color>`;})]
    //     this.textResult.node.runAction(cc.repeat(cc.sequence(actions), score))
    //     // this.textResult.string = `<color=#00ff00>YOU </c><color=#0fffff>WIN</color>\n<color=#CD5555>SCORE:</c> <color=#FFCC33>${score}</color>`;
    // },
    rePlay() {
        cc.director.loadScene("SpineBoy");
    },
    updateScore(score) {
        let countScore = 0
        let actions = [  cc.callFunc(() => {countScore +=1 }),
                        cc.delayTime(0.05),
                        cc.callFunc(() => {   this.textResult.string = ` <color=#CD5555>SCORE: </c><color=#FFCC33>${countScore}</color>`;})]
        this.textResult.node.runAction(cc.sequence(cc.repeat(cc.sequence(actions), score),cc.callFunc( ()=> {
            this.rePlayBtn.active = true
        })))
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rePlayBtn.on('mousedown', this.rePlay,this);
    },

    start () {

    },

    // update (dt) {},
});
