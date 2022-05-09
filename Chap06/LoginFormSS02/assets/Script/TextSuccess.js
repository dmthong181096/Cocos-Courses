cc.Class({
    extends: cc.Component,

    properties: {
        layoutUsers: cc.ScrollView,
        progressBar: cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:
    onEnable(){
        this.progressBar.progress = 0
        this.layoutUsers.node.active = true
        let actions = [cc.spawn(cc.scaleBy(2, 1.1),
            cc.callFunc(() => this.layoutUsers.node.active = false),
            cc.callFunc(() => this.progressBar.node.active = true)),
            cc.callFunc(() => this.node.active = false),
            cc.callFunc(() => this.progressBar.node.active = false),
            cc.callFunc(() => this.layoutUsers.node.active = true),
            cc.callFunc(() => this.layoutUsers.node.active = true),
        ]
        this.node.runAction(cc.sequence(actions))
    },


    onLoad() {
        this.progressBar.progress = 0
    },
    start() {
    },

    update(dt) {
        this.progressBar.progress += 0.1 / 10
    },
});
