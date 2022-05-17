// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const varri = require('./Var');
cc.Class({
    extends: cc.Component,

    properties: {
        // obs: cc.Node,
        // mod: cc.Node,
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

    // onLoad () {},
    moveRight() {
        this.node.runAction(cc.moveBy(8, 1500, 0))
    },
    start() {
        this.node.runAction(cc.moveBy(8, 1500, 0))
    },
    onCollisionEnter: function (other, self) {
        if (self.node.name == "BulletGreen") {
            if (other.node.name == "ston") {
                console.log("BulletGreen on collision enter with OBS and stop BulletGreen");
                self.node.stopAllActions()
            }
        }
        if (self.node.name == "BulletRed") {
            if (other.node.name == "pokemon") {
                console.log("BulletRed on collision enter with MOD and stop BulletRed");
                self.node.stopAllActions()
            }
        }
        if (self.node.name == "BulletYellow") {
            if (other.node.name == "ston") {
                console.log("BulletYellow on collision enter with OBS and destroy OBS");
                varri.obs.destroy()
            }
        }
        

        // console.log('on collision enter');
    },
    onCollisionStay: function (other, self) {
        // console.log('on collision stay');
    },
    onCollisionExit: function (other, self) {
        if (self.node.name == "BulletYellow") {
            if (other.node.name == "pokemon") {
                console.log("BulletYellow on collision exie with MOD and destroy MOD");
                varri.mod.destroy()
            }
        }
        // console.log('on collision exit');
    }
    // update (dt) {},
}); 
