export default  class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;
        this.view.bindAddPhoneNumber(this.handleAddPhoneNumber.bind(this));
        this.view.bindSetAgreementState(this.handleCheckAgreementState.bind(this));
        this.view.bindActionWithCode(this.handleSendCode.bind(this), this.handleVerifyCode.bind(this));
        this.model.bindShowActiveServiceDialog(this.onShowActiveServiceDialog.bind(this));
        this.model.bindShowSnackbar(this.onShowSnackbar.bind(this));
        this.model.bindActiveButton(this.onActiveButton.bind(this));
        this.model.bindShowLoader(this.onShowLoader.bind(this));
        this.model.bindOffShowLoader(this.offShowLoader.bind(this));
    }

    onShowActiveServiceDialog (user)  {
        this.view.showActiveServiceDialog(user)
    } 
    onActiveButton (state)  {
        this.view.activeButton(state)
    } 
    onShowSnackbar (label)  {
        this.view.showSnackbar(label)
    } 
    onShowLoader (loader)  {
        this.view.showLoader(loader)
    } 
    offShowLoader (loader)  {
        this.view.offShowLoader(loader)
    } 
    handleAddPhoneNumber (phone ){
        this.model.addPhoneNumber(phone);
    }
    handleCheckAgreementState (state ){
        this.model.setAgreementState(state);
    }
    handleSendCode (){
        return this.model.sendCode();
    }
    handleVerifyCode (code){
        this.model.verifyCode(code);
    }

}
