
const Emitter = require('mEmitter');
const Variables = require("./Variables");
const colors = require("./Colors");
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
                this.mergeRight(row)
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
    mergeRight(row) {
        this.updateBlockNum();
        for (let index = 3; index >= 0; index--) {
            if (this.data[row][index] == this.data[row][index -1] && this.data[row][index - 1] != 0 && this.data[row][index] != 0) {
                this.data[row][index] *= 2
                this.data[row][index - 1] = 0
                this.updateBlockNum();
                this._flag = false
                this.moveRight(row, 3)
            }
        }


    },
    mergeLeft(row) {
        this.updateBlockNum();
        for (let index = 0; index < 4; index++) {
            if (this.data[row][index + 1] == this.data[row][index] && this.data[row][index + 1] != 0 && this.data[row][index] != 0) {
                this.data[row][index] *= 2
                this.data[row][index + 1] = 0
                this.updateBlockNum();
                this._flag = false
                this.moveLeft(row, 3)
            }
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
                this.mergeLeft(row)
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
    moveDown(row = 0, col = 0) {
        // console.log("Move Down");
        if (row == Variables.rows - 1) {
            return;
        } else {
            if (this.data[row + 1][col] == 0) {
                this.data[row + 1][col] = this.data[row][col];
                this.data[row][col] = 0
                this.moveDown(row + 1, col)
                this.updateBlockNum()
            } else {
                if (this.data[row][col] == this.data[row + 1][col]) {
                    this.data[row + 1][col] *= 2
                    this.data[row][col] = 0
                }
                this.moveDown(row + 1, col)
                this.updateBlockNum()
            }

        }
    },
    moveUp(row = 0, col = 0) {
        // console.log("Move Down");
        if (row == 0) {
            return;
        } else {
            if (this.data[row - 1][col] == 0) {
                this.data[row - 1][col] = this.data[row][col];
                this.data[row][col] = 0
                this.moveUp(row - 1, col)
                this.updateBlockNum()
            } else {
                if (this.data[row][col] == this.data[row - 1][col]) {
                    this.data[row - 1][col] *= 2
                    this.data[row][col] = 0
                }
                this.moveUp(row - 1, col)
                this.updateBlockNum()
            }

        }
    },
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
