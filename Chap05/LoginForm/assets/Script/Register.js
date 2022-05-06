
cc.Class({
    extends: cc.Component,

    properties: {
        _userName: "",
        _email: "",
        _password: "",
        _confirmPassword: "",
        users : [],
        progressBar: cc.ProgressBar,
        textSuccess: cc.RichText,
        user: cc.Prefab,
        content: cc.Component,
    },
    get userName () {
        return this._userName
    },
    set userName(value){
        return this._userName = value
    },
    get email () {
        return this._email
    },
    set email(value){
        return this._email = value
    },
    get password () {
        return this._password
    },
    set password(value){
        return this._password = value
    },
    get confirmPassword () {
        return this._confirmPassword
    },
    set confirmPassword(value){
        return this._confirmPassword = value
    },
    // LIFE-CYCLE CALLBACKS:
    getInputUserName(value) {
        this.userName = value.string
    },
    getInputEmail(value) {
        this.email = value.string
    },
    getInputPassword(value) {
        this.password = value.string
    },
    getInputConfirmPassword(value) {
        this.confirmPassword = value.string
    },
    validateInput() {
        let isError = false
        let alertUserName = this.node.getChildByName("Regis").getChildByName("AlertUserName")
        let alertEmail = this.node.getChildByName("Regis").getChildByName("AlertEmail")
        let alertPassword = this.node.getChildByName("Regis").getChildByName("AlertPassword")
        let alertConfirmPassword = this.node.getChildByName("Regis").getChildByName("AlertConfirmPassword")
        if (this.userName == null || this.userName == "") {
            alertUserName.active = true
            alertUserName.getComponent(cc.Label).string = "Not Null!"
            isError = true
        } else {
            alertUserName.active = false
        }
        if (this.email == null || this.email == ""){
            alertEmail.active = true
            alertEmail.getComponent(cc.Label).string = "Not Null!"
            isError = true
        }else {
            // console.log(this.alertEmail.showAlert(""));
            alertEmail.active = false
        }
        
        if (this.password == null || this.password ==""){
            alertPassword.active = true
            alertPassword.getComponent(cc.Label).string = "Not Null!"
            isError = true
            
        }else {
            alertPassword.active = false
        }
        if (this.confirmPassword == null || this.confirmPassword ==""){
            alertConfirmPassword.active = true
            alertConfirmPassword.getComponent(cc.Label).string = "Not Null!"
            isError = true
        }else {
            alertConfirmPassword.active = false
        }
        if (this.password != this.confirmPassword ) {
            alertConfirmPassword.active = true
            alertConfirmPassword.getComponent(cc.Label).string = "Not Match!"
            isError = true
        }       
        else {
            alertConfirmPassword.active = false
        }
        return isError
    },

    effectLoad() {
        this.progressBar.progress = 0
        let actions = [cc.scaleBy(1.5,1),cc.callFunc(() => this.node.getChildByName("InfoUser").active = true),cc.callFunc(() => this.node.getChildByName("TextSuccessSignUp").active = false)]
        this.textSuccess.node.runAction(cc.sequence(actions))
        this.createUser()
    },
    createUser(){
        let user = cc.instantiate(this.user)
        user.parent = this.content.node;
        user.getChildByName("Name").getComponent(cc.Label).string = this.users[this.users.length-1]
        user.x = 0
        user.y =  - (this.users.length-1) * 60;
    },
    back(){
        this.node.getChildByName("Regis").active = true
        this.node.getChildByName("InfoUser").active = false
        this.node.getChildByName("TextSuccessSignUp").active = false
    },
    move(){
        this.node.getChildByName("Regis").active = false
        this.node.getChildByName("InfoUser").active = false
        this.node.getChildByName("TextSuccessSignUp").active = true
        this.effectLoad()
    },
    // onLoad () {},
    clickSubmit() {
        if (!this.validateInput()) {
            console.log(this.userName);
            console.log(this.email);
            console.log(this.password);
            console.log(this.confirmPassword);
            this.users.push(this.userName)
            this.move()
        }
    },
    start () {

    },

    update (dt) {
        this.progressBar.progress +=0.1/10
    },
});
