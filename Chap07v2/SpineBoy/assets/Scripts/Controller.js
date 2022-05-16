
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
        Emitter.instance.registerEvent(Variables.transBird, this.transBird, this);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },
    transBird(data) {
        Variables.bird = data
    },
    transPrincess(data) {
        Variables.princess = data
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
    loadAnimBackground() {
        Variables.audio.playAudioBackground()
        Variables.boss.anim()
        Variables.princess.anim()
        Variables.bird.fly()
        Variables.score.updateScore()
    },
    stopAllAnimBackground() {
        cc.log("Stop All");
        Variables.bird.stopAllAnim()
        Variables.score.node.stopAllActions()
        Variables.boss.stopAllAnim()
        Variables.princess.stopAllAnim()
    },
    // onEnable() {

    // },
    init() {

    },
    start() {
        this.resultBoard.node.active = false
        Emitter.instance.emit(Variables.transBackGround, this)
        this.loadAnimBackground()
        Variables.player.portal(Variables.portal, false)
        Emitter.instance.registerEvent(Variables.transBullet, this.transBullet, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onKeyDown: function (event) {
        if (Variables.isCompleted == false) {
            cc.log("Not complete");
            return
        }
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                if (Variables.isPressedLeft == false) {
                    Variables.audio.playAudioRun()
                    Variables.isPressedRight = false
                    Variables.isPressedLeft = true
                    Variables.player.back(Variables.run, true)
                }
                break;
            case cc.macro.KEY.right:
                if (Variables.isPressedRight == false) {
                    Variables.audio.playAudioRun()
                    Variables.isPressedRight = true
                    Variables.isPressedLeft = false
                    Variables.player.run(Variables.run, true)
                }
                break;
            case cc.macro.KEY.up:
                if (Variables.isCompleted == true) {
                    Variables.audio.playAudioJump()
                    Variables.player.jump(Variables.jump, false)
                    Variables.isPressedRight = false
                    Variables.isPressedLeft = false
                    Variables.isCompleted = false
                }
                break;
            case cc.macro.KEY.space:
                if (Variables.isPressedSpace == false && Variables.isStart == true) {
                    Variables.audio.playAudioShoot()
                    Variables.isPressedRight = false
                    Variables.isPressedLeft = false
                    Variables.player.shoot(Variables.shoot, false)
                }
                break;
            case cc.macro.KEY.down:
                if (Variables.isCompleted == true) {
                    Variables.audio.pauseAll()
                    Variables.isPressedRight = false
                    Variables.isPressedLeft = false
                    Variables.isCompleted = false
                    Variables.player.down(Variables.idle, false)
                }
                break;
        }

    },
    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                break;
            case cc.macro.KEY.right:
                break;
            case cc.macro.KEY.up:
                Variables.isPressedUp = false
                break;
            case cc.macro.KEY.space:
                break;
        }
    },
    showResult(win = true) {
        Variables.isCompleted = false
        Variables.isStart = false
        Variables.player.spineBoy.clearTracks()
        this.stopAllAnimBackground()
        this.score = Variables.score.score + 1
        if (win) {
            Variables.player.spineBoy.setAnimation(0, Variables.hoverboard, false)
            Variables.player.spineBoy.setCompleteListener(() => {
                this.resultBoard.node.active = true
                this.node.opacity = 100
                this.resultBoard.win(this.score)
                Variables.audio.playAudioWin()
            })
        } else {
            Variables.player.spineBoy.setAnimation(0, Variables.death, false)
            Variables.audio.playAudioDeath()
            Variables.player.spineBoy.setCompleteListener(() => {
                this.resultBoard.node.active = true
                this.node.opacity = 100
                this.resultBoard.lose(this.score)
                Variables.audio.playAudioLose()
            })
        }
    },
    update(dt) {

    },
});
