
const Emitter = require('mEmitter');
const Variables = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        audioBoom: cc.AudioClip ,
        // audioBackground: cc.AudioClip ,
        // audioShoot: cc.AudioClip ,
        // audioJump: cc.AudioClip ,
        // audioRun: cc.AudioClip ,
        // audioBoom: cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit(Variables.transAudio, this)
    },
    start () {

    },

    audioBoomExplosion (){
        cc.audioEngine.play(this.audioBoom, false, 1);
    },
    audioBackground (){
        cc.audioEngine.play(this.audioBackground, false, 1);
    },
    onDestroy: function () {
        // cc.audioEngine.stop(this.current);
    }


    // update (dt) {},
});
