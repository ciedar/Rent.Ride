"use strict";



import * as mainView from "./views/mainView.js";
import * as createView from "./views/createView.js";
import * as loginView from "./views/loginView.js";
import * as searchView from "./views/searchView.js";
import * as reservationView from "./views/reservationView.js";



const mainViewControll = function () {
    mainView.app.renderMainView();
    mainView.app.logOut();
    mainView.app.navigateToHomePage();
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
    searchView.app.evnet()
}

const reservationControll = function () {
    reservationView.app.showDetailsEvent();
    reservationView.app.renderReservationView();
    reservationView.app.confirmReservation();
}

mainViewControll();
createControll();
loginControll();
searchControll();
reservationControll()


