
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
        this.spineBoy.setMix(Variables.run,Variables.idle,0.2)
        this.spineBoy.setMix(Variables.run,Variables.run,0.2)
    },

    onEnable(){ 
    },
    onCollisionEnter: function (collisionObj) {
             if (collisionObj.node.name =="boom"|| collisionObj.node.name == "boss" || collisionObj.node.name == "Stone" || collisionObj.node.name == "Canvas") {
                this.node.stopAllActions()
                this.node.getComponent(cc.BoxCollider).enabled = false    
                Variables.background.showResult(false);
            }
            // if (collisionObj.node.name == "Canvas" ) {
            //     console.log("Canvas");
            //     this.spineBoy.node.stopAllActions()
            // }
            if (collisionObj.node.name =="Princess") {
                Variables.audio.playAudioPrincess()
                Variables.background.showResult()
            }
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
        this.spineBoy.node.stopAllActions()
        this.spineBoy.setAnimation(0,action,loop)
        this.createBullet()
    },
    portal(action,loop = false){
        this.spineBoy.setAnimation(0,action,loop)
        this.spineBoy.setCompleteListener( ()=> {
            Variables.isCompleted = true
            Variables.isStart = true
        })
    },
    back(action,loop = false) {
        this.node.stopAllActions()
        this.spineBoy.clearTracks()
        this.spineBoy.setToSetupPose()
        this.spineBoy.setAnimation(0,action,loop)
        let actions = [cc.flipX(true),cc.moveBy(1,-180,0)]
        this.spineBoy.node.runAction(cc.repeatForever(cc.sequence(actions)))
    },
    run(action,loop = false){
        this.spineBoy.node.stopAllActions()
        this.spineBoy.clearTracks()
        this.spineBoy.setToSetupPose()
        this.spineBoy.setAnimation(0,action,loop)
        let actions = [cc.flipX(false),cc.moveBy(1,180,0)]
        this.spineBoy.node.runAction(cc.repeatForever(cc.sequence(actions)))
    },
    jump(action,loop = false){
        this.spineBoy.node.stopAllActions()
        this.spineBoy.clearTracks()
        this.spineBoy.setToSetupPose()
        let jump = this.spineBoy.node.scaleX >0 ? cc.jumpBy(1,250,0,200,1) : cc.jumpBy(1,-250,0,200,1)   
        let actions = [cc.callFunc(()=>{this.spineBoy.setAnimation(0,action,loop)}), jump,cc.callFunc( () =>  {this.spineBoy.setAnimation(0,"idle",loop)}) ,cc.callFunc(()=>{Variables.isCompleted = true})]
        this.spineBoy.node.runAction(cc.sequence( actions))
        this.removeEffect()
    },
    down(action,loop = false){
        this.spineBoy.node.stopAllActions()
        let actions = [cc.callFunc( ()=> {this.spineBoy.setAnimation(0,action,loop)}),cc.callFunc( ()=> {Variables.isCompleted = true})]
        this.spineBoy.node.runAction(cc.sequence(actions))
    },

    stopAllActions() {
 
    },
    removeEffect(){
 
    },

    update (dt) {
        this.spineBoy.node.getComponent(cc.BoxCollider).offset = cc.v2(this.spineBoy.findBone("torso3").worldX , this.spineBoy.findBone("torso3").worldY )
    },
});
