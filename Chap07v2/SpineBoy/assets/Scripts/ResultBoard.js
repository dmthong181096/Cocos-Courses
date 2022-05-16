
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        textResult: cc.RichText,
        animLose: cc.Node,
        animWin: cc.Node,
        rePlayBtn: cc.Node,
        particleWin: cc.ParticleSystem
    },
    lose(score){
        
        this.animLose.active = true
        this.animWin.active = false
        let actions = [ cc.callFunc( ()=> { this.hideScore()}),
                        cc.scaleTo(2,1.5),cc.scaleTo(1,1),cc.blink(1,8),
                        cc.callFunc( ()=> {this.showScore()}),
                        cc.callFunc( ()=>{this.updateScore(score)})]
        this.animLose.runAction(cc.sequence(actions))
    },
    win(score){
        this.particleWin.node.active = true
        this.animLose.active = false
        this.animWin.active = true
        let actions = [ cc.callFunc( ()=> { this.hideScore()}),
                        cc.scaleTo(2,1.5),cc.scaleTo(1,1),cc.blink(1,8),
                        cc.callFunc( ()=> {this.showScore()}),cc.callFunc( ()=>{this.updateScore(score)})]
        this.animWin.runAction(cc.sequence(actions))
    },
    hideScore() {
        this.textResult.node.active = false
        this.rePlayBtn.active = false
    },
    showScore() {
        this.textResult.node.active = true
    },
    rePlay() {
        cc.director.loadScene("SpineBoy");
    },
    updateScore(score) {
        let countScore = 0
        let actions = [ cc.callFunc(() => {countScore +=1 }),
                        cc.delayTime(0.05),
                        cc.callFunc(() => {   this.textResult.string = ` <color=#CD5555>SCORE: </c><color=#FFCC33>${countScore}</color>`;})]
        this.textResult.node.runAction(cc.sequence(cc.repeat(cc.sequence(actions), score),cc.callFunc( ()=> {
            this.rePlayBtn.active = true
        })))
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rePlayBtn.on('mousedown', this.rePlay,this);
        this.particleWin.node.active = false
    },

    start () {

    },

    // update (dt) {},
});
