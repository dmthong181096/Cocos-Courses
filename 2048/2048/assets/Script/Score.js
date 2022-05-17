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
        scoreLabel: cc.Label,
        extraScoreLabel: cc.Label
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit('transScore', this);
        this.extraScoreLabel.node.active = false;
    },

    start () {
        
    },
    updateExtraScore(number) {
        let duration = 0.5
        if (number == 0) {
            return
        }
        console.log(number);
        this.extraScoreLabel.node.active = true
        this.extraScoreLabel.string = "+ " + number
        let actions = [cc.moveTo(0,0,0),
                        cc.moveTo(duration,0,20),
                        cc.moveTo(0,0,-20),
                        cc.callFunc( ()=> {this.extraScoreLabel.node.active = false}),
                        this.extraScoreLabel.node.stopAllActions(),
                    ]
        this.extraScoreLabel.node.runAction(cc.sequence(actions))
    },
    updateScore(number) {
        
        this.scoreLabel.string = "SCORE\n" + number
        // console.log( this.scoreLabel.string)
    }
    // update (dt) {},
});
