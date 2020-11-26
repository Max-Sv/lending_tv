import "./scss/reset.scss";
import "./scss/main.scss";
// import { MDCRipple } from "@material/ripple";
import View from './resoucers/view'
import Controller from './resoucers/controller'
import Model from './resoucers/model'

// mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));
// mdc.ripple.MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
// const URL = "http://127.0.0.1:4001/sms";
// const buttonRipple = new MDCRipple(document.querySelector(".mdc-button"));
// const snackbar = new MDCSnackbar(document.querySelector(".mdc-snackbar"));
// const dialog = new MDCDialog(document.querySelector(".mdc-dialog"));
// const checkbox = new MDCCheckbox(document.querySelector(".mdc-checkbox"));


// const inputPhone = document.getElementById("main-input-phone");
// async function sendler() {
//     console.log("222:", 222);
//     users = await (await fetch(URL, { method: "GET" })).json();
//     console.log("test:", inputPhone.value.lenght);
// }
const app = new Controller(new Model(), new View());