export default  class Model {
    constructor() {
        this.user = {
            phone: null,
            code: null,
            active: false,
            agreement: false
        }
    }
    bindShowActiveServiceDialog(callback) {
        this.onShowActiveServiceDialog = callback
    }
    bindShowSnackbarNoNumber(callback) {
        this.onShowSnackbarNoNumber = callback
    }
    bindActiveButton(callback) {
        this.onActiveButton = callback
    }
    addPhoneNumber(number) {
        let isCorrectNumber = this.checkPhoneNumber(number);
        if (isCorrectNumber) {
            this.user.phone = number;
            this._showDialog(this.user);
        } else {
            this._showSnackbar();
        }
    }
    setAgreementState(state) {
        this.user.agreement = state;
        this._activeButton(state);
    }
    _activeButton(state) {
        this.onActiveButton(state)
    }
    _showDialog(user) {
        this.onShowActiveServiceDialog(user)
    }
    _showSnackbar() {
        this.onShowSnackbarNoNumber()
    }
    sendCode() {
        const code = '123456';
        this._addCode(code);
    }
    _addCode(code) {
        this.user.code = code;
    }
    verifyCode(code) {
        return this.user.code === code;
    }
    checkPhoneNumber(number) {
        if (number) {
            return number.length === 12 ? true : false;
        }
        return false;
    }

}