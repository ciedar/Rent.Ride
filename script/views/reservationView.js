import View from "./mainView.js";
import * as firebase from "../firebase.js";


class ReservationView extends View {
    #carInfo;
    #carId
    #user;
    #headerHTML = `<header id="header">
    <nav>
        <div class="logo">
            <a href="#home">Rent&Ride</a>
        </div>
        <div class="nav-links">
            <ul>
                <li><a href="#header">Wypożycz</a></li>
                <li><a href="#section-one">Dlaczego my</a></li>
                <li><a href="#section-two">Flota</a></li>
                <li><a href="#section-three">Miasta</a></li>
                <li><a href="#section-four">Profil</a></li>
                <li><a href="#" class="btn log-out-btn">Wyloguj</a></li>
            </ul>
        </div>
    </nav>
    <div class="header-content">
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <div class="search-form">
            <form>
            <div class="form-group">
            <label for="location">Skąd?</label>
            <select class="location" id="location" name="location">
              <option value="Wszystkie">Wszystkie lokalizacje</option>
              <option value="Poznań">Poznań</option>
              <option value="Gdańsk">Gdańsk</option>
              <option value="Warszawa">Warszawa</option>
              <option value="Kraków">Kraków</option>
            </select>
            </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-secondary">Wyszukaj!</button>
                </div>
            </form>
        </div>
    </div>
</header>`

    showDetailsEvent() {
        document.body.addEventListener("click", async (a) => {
            if (!a.target.closest(".reserv-btn")) return;
            this.#carId = a.target.closest(".car-info").getAttribute("id");
            this.#carInfo = await firebase.getData(this.#carId);
            firebase.checkCurrentUser().then(async (user) => {
                if (user != null) {
                    const html = `${this.#headerHTML}
                    <div class="reservation-div">
                        <div class="reservation-div-img">
                            <img src="${await firebase.refURL(this.#carInfo.data().imgUrl)}" width="400px">
                        </div>
                        <div class="reservation-div-info">
                            <h5>${this.#carInfo.data().model}</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, dicta nam numquam commodi
                                fuga, culpa minima ipsam enim distinctio iure non illo. Eius, debitis sint!</p>
                            <ul>
                                <li>Lorem, ipsum.</li>
                                <li>Lorem, ipsum.</li>
                                <li>Lorem, ipsum.</li>
                                <li>Lorem, ipsum.</li>
                                <li>Lorem, ipsum.</li>
                            </ul>
                            <button class="reservation-btn">
                                ${this.#carInfo.data().price}zł/day
                            </button>
                        </div>
                    </div>`
                    this.clear();
                    this.parentContainer.insertAdjacentHTML("afterbegin", html);
                } else {
                    const html = `${this.headerHTML}
                    <div class="reservation-div">
                        <div class="reservation-div-img">
                            <img src="${await firebase.refURL(this.#carInfo.data().imgUrl)}" width="400px">
                        </div>
                        <div class="reservation-div-info">
                            <h5>${this.#carInfo.data().model}</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, dicta nam numquam commodi
                                fuga, culpa minima ipsam enim distinctio iure non illo. Eius, debitis sint!</p>
                            <ul>
                                <li>Lorem, ipsum.</li>
                                <li>Lorem, ipsum.</li>
                                <li>Lorem, ipsum.</li>
                                <li>Lorem, ipsum.</li>
                                <li>Lorem, ipsum.</li>
                            </ul>
                            <button class="reservation-btn">
                                ${this.#carInfo.data().price}zł/day
                            </button>
                        </div>
                    </div>`
                    this.clear();
                    this.parentContainer.insertAdjacentHTML("afterbegin", html);

                }
            })
        })
    }

    renderReservationView() {
        document.body.addEventListener("click", async (a) => {
            if (!a.target.closest(".reservation-btn")) return;
            firebase.checkCurrentUser().then(async (user) => {
                if (user != null) {
                    const html = `${this.#headerHTML}
                    <div class="reservation-details-container">
                    <div class="reservation-details-img-div">
                    <img src="${await firebase.refURL(this.#carInfo.data().imgUrl)}" width="400px">
                    </div>
                    <div class="reservation-details-info-div">
                    <h5>od</h5>
                    <input class="date-in" type="date">
                    <h5>Ilość dni:</h5>
                    <input type="number" class="days-amount">
                    <button class="rezerwuje"> rezerwuje </button>
                    </div>
                    </div>`
                    this.clear();
                    this.parentContainer.insertAdjacentHTML('afterbegin', html);
                } else {
                    const html = `${this.headerHTML}
                    <div class="reservation-details-container">
                    <div class="reservation-details-img-div">
                    <img src="${await firebase.refURL(this.#carInfo.data().imgUrl)}" width="400px">
                    </div>
                    <div class="reservation-details-info-div">
                    <h5>od</h5>
                    <input class="date-in" type="date">
                    <h5>Ilość dni:</h5>
                    <input type="number" class="days-amount">
                    <button class="rezerwuje"> rezerwuje </button>
                    </div>
                    </div>`
                    this.clear();
                    this.parentContainer.insertAdjacentHTML('afterbegin', html);
                }
            })

        })
    }

    confirmReservation() {
        document.body.addEventListener("click", async (a) => {
            if (!a.target.closest(".rezerwuje")) return;
            try {
                const user = await firebase.checkCurrentUser();
                if (user !== null) {
                    console.log(user);
                    const dateIn = document.querySelector(".date-in");
                    const days = document.querySelector('.days-amount');
                    this.#user = firebase.userId;
                    const userData = await firebase.getCurrentUserData("id", this.#user);
                    const data = {
                        reservationNr: this.#carInfo.data().id,
                        dateInReservation: dateIn.value,
                        reservationDays: days.value
                    }
                    const carData = {
                        reserved: true
                    }
                    await firebase.updateUserInfo(userData[0].id, data);
                    await firebase.updateCarInfo(this.#carId, carData);
                    this.clear();
                    this.renderMainView();
                    firebase.logOut(firebase.auth).then(() => {
                        alert(`W celu przetworzenia rezerwacji musieliśmy Cie wylogować, po ponownym zalogownaiu Twoja rezerwacja powinna byc dostępna w zakładce rezerwacje`);
                    })


                } else {
                    alert("Aby dokonać rezerwacji utwórz konto/zaloguj się");
                }
            } catch (err) {
                console.error(err);
            }
        });
    }

}



export const app = new ReservationView();