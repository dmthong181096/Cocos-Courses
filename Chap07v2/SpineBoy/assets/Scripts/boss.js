const Emitter = require('mEmitter');
const Variables = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        stone: cc.Prefab,
        hp: cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.emit(Variables.transBoss, this);
        this.hp.node.y += 50
        this.hp.progress = 1

    },
    onCollisionEnter: function (collisionObj) {
        if (this.hp.progress <= 0.1) {
            return
        }else if (collisionObj.node.name == "Bullet") {
            this.hp.progress -= 0.1
            collisionObj.node.destroy()
            if (this.hp.progress <= 0.1) {
                this.death()
            }
        }
    },
    anim() {
        let actions = [cc.jumpBy(2, cc.v2(150, 0), 50, 4),
                        cc.flipX(true),
                        cc.jumpBy(2, cc.v2(-150, 0), 50, 4),
                        cc.callFunc(() => { this.createStone() }),
                        cc.flipX(false)]
        this.node.runAction(cc.repeatForever(cc.sequence(actions)))
    },
    stopAllAnim() {
        this.node.stopAllActions()
    },
    createStone() {
        let stone = cc.instantiate(this.stone)
        stone.parent = Variables.background.node
        let move = cc.moveTo(1.5, Variables.player.node.x, Variables.player.node.y).easing(cc.easeCubicActionIn());
        let action = [move, cc.blink(0.3, 3), cc.callFunc(() => { stone.destroy() })]
        stone.x = this.node.x - 80
        stone.y = this.node.y + 80
        stone.runAction(cc.sequence(action))
        Emitter.instance.emit(Variables.transStone, stone)
    },
    death() {
        this.node.stopAllActions()
        let actions = [cc.rotateBy(1, 90),
                        cc.blink(0.5, 3),
                        cc.fadeOut(0.3),
                        cc.callFunc(() => { this.node.active = false })]
        this.node.runAction(cc.sequence(actions))
    },
    start() {

    },

    // update (dt) {},
});
