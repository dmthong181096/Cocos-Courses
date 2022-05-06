(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Register.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '05bf9v+Me9EzL3fLePVDhNS', 'Register', __filename);
// Script/Register.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _userName: "",
        _email: "",
        _password: "",
        _confirmPassword: "",
        users: [],
        progressBar: cc.ProgressBar,
        textSuccess: cc.RichText,
        user: cc.Prefab,
        content: cc.Component
    },
    get userName() {
        return this._userName;
    },
    set userName(value) {
        return this._userName = value;
    },
    get email() {
        return this._email;
    },
    set email(value) {
        return this._email = value;
    },
    get password() {
        return this._password;
    },
    set password(value) {
        return this._password = value;
    },
    get confirmPassword() {
        return this._confirmPassword;
    },
    set confirmPassword(value) {
        return this._confirmPassword = value;
    },
    // LIFE-CYCLE CALLBACKS:
    getInputUserName: function getInputUserName(value) {
        this.userName = value.string;
    },
    getInputEmail: function getInputEmail(value) {
        this.email = value.string;
    },
    getInputPassword: function getInputPassword(value) {
        this.password = value.string;
    },
    getInputConfirmPassword: function getInputConfirmPassword(value) {
        this.confirmPassword = value.string;
    },
    validateInput: function validateInput() {
        var isError = false;
        var alertUserName = this.node.getChildByName("Regis").getChildByName("AlertUserName");
        var alertEmail = this.node.getChildByName("Regis").getChildByName("AlertEmail");
        var alertPassword = this.node.getChildByName("Regis").getChildByName("AlertPassword");
        var alertConfirmPassword = this.node.getChildByName("Regis").getChildByName("AlertConfirmPassword");
        if (this.userName == null || this.userName == "") {
            alertUserName.active = true;
            alertUserName.getComponent(cc.Label).string = "Not Null!";
            isError = true;
        } else {
            alertUserName.active = false;
        }
        if (this.email == null || this.email == "") {
            alertEmail.active = true;
            alertEmail.getComponent(cc.Label).string = "Not Null!";
            isError = true;
        } else {
            // console.log(this.alertEmail.showAlert(""));
            alertEmail.active = false;
        }

        if (this.password == null || this.password == "") {
            alertPassword.active = true;
            alertPassword.getComponent(cc.Label).string = "Not Null!";
            isError = true;
        } else {
            alertPassword.active = false;
        }
        if (this.confirmPassword == null || this.confirmPassword == "") {
            alertConfirmPassword.active = true;
            alertConfirmPassword.getComponent(cc.Label).string = "Not Null!";
            isError = true;
        } else {
            alertConfirmPassword.active = false;
        }
        if (this.password != this.confirmPassword) {
            alertConfirmPassword.active = true;
            alertConfirmPassword.getComponent(cc.Label).string = "Not Match!";
            isError = true;
        } else {
            alertConfirmPassword.active = false;
        }
        return isError;
    },
    effectLoad: function effectLoad() {
        var _this = this;

        this.progressBar.progress = 0;
        var actions = [cc.scaleBy(1.5, 1), cc.callFunc(function () {
            return _this.node.getChildByName("InfoUser").active = true;
        }), cc.callFunc(function () {
            return _this.node.getChildByName("TextSuccessSignUp").active = false;
        })];
        this.textSuccess.node.runAction(cc.sequence(actions));
        this.createUser();
    },
    createUser: function createUser() {
        var user = cc.instantiate(this.user);
        user.parent = this.content.node;
        user.getChildByName("Name").getComponent(cc.Label).string = this.users[this.users.length - 1];
        user.x = 0;
        user.y = -(this.users.length - 1) * 60;
    },
    back: function back() {
        this.node.getChildByName("Regis").active = true;
        this.node.getChildByName("InfoUser").active = false;
        this.node.getChildByName("TextSuccessSignUp").active = false;
    },
    move: function move() {
        this.node.getChildByName("Regis").active = false;
        this.node.getChildByName("InfoUser").active = false;
        this.node.getChildByName("TextSuccessSignUp").active = true;
        this.effectLoad();
    },

    // onLoad () {},
    clickSubmit: function clickSubmit() {
        if (!this.validateInput()) {
            console.log(this.userName);
            console.log(this.email);
            console.log(this.password);
            console.log(this.confirmPassword);
            this.users.push(this.userName);
            this.move();
        }
    },
    start: function start() {},
    update: function update(dt) {
        this.progressBar.progress += 0.1 / 10;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Register.js.map
        