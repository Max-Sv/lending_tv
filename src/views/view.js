import { MDCDialog } from "@material/dialog";
import { MDCSnackbar } from "@material/snackbar";
import { MDCCheckbox } from "@material/checkbox";

import Inputmask from "inputmask";

export default class View {
    constructor() {
        this.phoneNumberSpan = this.getElement(".dialog__user-phone-number");
        this.phoneNumberInput = this.getElement(".main__phone-number-input");
        this.phoneNumberButton = this.getElement(".main__phone-number-button");
        this.activeServiceDialog = new MDCDialog(
            this.getElement(".active-service-dialog")
        );
        this.activeServiceCheckbox = new MDCCheckbox(
            this.getElement(".active-service-checkbox")
        );
        this.activeServiceButton = this.getElement(".active-service-button");
        this.snackbarNoNumber = new MDCSnackbar(this.getElement(".snackbar-no-number"));
        this.setPhoneNumberMask()
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
    get _phoneNumber() {
        const { value } = this.phoneNumberInput;
        if (value) {
            this.phoneNumberSpan.innerHTML = value;
            let number = value.match(/\d/g);
            return number.join('');
        }
        
    }
    setPhoneNumberMask() {
        let input = new Inputmask("+375 99 999-99-99", {
            // placeholder: "+375         ",
        });
        input.mask(this.phoneNumberInput);
    }
    bindAddPhoneNumber(handler) {
        this.phoneNumberButton.addEventListener('click', event => {
            handler(this._phoneNumber)
        })
    }
    bindAddPhoneNumber(handler) {
        this.phoneNumberButton.addEventListener('click', event => {
            handler(this._phoneNumber)
        })
    }
    showActiveServiceDialog(user) {
        this.activeServiceDialog.open();
    }
    showSnackbarNoNumber() {
        this.snackbarNoNumber.open();
    }
    _setButtonDisable () {
        this.activeServiceButton.disabled = true;
        this.activeServiceButton.classList.add('disabled')
    }
    _setButtonActive () {
        this.activeServiceButton.disabled = false;
        this.activeServiceButton.classList.remove('disabled')
    }
}
