export default  class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;
        this.view.bindAddPhoneNumber(this.handleAddPhoneNumber.bind(this));
        this.view.bindSetAgreementState(this.handleCheckAgreementState.bind(this));
        this.view.bindActionWithCode(this.handleSendCode.bind(this), this.handleVerifyCode.bind(this));
        this.model.bindShowActiveServiceDialog(this.onShowActiveServiceDialog.bind(this));
        this.model.bindShowSnackbarNoNumber(this.onShowSnackbarNoNumber.bind(this));
        this.model.bindActiveButton(this.onActiveButton.bind(this));
    }

    onShowActiveServiceDialog (user)  {
        this.view.showActiveServiceDialog(user)
    } 
    onActiveButton (state)  {
        this.view.activeButton(state)
    } 
    onShowSnackbarNoNumber ()  {
        this.view.showSnackbarNoNumber()
    } 
    handleAddPhoneNumber (phone ){
        this.model.addPhoneNumber(phone);
    }
    handleCheckAgreementState (state ){
        this.model.setAgreementState(state);
    }
    handleSendCode ( ){
        this.model.sendCode();
    }
    handleVerifyCode (code){
        console.log('code:', code)
        return this.model.verifyCode(code);
    }

}
