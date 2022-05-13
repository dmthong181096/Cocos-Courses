
const Emitter = require('mEmitter');
const Variables = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        boom: cc.Node,
        resultBoard: require("ResultBoard"),
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent(Variables.transBoss, this.transBoss, this);
        Emitter.instance.registerEvent(Variables.transPlayer, this.transPlayer, this);
        Emitter.instance.registerEvent(Variables.transAudio, this.transAudio, this);
        Emitter.instance.registerEvent(Variables.transScore, this.transScore, this);
        Emitter.instance.registerEvent(Variables.transPrincess, this.transPrincess, this);
        Emitter.instance.registerEvent(Variables.transCloud, this.transCloud, this);




        
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },
    transCloud(data) {
        Variables.cloud = data
        // console.log();
    },
    transPrincess(data) {
        Variables.princess = data
        // console.log();
    },
    transScore(data) {
        Variables.score = data
    },
    transBoss(data) {
        Variables.boss = data
    },
    transPlayer(data) {
        Variables.player = data

    },
    transAudio(data) {

        Variables.audio = data
    },
    transBullet(data) {
        Variables.bullet = data
    },
    loadAnimBackground(){
        Variables.boss.anim()
        Variables.princess.anim()
        Variables.cloud.anim()
    },
    // onEnable() {

    // },
    start() {
        this.resultBoard.node.active = false
        Emitter.instance.emit(Variables.transBackGround, this)
        this.loadAnimBackground()
        Variables.player.portal(Variables.portal, false)
        Emitter.instance.registerEvent(Variables.transBullet, this.transBullet, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                if (Variables.isCompleted == true) {
                    Variables.player.back(Variables.run, true)
                }
                break;
            case cc.macro.KEY.right:
                if (Variables.isCompleted == true) {
                    Variables.player.run(Variables.run, true)   
                }
                break;
            case cc.macro.KEY.up:
                if (Variables.isCompleted == true) {
                    Variables.player.jump(Variables.jump, true)
                    Variables.isCompleted = false
                }
                break;
            case cc.macro.KEY.space:
                if (Variables.isStart == true) {
                    Variables.player.shoot(Variables.shoot, false)
                }
                break;
        }
    },

    updateScore() {
        this.score = 100
        let actions = [cc.callFunc(() => { this.checkScore() }),
                        cc.delayTime(1),
                        cc.callFunc(() => { Variables.score.scoreGame.string = "<color=#CD5555>SCORE:</c>" + ` <color=#FFCC33> ${this.score}</color>` })]
        Variables.score.scoreGame.node.runAction(cc.repeat(cc.sequence(actions), 100))
    },
    checkScore() {
        this.score -= 1
        if (this.score < 0) {
            // Variables.player.death(Variables.death, false)
            Variables.player.showResult(false);
        }
    },
    update(dt) {

    },
});
