
const user = cc.Class  ({userName: null, email: null, password: null, confirmPassword: null}      ) 
const users = []
// const Emitter = require('mEmitter');
const Emitter = require('mEmitter');
const Const = require('Const');
cc.Class({
    extends: cc.Component,
    
    properties: {
        listUser: cc.Component,
        _userName: null,
        _email: null,
        _password: null,
        _confirmPassword: null,
        alertUsername:  require("Alert"),
        alertEmail:  require("Alert"),
        alertPassword: require("Alert"),
        alertConfirmPassword: require("Alert"),

    },
    validateForm() {
        let isError = false
        if (this._userName == null || this._userName == "") {
            // console.log("null");
            this.alertUsername.node.active = true
            this.alertUsername.showAlert(" Not null");
            isError = true
        } else {
            this.alertUsername.node.active = false
        }

        if (this._email == null || this._email == ""){
            this.alertEmail.node.active = true
            this.alertEmail.showAlert(" Not null");
            isError = true
            
        }else {
            this.alertEmail.node.active = false
        }
        
        if (this._password == null || this._password ==""){
            this.alertPassword.node.active = true
            this.alertPassword.showAlert(" Not null");
            isError = true
            
        }else {
            this.alertPassword.node.active = false
        }
        if (this._confirmPassword == null || this._confirmPassword ==""){
            this.alertConfirmPassword.node.active = true
            this.alertConfirmPassword.showAlert(" Not null");
            isError = true
            
        }else {
            this.alertConfirmPassword.node.active = false
        }
        if (this._password != this._confirmPassword ) {
            this.alertConfirmPassword.node.active = true
            this.alertConfirmPassword.showAlert("Not Match");
            isError = true
            
        }       
        return isError
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },
    inputUserName(value) {
        return this._userName =  value.string
    },
    inputEmail(value) {
        return this._email =  value.string
    },
    inputPassword(value) {
        return this._password =  value.string
    },
    inputConfirmPassword(value) {
        return  this._confirmPassword =  value.string
    },
    back() {
        this.node.active = true
        this.listUser.node.active = false
    },
    move( )
    
    {
        this.node.active = false
        this.listUser.node.active = true
    },
    clickSubmit() {
        if (!this.validateForm()){
            let newUser = new user
            newUser.userName  = this._userName
            newUser.email  = this._email
            newUser.password  = this._password
            newUser.confirmPassword  = this._confirmPassword
            this.listUser.node.active = true
            users.push(newUser)
            console.log(newUser);
            Emitter.instance.emit(`${Const.transUserData}`,newUser);    
            this.move()
        }else{
            return
        }

    },              

    start () {

    },
    // update (dt) {},
});
