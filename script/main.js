"use strict";
import * as firebase from "./firebase.js"



import * as mainView from "./views/mainView.js";
import * as oneView from "./views/sectionOneView.js"
import * as twoView from "./views/sectionTwoView.js"
import * as createView from "./views/createView.js";
import * as loginView from "./views/loginView.js";
import * as searchView from "./views/searchView.js";


createView
const mainViewControll = function () {
    mainView.app.renderMainView();
    mainView.app.logOut();
    mainView.app.homePage();
}

const oneViewControll = function () {
    oneView.app.showView();
}
const twoViewControll = function () {
    twoView.app.showView();
}

const createControll = function () {
    createView.app.createAccountView();
    createView.app.normalEvent();
    createView.app.googleEvent();

}

const loginControll = function () {
    loginView.app.createLoginView()
    loginView.app.login()
    loginView.app.render();
    loginView.app.changePassword();
    loginView.app.deleteAccount();
}


const searchControll = function () {
    // searchView.app.renderSearchView();
    searchView.app.evnet()
}

mainViewControll();
oneViewControll();
twoViewControll();
createControll();
loginControll();
searchControll();

