
const Emitter = require('mEmitter');
const Variables = require("./Variables");
const colors = require("./Colors");
// const { log } = require('../../build/web-desktop/cocos2d-js');
cc.Class({
    extends: cc.Component,

    properties: {
        BlockPrefab: cc.Prefabs,
        _flag: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.instance.emit('transBlockLayout', this);
        // console.log(colors);
        this.gameInit()

    },
    gameInit() {
        this.createBlocks()
        this.data = this.createArray2D(4, 4)
        console.log(this.data);

        this.randomBlock();
        this.randomBlock();
    },
    countScore(score){
        Variables.scoreGame += score
        Variables.score.updateScore(Variables.scoreGame)
        // return Variables.scoreGame += score
    },
    createArray2D(row, col) {
        let arr = new Array()
        for (let i = 0; i < row; i++) {
            arr[i] = new Array()
            for (let j = 0; j < col; j++) {
                arr[i][j] = 0
            }
        }
        return arr
    },
    createBlocks() {
        Variables.blocks = this.createArray2D(4, 4)
        for (let row = 0; row < Variables.blocks.length; row++) {
            for (let col = 0; col < Variables.blocks.length; col++) {
                let block = cc.instantiate(this.BlockPrefab)
                this.setLabel(block, 0)
                block.parent = this.node
                Variables.blocks[row][col] = block
            }
        }
    },
    setLabel(block, number) {
        if (number == 0) {
            // block.active = false
            block.getChildByName("BlockLabel").getComponent(cc.Label).string = ""
        } else {
            block.getChildByName("BlockLabel").getComponent(cc.Label).string = number
        }

        block.color = colors[number];

    },
    getEmptyLocations() {
        let emptyLocations = []
        for (let row = 0; row < this.data.length; row++) {
            for (let col = 0; col < this.data.length; col++) {
                if (this.data[row][col] == 0) {
                    emptyLocations.push({
                        x: row,
                        y: col
                    })
                }
            }
        }
        return emptyLocations
    },

    randomBlock() {
        let emptyLocations = this.getEmptyLocations()
        let location = emptyLocations[Math.floor(Math.random() * emptyLocations.length)];
        let x = location.x
        let y = location.y;
        this.data[x][y] = Variables.numbers[Math.floor(Math.random() * Variables.numbers.length)];
        this.setLabel(Variables.blocks[x][y], this.data[x][y])
    },
    moveRight(row, col = 3) {
        let isZero = true
        for (let index = 0; index < this.data[row].length; index++) {
            if (this.data[row][index] != 0) {
                isZero = false
            }
        }
        if (isZero) {
            return
        }
        if (col == 0) {
            if (this.data[row][3] == 0) {
                this.moveRight(row, 3);
            }
            if (this.data[row][1] != 0 && this.data[row][3] !=0 && this.data[row][2] == 0) {
                this.moveRight(row, 3);
            }
            this.updateBlockNum();
            if (this._flag) {
                this.mergeBlock(row,"Right")
            }
            return
        }
        if (this.data[row][col] == 0) {
            this.data[row][col] = this.data[row][col-1];
            this.data[row][col-1] = 0;
        }
        this.moveRight(row, col - 1);
        this.updateBlockNum();
    },
    moveUp(row = 0,col) {
        let isZero = true
        for (let index = 0; index <= this.data[col].length - 1; index++) {
            if (this.data[index][col] != 0) {
               
                isZero = false
            }
        }
        if (isZero) {
            return
        }
        if (row == 3) {
            if (this.data[0][col] == 0) {
                this.moveUp(0,col);
            }
            if (this.data[0][col] != 0 && this.data[2][col] !=0 && this.data[1][col] == 0) {
                this.moveUp(0,col);
            }
            this.updateBlockNum();
            if (this._flag) {
                this.mergeUp(col)
            }
            return
        }
        if (this.data[row][col] == 0) {
            this.data[row][col] = this.data[row+1][col];
            this.data[row+1][col] = 0;
        }
        this.moveUp(row + 1,col);
        this.updateBlockNum();
    },
    mergeUp(col) {
        this.updateBlockNum();
    
        for (let index = 0; index < 4; index++) {
            console.log(index);
            if (index == 3) {
                return
            }
            if (this.data[index+1][col] == this.data[index][col] && this.data[index+1][col] != 0 && this.data[index][col] != 0) {
                this.data[index][col] *= 2
                this.countScore(this.data[index][col])
                this.data[index+1][col] = 0
                this.updateBlockNum();
                this._flag = false
                this.moveUp(0,col);
            }
        }


    },
    moveDown(row = 3,col) {
        let isZero = true
        for (let index = 0; index <= this.data[col].length - 1; index++) {
            if (this.data[index][col] != 0) {
               
                isZero = false
            }
        }
        if (isZero) {
            return
        }
        if (row == 0) {
            if (this.data[3][col] == 0) {
                this.moveDown(3,col);
            }
            if (this.data[3][col] != 0 && this.data[1][col] !=0 && this.data[2][col] == 0) {
                this.moveDown(3,col);
            }
            this.updateBlockNum();
            if (this._flag) {
                this.mergeDown(col)
            }
            return
        }
        if (this.data[row][col] == 0) {
            this.data[row][col] = this.data[row-1][col];
            this.data[row-1][col] = 0;
        }
        this.moveDown(row - 1,col);
        this.updateBlockNum();
    },
    mergeDown(col) {
        this.updateBlockNum();
    
        for (let index = 3; index >= 0; index--) {
            console.log(index);
            if (index == 0) {
                return
            }
            if (this.data[index][col] == this.data[index-1][col] && this.data[index-1][col] != 0 && this.data[index][col] != 0) {
                this.data[index][col] *= 2
                this.countScore(this.data[index][col])
                // console.log(this.data[index][col]);
                this.data[index-1][col] = 0
                this.updateBlockNum();
                this._flag = false
                this.moveDown(3,col);
            }
        }


    },
    // mergeRight(row) {
    //     this.updateBlockNum();
    //     for (let index = 3; index >= 0; index--) {
    //         if (this.data[row][index] == this.data[row][index -1] && this.data[row][index - 1] != 0 && this.data[row][index] != 0) {
    //             this.data[row][index] *= 2
    //             this.data[row][index - 1] = 0
    //             this.updateBlockNum();
    //             this._flag = false
    //             this.moveRight(row, 3)
    //         }
    //     }


    // },
    // mergeLeft(row) {
    //     this.updateBlockNum();
    //     for (let index = 0; index < 4; index++) {
    //         if (this.data[row][index + 1] == this.data[row][index] && this.data[row][index + 1] != 0 && this.data[row][index] != 0) {
    //             this.data[row][index] *= 2
    //             this.data[row][index + 1] = 0
    //             this.updateBlockNum();
    //             this._flag = false
    //             this.moveLeft(row, 0)
    //         }
    //     }


    // },

    mergeBlock(row,direction) {
        this.updateBlockNum();


        switch (direction) {
            case "Left":
                for (let index = 0; index < 4; index++) {
                    console.log(this.data[row][index + 1]);
                    if (this.data[row][index + 1] == this.data[row][index] && this.data[row][index + 1] != 0 && this.data[row][index] != 0) {
                        this.data[row][index] *= 2
                        this.countScore(this.data[row][index])
                        this.data[row][index + 1] = 0
                        this.updateBlockNum();
                        this._flag = false
                        this.moveLeft(row, 0)
                    }
                }
                break;
            case "Right":
                for (let index = 3; index >= 0; index--) {
                    if (this.data[row][index] == this.data[row][index -1] && this.data[row][index - 1] != 0 && this.data[row][index] != 0) {
                        this.data[row][index] *= 2
                        this.countScore(this.data[row][index])
                        this.data[row][index - 1] = 0
                        this.updateBlockNum();
                        this._flag = false
                        this.moveRight(row, 3)
                    }
                }
                break;
            case "Up":
                for (let index = 0; index < 4; index++) {
                    if (this.data[row][index] == this.data[row][index + 1] && this.data[row][index + 1] != 0 && this.data[row][index] != 0) {
                        this.data[row][index] *= 2
                        this.countScore(this.data[index][col])
                        this.data[row][index + 1] = 0
                        this.updateBlockNum();
                        this._flag = false
                        this.moveUp(0, col)
                    }
                }
                break;
                 
            default:
                break;
        }
    },
    moveLeft(row, col = 0) {
        let isZero = true
        for (let index = 0; index < this.data[row].length; index++) {
            if (this.data[row][index] != 0) {
                isZero = false
            }
        }
        if (isZero) {
            return
        }
        if (col == 3) {
            if (this.data[row][0] == 0 ) {
                this.moveLeft(row, 0);
            }
            if (this.data[row][0] != 0 && this.data[row][2] !=0 && this.data[row][1] == 0) {
                this.moveLeft(row, 0);
            }
            this.updateBlockNum();
            if (this._flag) {
                this.mergeBlock(row,"Left")
            }
            return
        }
        if (this.data[row][col] == 0) {
            this.data[row][col] = this.data[row][col+1];
            this.data[row][col+1] = 0;
        }
        this.moveLeft(row, col + 1);
        this.updateBlockNum();
    },


    // moveLeft(row, col = 3) {
    //     // console.log("Move left");
    //     if (col == 0) {
    //         if (this.data[row][3] == 0) {
    //             this.moveRight(row, col = 3)
    //         } else {
    //             return
    //         }

    //     } else {
    //         if (this.data[row][col] == 0) {
    //             this.data[row][col] = this.data[row][col - 1];
    //             this.data[row][col - 1] = 0;
    //             this.moveLeft(row, col - 1);
    //             // this.updateBlockNum(); 
    //         } else {
    //             if (this.data[row][col] == this.data[row][col - 1]) {
    //                 this.data[row][col - 1] *= 2
    //                 this.data[row][col] = 0
    //             } else {
    //                 this.moveLeft(row, col - 1)
    //                 // this.updateBlockNum()
    //             }

    //         }
    //         // this.moveLeft(row, col -1)
    //         this.updateBlockNum();
    //     }
    // },
    // moveDown(row = 0, col = 0) {
    //     // console.log("Move Down");
    //     if (row == Variables.rows - 1) {
    //         return;
    //     } else {
    //         if (this.data[row + 1][col] == 0) {
    //             this.data[row + 1][col] = this.data[row][col];
    //             this.data[row][col] = 0
    //             this.moveDown(row + 1, col)
    //             this.updateBlockNum()
    //         } else {
    //             if (this.data[row][col] == this.data[row + 1][col]) {
    //                 this.data[row + 1][col] *= 2
    //                 this.data[row][col] = 0
    //             }
    //             this.moveDown(row + 1, col)
    //             this.updateBlockNum()
    //         }

    //     }
    // },
    // moveUp(row = 0, col = 0) {
    //     // console.log("Move Down");
    //     if (row == 0) {
    //         return;
    //     } else {
    //         if (this.data[row - 1][col] == 0) {
    //             this.data[row - 1][col] = this.data[row][col];
    //             this.data[row][col] = 0
    //             this.moveUp(row - 1, col)
    //             this.updateBlockNum()
    //         } else {
    //             if (this.data[row][col] == this.data[row - 1][col]) {
    //                 this.data[row - 1][col] *= 2
    //                 this.data[row][col] = 0
    //             }
    //             this.moveUp(row - 1, col)
    //             this.updateBlockNum()
    //         }

    //     }
    // },
    updateBlockNum: function () {
        // 更新方块数字
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                this.setLabel(Variables.blocks[row][col], this.data[row][col])
            }
        }
    },
    start() {

    },

    // update (dt) {},
});
