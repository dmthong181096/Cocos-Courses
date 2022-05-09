
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    showAlert(stringAlert){
      console.log("Alert");
      this.getComponent(cc.Label).string = `${stringAlert}`  
    },
    start () {

    },

    // update (dt) {},
});
