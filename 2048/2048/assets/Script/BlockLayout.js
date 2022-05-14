// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const Variables = require("./Variables");
const colors = require("./Colors");
cc.Class({
    extends: cc.Component,

    properties: {
        BlockPrefab: cc.Prefabs
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
        this.createArray2D(Variables.rows,Variables.cols)
        this.createBlock()
        this.randomBlock()
    },


    createArray2D(row, col) {
        Variables.blocks = new Array()
        for (let i = 0; i < row ; i++) {
            Variables.blocks[i] = new Array()
           for (let j = 0; j < col; j++) {
            //    const element = array[index];
            Variables.blocks[i][j] = null
               
           }
            
        }
        console.log(Variables.blocks);
        return Variables.blocks
    },
    createBlock() {
        for (let index = 0; index <  Variables.blocks.length; index++) {
            for (let index = 0; index <Variables.blocks.length; index++){
                let block =  cc.instantiate(this.BlockPrefab)
                this.setLabel(block,2)
                block.parent = this.node
            }
            
        }
        
        
    },
    setLabel(block,number){
        if (number == 0) {
            block.active = false
        }
        block.getChildByName("BlockLabel").getComponent(cc.Label).string = number
        if (number in colors) {
            block.color = colors[number];
        }
    },
    getEmptyLocations(){
        let emptyLocations = []
        for (let row = 0; row < Variables.blocks.length; row++) {
            for (let col = 0; col < Variables.blocks.length; col++) {
                if (Variables.blocks[row][col] == null) {
                    emptyLocations.push({
                        x: row,
                        y: col
                    })
                }
                
            }
            
        }
        console.log(emptyLocations);
        return emptyLocations
    },

    randomBlock(){
        let locations = this.getEmptyLocations()
        let location = locations[Math.floor(Math.random() * locations.length)];
        console.log(location);
        let position = Variables.blocks[location.x,location.y]
        let block = cc.instantiate(this.BlockPrefab);
        // this.setLabel(block,2)
        block.parent = this.node
        block.setPosition(position);
    },
    start () {

    },

    // update (dt) {},
});
