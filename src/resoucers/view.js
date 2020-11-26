import { MDCDialog } from "@material/dialog";
import { MDCSnackbar } from "@material/snackbar";
import { MDCCheckbox } from "@material/checkbox";
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCMenu} from '@material/menu';
import {MDCRipple} from '@material/ripple';
import Inputmask from "inputmask";


export default class View {
    constructor() {
        this.agreementState = false;
        this.phoneNumberSpan = this.getElement(".dialog__user-phone-number");
        this.phoneNumberInput = this.getElement(".main__phone-number-input");
        this.phoneNumberButton = this.getElement(".main__phone-number-button");
        this.contentActiveService = this.getElement(".content__active-service");
        this.contentAddCode = this.getElement(".content__add-code");
        this.activeServiceDialog = new MDCDialog(
            this.getElement(".active-service-dialog")
        );
        this.activeServiceCheckbox = this.getElement(".active-service-checkbox");
        
        this.matActiveServiceCheckbox = new MDCCheckbox(
            this.activeServiceCheckbox
        );
        this.activeServiceButton = this.getElement(".active-service-button");
        this.snackbarNoNumber = new MDCSnackbar(this.getElement(".snackbar-no-number"));
        this.setPhoneNumberMask();
        this.codeFirstInput = this.getElement('#code-number-1');
        this.codeInputs = document.querySelectorAll('.main__code-number');

        this.menuButton = this.getElement('.menu-button');
        this.menu = new MDCMenu(this.getElement('.mdc-menu'));
        
        this.listenMenu()
    }
    listenMenu() {
        this.menu.setAnchorElement(this.menuButton)
        this.menuButton.addEventListener('click', event => {
            this.menu.open = true;
                })
    }
    _activeCodeInputLogic(firstInput, inputs) {
        const self = this;
        const popuNext = function(el, data) {
            el.value = data[0];
            data = data.substring(1);
            if ( el.nextElementSibling && data.length ) {
                popuNext(el.nextElementSibling, data);
            }
        };
        const splitNumber = function(e) {
            let data = e.data || e.target.value;
            if ( ! data ) return; 
            if ( data.length === 1 ) return; 
            
            popuNext(e.target, data);
        }
        inputs.forEach(function(input) {
            input.addEventListener('keyup', function(e){
                if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17) {
                    return;
                }
                if ( (e.keyCode === 8 || e.keyCode === 37) && this.previousElementSibling && this.previousElementSibling.tagName === "INPUT" ) {
                    this.previousElementSibling.select();
                } else if (e.keyCode !== 8 && this.nextElementSibling) {
                    this.nextElementSibling.select();
                } 
                if ( e.target.value.length > 1 ) {
                    splitNumber(e);
                }
                if (this.nextElementSibling === null) {
                    let code ="";
                    inputs.forEach(input => code += input.value);
                    if (code.length === 6) {
                        self.code = code;
                        self._setButtonActive()
                    } else {
                        self._setButtonDisable()
                    }
                }
            });
            
            input.addEventListener('focus', function(e) {
                if ( this === firstInput ) return;
                if ( firstInput.value == '' ) {
                    firstInput.focus();
                }
                if ( this.previousElementSibling.value == '' ) {
                    this.previousElementSibling.focus();
                }
            });
        });
        firstInput.addEventListener('input', splitNumber);
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
    get _codeValue() {
        this.inputs.forEach((input) => console.log('input.value:', input.value))
    }
    setPhoneNumberMask() {
        let input = new Inputmask( {
            mask: "+375 99 999 99 99",
            placeholder: "",
            // showMaskOnFocus: false,
        });
        input.mask(this.phoneNumberInput);
    }
    bindSetAgreementState(handler) {
        this.activeServiceCheckbox.addEventListener('change', event => {
            handler(this.matActiveServiceCheckbox.checked)
        })
    }
    bindAddPhoneNumber(handler) {
        this.phoneNumberButton.addEventListener('click', event => {
            handler(this._phoneNumber)
        })
    }
    bindActionWithCode(handlerSend, handlerVerify) {
        this.activeServiceButton.addEventListener('click', event => {
            if( this.agreementState) {
                this._changeToCodeContent();
                handlerSend();
            } else {
                let result = handlerVerify(this.code);
                console.log('result:', result)
            }
        })
    }
    _changeToCodeContent() {
        this.agreementState = false;  
        this.activeServiceDialog.close();
        this.contentActiveService.style.display = "none";
        this.contentAddCode.style.display = "flex";
        this.activeServiceButton.innerHTML="ПОДТВЕРДИТЬ";
        this._setButtonDisable();
        this.showActiveServiceDialog()
        this._activeCodeInputLogic(this.codeFirstInput, this.codeInputs)
    }
    showActiveServiceDialog(user) {
        this.activeServiceDialog.open();
    }
    showSnackbarNoNumber() {
        this.snackbarNoNumber.open();
    }
    activeButton(state) {
        this.agreementState = state;
        if (state) {
            this._setButtonActive();
        } else {
            this._setButtonDisable();
        }
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
