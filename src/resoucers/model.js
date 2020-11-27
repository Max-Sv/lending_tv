export default  class Model {
    constructor() {
        this.user = {
            phone: null,
            code: null,
            active: false,
            agreement: false
        }
        this.snackBarLabel = {
            wrongNumber: 'Введи свой номер телефона life:)',
            wrongCode: 'Неверный код',
            serviceActivated: 'Услуга подключена'
        }
    }
    bindShowActiveServiceDialog(callback) {
        this.onShowActiveServiceDialog = callback
    }
    bindShowSnackbar(callback) {
        this.onShowSnackbar = callback
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
            this._showSnackbar(this.snackBarLabel.wrongNumber);
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
    _showSnackbar(label) {
        this.onShowSnackbar(label)
    }
    sendCode() {
        const code = '123456';
        this._addCode(code);
    }
    _addCode(code) {
        this.user.code = code;
    }
    verifyCode(code) {
        let snackBarLabel;
        snackBarLabel = this.user.code === code ? this.snackBarLabel.serviceActivated: this.snackBarLabel.wrongCode;
        this._showSnackbar(snackBarLabel);
    }
    checkPhoneNumber(number) {
        if (number) {
            return number.length === 12 ? true : false;
        }
        return false;
    }

}