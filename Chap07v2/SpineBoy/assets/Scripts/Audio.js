
const Emitter = require('mEmitter');
const Variables = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        audioBackground: {
            default: null,
            type: cc.AudioClip
        },
        audioBoom: {
            default: null,
            type: cc.AudioClip
        },
        audioShoot: {
            default: null,
            type: cc.AudioClip
        },
        audioJump: {
            default: null,
            type: cc.AudioClip
        },
        audioRun: {
            default: null,
            type: cc.AudioClip
        },
        audioDeath: {
            default: null,
            type: cc.AudioClip
        },
        audioBoss: {
            default: null,
            type: cc.AudioClip
        },
        audioPrincess: {
            default: null,
            type: cc.AudioClip
        },
        audioLose: {
            default: null,
            type: cc.AudioClip
        },
        audioWin: {
            default: null,
            type: cc.AudioClip
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit(Variables.transAudio, this)
    },
    start () {

    },

    playAudioBoom(){
        this.pauseAll()
        cc.audioEngine.play(this.audioBoom, false);
    },
    playAudioBackground (){
        this.pauseAll()
        cc.audioEngine.play(this.audioBackground, false);
    },
    playAudioJump (){
        this.pauseAll()
        cc.audioEngine.play(this.audioJump, false);
    },
    playAudioShoot(){
        this.pauseAll()
        cc.audioEngine.play(this.audioShoot, false);
    },
    playAudioRun (){
        this.pauseAll()
        cc.audioEngine.play(this.audioRun, false);
    },
    playAudioDeath (){
        this.pauseAll()
        cc.audioEngine.play(this.audioDeath, false);
    },
    playAudioBoss (){
        this.pauseAll()
        cc.audioEngine.play(this.audioBoss, false);
    },
    playAudioPrincess(){
        this.pauseAll()
        cc.audioEngine.play(this.audioPrincess, false);
    },
    playAudioLose(){
        this.pauseAll()
        cc.audioEngine.play(this.audioLose, false);
    },
    playAudioWin (){
        this.pauseAll()
        cc.audioEngine.play(this.audioWin, false);
        
    },
    pauseAll() {
        cc.audioEngine.pauseAll()
    },
    onDestroy: function () {
    }


    // update (dt) {},
});
