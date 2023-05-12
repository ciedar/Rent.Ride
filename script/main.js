"use strict";
import * as firebase from "./firebase.js"



import * as mainView from "./views/mainView.js";
import * as oneView from "./views/sectionOneView.js"
import * as twoView from "./views/sectionTwoView.js"
import * as loginView from "./views/loginView.js";



const mainViewControll = function () {
    mainView.app.renderMainView();
}

const oneViewControll = function () {
    oneView.app.showView();
}
const twoViewControll = function () {
    twoView.app.showView();
}

const loginControll = function () {
    loginView.app.showView();
    loginView.app.normalEvent();
    loginView.app.googleEvent();
}

mainViewControll();
oneViewControll();
twoViewControll();
loginControll();

