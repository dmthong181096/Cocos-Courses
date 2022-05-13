
const Emitter = require('mEmitter');
const Variables = require('Variables');
cc.Class({
    extends: cc.Component,

    properties: {
        spineBoy: sp.Skeleton,
        bullet: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit(Variables.transPlayer, this)
        Emitter.instance.registerEvent(Variables.transBackGround, this.transBackGround,this);
        this.spineBoy.setMix(Variables.jump,Variables.idle,0.2)
    },

    onEnable(){ 
    },
    onCollisionEnter: function (collisionObj) {
        // if (Variables.isCollided == false) {
            if (collisionObj.node.name =="boom" || collisionObj.node.name == "boss" || collisionObj.node.name == "Stone") {
                Variables.isCollided == true
                // console.log( this.node.getComponent(cc.BoxCollider));s
                this.node.getComponent(cc.BoxCollider).enabled = false    
                this.showResult(false);
            }
            if (collisionObj.node.name =="Princess") {
                // Variables.isCollided == true
                this.showResult()
            }
        // }


 
    },
    start () {

    },
    transBackGround(data){      
        Variables.background = data
    },
    createBullet(){
        let bullet = cc.instantiate(this.bullet)
        bullet.parent = Variables.background.node
        let flip = this.spineBoy.node.scaleX >0 ? cc.flipX(false) : cc.flipX(true)
        let move = this.spineBoy.node.scaleX >0 ? cc.moveBy(1,1500,0) : cc.moveBy(1,-1500,0)
        let action = [flip,move,cc.callFunc( ()=>{ bullet.destroy()})]
        bullet.x = this.spineBoy.node.scaleX >0 ? this.spineBoy.node.x + 100 : this.spineBoy.node.x - 100
        bullet.y = this.spineBoy.node.y + 50
        bullet.runAction(cc.sequence(action))
        Emitter.instance.emit(Variables.transBullet, bullet)
    },
    shoot(action,loop = false) {
        this.spineBoy.setAnimation(0,action,loop)
        this.createBullet()
    },
    portal(action,loop = false){
        this.spineBoy.setAnimation(0,action,loop)
        this.spineBoy.setCompleteListener( ()=> {
            Variables.isCompleted = true
            Variables.isStart = true
            Variables.background.updateScore()
        })
    },
    back(action,loop = false) {
        this.spineBoy.setAnimation(0,action,loop)
        let actions = [cc.flipX(true),cc.moveBy(1,-180,0)]
        this.spineBoy.node.runAction(cc.sequence(actions))
    },
    run(action,loop = false){
        this.spineBoy.setAnimation(0,action,loop)
        let actions = [cc.flipX(false),cc.moveBy(1,180,0),cc.callFunc ( () => {})]
        this.spineBoy.node.runAction(cc.sequence(actions))
        this.removeEffect()
    },
    jump(action,loop = false){
        this.spineBoy.setAnimation(0,action,loop)
        let jump = this.spineBoy.node.scaleX >0 ? cc.jumpBy(1,250,0,200,1) : cc.jumpBy(1,-250,0,200,1)                
        this.spineBoy.node.runAction(cc.sequence(jump,cc.callFunc(()=>{Variables.isCompleted = true})))
        this.removeEffect()
    },
    showResult(win = true) {
        Variables.isCompleted = false
        Variables.isStart = false
        this.spineBoy.clearTracks()
        this.stopAllActions()
        this.score = Variables.background.score + 1
        if (win) {
            this.spineBoy.setAnimation(0,Variables.hoverboard,false)
            this.spineBoy.setCompleteListener( ()=> {
                Variables.background.resultBoard.node.active = true
                Variables.background.node.opacity = 150
                Variables.background.resultBoard.win(this.score)
            })
        }else {
            this.spineBoy.setAnimation(0,Variables.death,false)
            this.spineBoy.setCompleteListener( ()=> {
                Variables.background.resultBoard.node.active = true
                Variables.background.node.opacity = 150
                Variables.background.resultBoard.lose(this.score)
            })
        }
    },
    stopAllActions() {
        this.node.stopAllActions()
        Variables.score.node.stopAllActions()
        Variables.boss.node.stopAllActions()
        Variables.princess.node.stopAllActions()        
    },
    removeEffect(){
        this.spineBoy.setCompleteListener( ()=> {
            this.spineBoy.clearTracks()
            this.spineBoy.setToSetupPose()
        })
    },

    // update (dt) {},
});
