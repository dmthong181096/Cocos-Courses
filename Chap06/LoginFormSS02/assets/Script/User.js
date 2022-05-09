
const Emitter = require('mEmitter');
const Const = require('Const');
var users = []
cc.Class({
    extends: cc.Component,

    properties: {
        user: cc.Prefab,
        content: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:    

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent(`${Const.transUserData}`, this.transUserData,this); 
    },

    onEnable(){     
        this.createUser() 
    },
    createUser(){
        this.content.removeAllChildren()         
        for (let index = 0; index < users.length; index++) {
            let item = cc.instantiate(this.user)
            item.parent = this.content
            item.getChildByName("item").getComponent(cc.Label).string = users[index].userName 
            item.x = 0          
            item.y -=  index*60 ;
        }   
    },
    start () {
             
    },
    transUserData(data) {       
        users.push(data)

    },


    // update (dt) {},
});
