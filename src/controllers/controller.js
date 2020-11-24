export default  class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;
        this.view.bindAddPhoneNumber(this.handleAddPhoneNumber.bind(this));
        this.view.bindAddPhoneNumber(this.handleAddPhoneNumber.bind(this));
        this.model.bindShowActiveServiceDialog(this.onShowActiveServiceDialog.bind(this));
        this.model.bindShowSnackbarNoNumber(this.onShowSnackbarNoNumber.bind(this));
    }

    onShowActiveServiceDialog (user)  {
        this.view.showActiveServiceDialog(user)
    } 
    onShowSnackbarNoNumber ()  {
        this.view.showSnackbarNoNumber()
    } 
    handleAddPhoneNumber (phone ){
        this.model.addPhoneNumber(phone);
    }

}
