// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let Variables = {
    //Anim
    run: "run",
    idle: "idle",
    jump: "jump",
    death: "death",
    hoverboard: "hoverboard",
    portal: "portal",
    shoot: "idle",
    //Var
    boss : null,
    bullet : null,
    background: null,
    resultBoard: null,
    player: null,
    princess: null,
    audio: null,
    isCompleted:false,
    isStart: false,
    isCollided: false,
    score: null,
    cloud: null,
    //Emit
    transBoss: "transBoss",
    transPlayer: "transPlayer",
    transAudio: "transAudio",
    transScore: "transScore",
    transBackGround: "transBackGround",
    transBullet: "transBullet",
    transStone: "transStone",
    transPrincess: "transPrincess",
    transCloud: "transCloud",
}
module.exports = Variables;
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
