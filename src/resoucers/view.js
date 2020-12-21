import { MDCDialog } from "@material/dialog";
import { MDCSnackbar } from "@material/snackbar";
import { MDCCheckbox } from "@material/checkbox";
import { MDCMenu, MDCMenuFoundation } from "@material/menu";
import Inputmask from "inputmask";
import {MDCMenuSurface} from '@material/menu-surface';


export default class View {
    constructor() {
				this.phone = null;
        this.agreementState = false;
        this.phoneNumberSpan = this.getElement(".dialog__user-phone-number");
        this.phoneNumberSpanNoNumber = this.getElement(".dialog__user-phone-no-number");
        this.phoneNumberInput = this.getElement(".main__phone-number-input");
        this.phoneNumberButton = this.getElement(".main__phone-number-button");
        this.contentActiveService = this.getElement(".content__active-service");
        this.contentAddCode = this.getElement(".content__add-code");
        this.loaderPhone = this.getElement(".loader__phone");
        this.loaderSms = this.getElement(".loader__sms");
        this.activeServiceDialog = new MDCDialog(
            this.getElement(".active-service-dialog")
        );
        this.activeNoNumber = new MDCDialog(
            this.getElement(".active-not-number")
        );
        this.activeServiceCheckbox = this.getElement(
            ".active-service-checkbox"
        );

        this.matActiveServiceCheckbox = new MDCCheckbox(
            this.activeServiceCheckbox
        );
        this.activeServiceButton = this.getElement(".active-service-button");
        this.snackbar = new MDCSnackbar(this.getElement(".snackbar-no-number"));
        this.setPhoneNumberMask();
        this.appLink = this.getElement(".app__store"); 
        this.googleLink = this.getElement(".google__store"); 
        this.codeFirstInput = this.getElement("#code-number-1");
        this.codeInputs = document.querySelectorAll(".main__code-number");
        this.menuButton = this.getElement(".menu-button");
        this.menu = new MDCMenu(this.getElement(".mdc-menu"));
        this.menuSurface = new MDCMenuSurface(document.querySelector('.mdc-menu-surface'));
        this.listenMenu();
        this._runMetric();
        this.getNumberFromHeader();
    }

    listenMenu() {
        this.menu.setAnchorElement(this.menuButton);
        this.menuButton.addEventListener("click", (event) => {
            this.menu.quickOpen = true;
            this.menu.open = true;
        });
    }
    _activeCodeInputLogic(firstInput, inputs) {
        setTimeout(() => {
            firstInput.focus();
        }, 1000);
        const self = this;
        const popuNext = function (el, data) {
            el.value = data[0];
            data = data.substring(1);
            if (el.nextElementSibling && data.length) {
                popuNext(el.nextElementSibling, data);
            }
        };
        const splitNumber = function (e) {
            let data = e.data || e.target.value;
            if (!data) return;
            if (data.length === 1) return;

            popuNext(e.target, data);
        };
        inputs.forEach(function (input) {
            input.addEventListener("keyup", function (e) {
                if (
                    e.keyCode === 16 ||
                    e.keyCode == 9 ||
                    e.keyCode == 224 ||
                    e.keyCode == 18 ||
                    e.keyCode == 17
                ) {
                    return;
                }
                if (
                    (e.keyCode === 8 || e.keyCode === 37) &&
                    this.previousElementSibling &&
                    this.previousElementSibling.tagName === "INPUT"
                ) {
                    this.previousElementSibling.select();
                } else if (e.keyCode !== 8 && this.nextElementSibling) {
                    this.nextElementSibling.select();
                }
                if (e.target.value.length > 1) {
                    splitNumber(e);
                }
                if (this.nextElementSibling === null) {
                    let code = "";
                    inputs.forEach((input) => (code += input.value));
                    if (code.length === 6) {
                        self.code = code;
                        self._setButtonActive();
                    } else {
                        self._setButtonDisable();
                    }
                }
            });

            input.addEventListener("focus", function (e) {
                if (this === firstInput) return;
                if (firstInput.value == "") {
                    firstInput.focus();
                }
                if (this.previousElementSibling.value == "") {
                    this.previousElementSibling.focus();
                }
            });
        });
        firstInput.addEventListener("input", splitNumber);
    }
    _runMetric() {
        this.appLink.addEventListener('click', e => {
            ym(70547467,'reachGoal','App_Store');
        })
        this.googleLink.addEventListener('click', e => {
            ym(70547467,'reachGoal','Google_Ply');
        })
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
    getNumberFromHeader() {
			let req = new XMLHttpRequest();
			req.open("GET", document.location, false);
					req.send(null);
					let headers = {}
			req
				.getAllResponseHeaders()
				.split("\u000d\u000a")
				.forEach((line) => {
					console.log('line:', line)
					if (line.length > 0) {
						let delimiter = "\u003a\u0020",
							header = line.split(delimiter);
						headers[header.shift().toLowerCase()] = header.join(delimiter);
					}
				});
					console.log("headers:", headers);
					console.log("headers:", headers['x-msisdn']);
					console.log("headers:", headers['X-MSISDN']);
					if (headers['x-msisdn']) {
						this.phone = headers['x-msisdn'];					
					}
		}
    get _phoneNumber() {

        const { value } = this.phoneNumberInput;
        if (value) {
            this.phoneNumberSpan.innerHTML = value;
            let number = value.match(/\d/g);
            return number.join("");
        }
    }

    setPhoneNumberMask() {
        let input = new Inputmask({
            mask: "+375 99 999 99 99",
            placeholder: "",
        });
        input.mask(this.phoneNumberInput);
    }
    bindSetAgreementState(handler) {
        this.activeServiceCheckbox.addEventListener("change", (event) => {
            handler(this.matActiveServiceCheckbox.checked);
        });
    }
    bindAddPhoneNumber(handler) {
        this.phoneNumberButton.addEventListener("click", (event) => {
            handler(this.phone? this.phone: this._phoneNumber);
            ym(70547467,'reachGoal','najali_podklyuchit')
        });
    }
    bindActionWithCode(handlerSend, handlerVerify) {
        this.activeServiceButton.addEventListener("click", (event) => {
            if (this.agreementState) {
                handlerSend().then(status => {
                    if (status) {
                        this._changeToCodeContent();
                    }
                });
            } else {
                handlerVerify(this.code);
            }
        });
    }
    _changeToCodeContent() {
        this.agreementState = false;
        this.activeServiceDialog.close();
        this.contentActiveService.style.display = "none";
        this.contentAddCode.style.display = "flex";
        this.activeServiceButton.innerHTML = "ПОДТВЕРДИТЬ";
        this._setButtonDisable();
        this.showActiveServiceDialog();
        this._activeCodeInputLogic(this.codeFirstInput, this.codeInputs);
    }
    showActiveServiceDialog() {
        this.activeServiceDialog.open();
    }
    showActiveNoNumber() {
        const { value } = this.phoneNumberInput;
        if (value) {
            this.phoneNumberSpanNoNumber.innerHTML = value;
        }
        this.activeNoNumber.open();
    }
    showSnackbar(label) {
        this.snackbar.labelText = label;
        this.snackbar.open();
        if (label === 'Услуга подключена') this.activeServiceDialog.close();
    }
    showLoader(loader) {
        this._setLoaderActive(this[loader])
    }
    offShowLoader(loader) {
        this._setLoaderDisable(this[loader])
    }
    activeButton(state) {
        this.agreementState = state;
        if (state) {
            this._setButtonActive();
        } else {
            this._setButtonDisable();
        }
    }
    _setButtonDisable() {
        this.activeServiceButton.disabled = true;
        this.activeServiceButton.classList.add("disabled");
    }
    _setButtonActive() {
        this.activeServiceButton.disabled = false;
        this.activeServiceButton.classList.remove("disabled");
    }
    _setLoaderActive(loader) {
        loader.style.display="inline-block";
    }
    _setLoaderDisable(loader) {
        loader.style.display="none";
    }
}
