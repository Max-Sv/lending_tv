import './scss/reset.css'
import './scss/main.scss'
import {MDCRipple} from '@material/ripple';

// mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));
// mdc.ripple.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

import {MDCDialog} from '@material/dialog';
const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
const but = document.getElementById('test');
but.addEventListener("click",() =>  dialog.open());
import {MDCCheckbox} from '@material/checkbox';

const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));