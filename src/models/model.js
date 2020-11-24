export default  class Model {
    constructor() {
        this.user = {
            phone: null,
            code: null,
            active: false
        }
    }
    bindShowActiveServiceDialog(callback) {
        this.onShowActiveServiceDialog = callback
    }
    bindShowSnackbarNoNumber(callback) {
        this.onShowSnackbarNoNumber = callback
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
    _showDialog(user) {
        this.onShowActiveServiceDialog(user)
    }
    _showSnackbar() {
        this.onShowSnackbarNoNumber()
    }
    addCode(code) {
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