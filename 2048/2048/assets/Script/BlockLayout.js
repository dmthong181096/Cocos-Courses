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
const Variables = require("./Variables");
const colors = require("./Colors");
cc.Class({
    extends: cc.Component,

    properties: {
        BlockPrefab: cc.Prefabs
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit('transBlockLayout', this);
        console.log(colors);
        this.gameInit()

    },
    gameInit() {
        this.createBlocks()
        this.data = this.createArray2D(4, 4)
        console.log(this.data);
        // for (let row = 0; row < 4; row++) {
        //     for (let col = 0; col < 4; col++) {
        //         this.setLabel(Variables.blocks[row][col],0)
        //         this.data[row][col] = 0;
        //     }
        // }
        this.randomBlock();
        this.randomBlock();
        // this.randomBlock();
    },

    createArray2D(row, col) {
        let arr = new Array()
        for (let i = 0; i < row ; i++) {
            arr[i] = new Array()
           for (let j = 0; j < col; j++) {
                arr[i][j] = 0
           }
        }
        // console.log(blocks);
        return arr
    },
    createBlocks() {
        Variables.blocks = this.createArray2D(4,4)
        for (let row = 0; row <  Variables.blocks.length; row++) {
            for (let col = 0; col <  Variables.blocks.length; col++){
                let block =  cc.instantiate(this.BlockPrefab)
                this.setLabel(block,0)
                block.parent = this.node
                Variables.blocks[row][col] = block
            }
            
        }
        
        
    },
    setLabel(block,number){
        if (number == 0) {
            // block.active = false
            block.getChildByName("BlockLabel").getComponent(cc.Label).string = ""
        }else {
            block.getChildByName("BlockLabel").getComponent(cc.Label).string = number
        }

            block.color = colors[number];

    },
    getEmptyLocations(){
        let emptyLocations = []
        for (let row = 0; row <  this.data.length; row++) {
            for (let col = 0; col <  this.data.length; col++) {
                if (this.data[row][col] == 0) {
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
        let emptyLocations = this.getEmptyLocations()
        let location = emptyLocations[Math.floor(Math.random() * emptyLocations.length)];
        let x = location.x
        let y = location.y;
        this.data[x][y] = Variables.numbers[Math.floor(Math.random() * Variables.numbers.length)];
        this.setLabel(Variables.blocks[x][y],this.data[x][y])
    },
    // moveRight(row,col = 3) {
    //     console.log("Move right");
    //     if (col == 0) {
    //         return;
    //     }else {
    //         if (this.data[row][col] == 0) {
    //             this.data[row][col] = this.data[row][col-1];
    //             this.data[row][col-1] = 0;
    //             this.moveRight(row, col - 1); 
    //             this.updateBlockNum();  
    //         } else {
    //             if (this.data[row][col] == this.data[row][col-1]) {
    //                 this.data[row][col] *= 2
    //                 this.data[row][col - 1] = 0
    //                }     
    //                this.moveRight(row, col -1)
    //             //    this.updateBlockNum()
    //         }
    //         this.moveRight(row, col - 1)
    //         this.updateBlockNum()
    //     }
    // },
    moveRight(row,col = 0) {
        console.log("Move right");
        if (col == Variables.rows-1) {
            return;
        }else {
            if (this.data[row][col+1] == 0) {
                this.data[row][col+1] = this.data[row][col];
                this.data[row][col] = 0;
                this.moveRight(row, col + 1); 
            } else {
                if (this.data[row][col] == this.data[row][col+1]) {
                    this.data[row][col+1] *= 2
                    this.data[row][col] = 0
                   }     
            }
            this.moveRight(row, col + 1); 
            this.updateBlockNum(); 
        }
    },
    moveLeft(row,col = 3) {
        console.log("Move left");
        if (col == 0) {
            return;
        }else {
            if (this.data[row][col-1] == 0) {
                this.data[row][col-1] = this.data[row][col];
                this.data[row][col] = 0;
                this.moveLeft(row, col - 1); 
                this.updateBlockNum();  
            } else {
                if (this.data[row][col] == this.data[row][col-1]) {
                    this.data[row][col-1] *= 2
                    this.data[row][col] = 0
                   }     
                   this.moveLeft(row, col -1)
                   this.updateBlockNum()
            }

        }
    },
    moveDown(row = 0,col = 0) {
        console.log("Move Down");
        if (row == Variables.rows - 1) {
            return;
        }else {
            if (this.data[row+1][col] == 0) {
                this.data[row+1][col] = this.data[row][col];
                this.data[row][col] = 0 
                this.moveDown(row+1, col)
                this.updateBlockNum()
            } else {
                if (this.data[row][col] == this.data[row+1][col]) {
                    this.data[row+1][col] *= 2
                    this.data[row][col] = 0
                   }     
                   this.moveDown(row+1, col)
                    this.updateBlockNum()
            }
            
        }
    },
    moveUp(row = 0,col = 0) {
        console.log("Move Down");
        if (row == 0) {
            return;
        }else {
            if (this.data[row-1][col] == 0) {
                this.data[row-1][col] = this.data[row][col];
                this.data[row][col] = 0 
                this.moveUp(row-1, col)
                this.updateBlockNum()
            } else {
                if (this.data[row][col] == this.data[row-1][col]) {
                    this.data[row-1][col] *= 2
                    this.data[row][col] = 0
                   }     
                   this.moveUp(row-1, col)
                   this.updateBlockNum()
            }

        }
    },

    

    // blockMoveRight: function (row, col) {
    //     if (col == Variables.rows-1) {
    //         //cc.log("不移动");// test
    //         return;
    //     }
    //     else {
    //         if (this.data[row][col + 1] == 0) {
    //             let actions = [cc.moveTo(5,Variables.blocks[row][col+1]),cc.callFunc( () => {
    //                 // this.data[row][col + 1] = this.data[row][col];
    //                 // this.data[row][col] = 0;
    //                 // this.blockMoveRight(row, col + 1); // 递归
    //                 // this.updateBlockNum();  // 更行方块对应数字颜色
    //             })]
    //             Variables.blocks[row][col].runAction(cc.sequence(actions))

    //         }
    //         else {
    //             if (col < ROWS-1) {
    //                 if (this.data[row][col] == this.data[row][col + 1]) {
    //                     this.data[row][col + 1] *= 2;
    //                     this.data[row][col] = 0;
    //                 }
    //                 this.blockMoveRight(row, col + 1);
    //                 if (this.data[row][col + 1] == 0) {
    //                     this.data[row][col + 1] = this.data[row][col];
    //                     this.data[row][col] = 0;
    //                     this.updateBlockNum();
    //                 }
    //             }
    //         }
    //     }

    // },
    updateBlockNum: function () {
        // 更新方块数字
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                this.setLabel(Variables.blocks[row][col],this.data[row][col])
            }
        }
    },
    start () {

    },

    // update (dt) {},
});
