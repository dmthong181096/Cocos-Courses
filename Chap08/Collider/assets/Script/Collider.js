// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
// let vari = require('Var');
const varri = require('./Var');
cc.Class({
    extends: cc.Component,
    
    properties: {
        bullet: cc.Prefab,
        obs: cc.Node,
        mod: cc.Node
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
        varri.obs = this.obs
        varri.mod = this.mod
        // this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(5),cc.callFunc( ()=> { this.createBullet()}))))
        // this.createBulletGreen()
        // this.schedule(this.createBulletGreen,5,cc.macro.REPEAT_FOREVER,0)
        // this.createBullet()
        let actions = [cc.callFunc( ()=> { this.createBulletGreen()}),cc.delayTime(5),cc.callFunc( ()=> { this.createBulletRed()}),cc.delayTime(5),cc.callFunc( ()=> { this.createBulletYellow()})]
        this.node.runAction((cc.sequence(actions)))


        let manager = cc.director.getCollisionManager();
         manager.enabled = true;
         manager.enabledDebugDraw = true;
    },

    createBulletGreen() {
        let bullet = cc.instantiate(this.bullet)
        
        bullet.group = "BulletGreen"
        bullet.name = "BulletGreen"
        console.log(bullet.name, "is created ");
        bullet.color =  cc.color("green")
        bullet.parent = this.node
        bullet.x = -600 
        bullet.y = -120
        // button.moveRight()   
        // bullet.moveRight()
    },
    createBulletRed() {
        let bullet = cc.instantiate(this.bullet)
        bullet.group = "BulletRed"
        bullet.name = "BulletRed"
        console.log(bullet.name, "is created ");
        bullet.color = new cc.Color(255,0,0)
        bullet.parent = this.node
        bullet.x = -600 
        bullet.y = -120
    },
    createBulletYellow() {
        let bullet = cc.instantiate(this.bullet)
        bullet.group = "BulletYellow"
        bullet.name = "BulletYellow"
        bullet.color = new cc.Color(255,255,0)
        console.log(bullet.name, "is created ");
        bullet.parent = this.node
        bullet.x = -600 
        bullet.y = -120
    },
    move() {

    },
    start () {

    },

    // update (dt) {},
});
