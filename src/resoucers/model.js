import {apiCheckNumber, apiActiveServiceAmediateka, apiSendCodeBySms, apiVerifyCode} from './api'

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
            serviceActivated: 'Услуга подключена',
            error: 'Что-то пошло не так, попробуте позже',
            wrongUser: 'Пользователь не найден!'
        }
        this.loader = {
            wrongNumber: 'Введи свой номер телефона life:)',
            wrongCode: 'Неверный код',
            serviceActivated: 'Услуга подключена',
            error: 'Что-то пошло не так, попробуте позже',
            wrongUser: 'Пользователь не найден!'
        }
    }
    bindShowActiveServiceDialog(callback) {
        this.onShowActiveServiceDialog = callback
    }
    bindShowActiveNoNumber(callback) {
        this.onShowActiveNoNumber = callback
    }
    bindShowSnackbar(callback) {
        this.onShowSnackbar = callback
    }
    bindActiveButton(callback) {
        this.onActiveButton = callback
    }
    bindShowLoader(callback) {
        this.onShowLoader = callback;
    }
    bindOffShowLoader(callback) {
        this.offShowLoader = callback;
    }
    async addPhoneNumber(number) {
        try {this.onShowActiveNoNumber
            let isCorrectNumber = this.checkPhoneNumber(number);
            if (isCorrectNumber) {
                this._showLoader('loaderPhone')
                const request = await apiCheckNumber(number);
                console.log('request apiCheckNumber:', request)
                this.offShowLoader('loaderPhone')
                const {code, detail} = request;
                if (code) {
                    if ( code === "OK") {
                        this.user.phone = number;
                        this._showDialog(this.user);
                    } else {
                        this._showSnackbar(detail);
                        // this.onShowActiveNoNumber();
                    }
                } else {
                    throw Error;
                }
            } else {
                this._showSnackbar(this.snackBarLabel.wrongNumber);
            }
        } catch(err) {
            this._showSnackbar(this.snackBarLabel.error);
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
    _showLoader(loader) {
        this.onShowLoader(loader)
    }
    _offShowLoader(loader) {
        this.offShowLoader(loader)
    }
    randomInteger (pow) {
        return Math.floor(Math.random() * pow);
    };
    async sendCode() {
        try {
            this._showLoader('loaderSms')
            const pow = 1000000;
            let randNum = this.randomInteger(pow);
            console.log(randNum);
            this._addCode(randNum);
            const res = await apiSendCodeBySms(this.user.phone, this.user.code) 
            this.offShowLoader('loaderSms')
            console.log('res:', res) 
            return res;
        } catch(err) {
            console.log('err:', err)
            this._showSnackbar(this.snackBarLabel.error);
        }

    }

    _addCode(code) {
        this.user.code = code;
    }
    async verifyCode(code) {
        try {
            this._showLoader('loaderSms');
            const codeIsTrue =  await apiVerifyCode(this.user.phone, code)
            if (codeIsTrue) {
                const request = await apiActiveServiceAmediateka(this.user.phone);
                this.offShowLoader('loaderSms')
                console.log('request apiActiveServiceAmediateka:', request)
                const {code, detail} = request;
                if (code) {
                    if (code === "OK") {
                        this.user.active = true;
                        this._showSnackbar(this.snackBarLabel.serviceActivated);
                        ym(70547467,'reachGoal','Podklyuchili_podpisku');
                    } else {
                        this._showSnackbar(detail);
                    }
                } else {
                    throw Error;
                }
            } else {
                this._showSnackbar(this.snackBarLabel.wrongCode);
            }            
        } catch(err) {
            this._showSnackbar(this.snackBarLabel.error);
        }

    }
    checkPhoneNumber(number) {
        if (number) {
            return number.length === 12 ? true : false;
        }
        return false;
    }

}