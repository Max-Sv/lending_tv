import "./scss/reset.scss";
import "./scss/main.scss";
import View from './resoucers/view'
import Controller from './resoucers/controller'
import Model from './resoucers/model'

const app = new Controller(new Model(), new View());