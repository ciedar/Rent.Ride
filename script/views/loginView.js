import View from "./mainView.js";
import * as firebase from "../firebase.js";


class LoginView extends View {
    #user;
    #userData;
    #userId;
    #carData
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
    createLoginView() {
        this.parentContainer.addEventListener("click", (a) => {
            if (!a.target.closest(".login-btn")) return;
            const html = ` <div class="login-div">
            <div class="login-form-div">
                <div class="email-div">
                    <label for="email">E-mail:</label>
                    <input class="email" placeholder="e-mail" type="email" id="email" name="email" required>
                </div>
            <div class="email-div">
                <label for="password">Hasło:</label>
                <input class="password" placeholder="password" type="password" id="password" name="password" required>
            </div>
                <button class="sign_in" type="submit">zaloguj</button>
      </div>`
            this.clear();
            this.parentContainer.insertAdjacentHTML("afterbegin", html);
        })
    }

    async login() {
        this.parentContainer.addEventListener("click", async (event) => {
            if (!event.target.closest(".sign_in")) return;
            const email = document.querySelector(".email").value;
            const password = document.querySelector(".password").value;
            try {
                await firebase.loginAccount(email, password);
                this.#user = firebase.userId;
                this.#userData = await firebase.getCurrentUserData("id", this.#user)
                this.#userId = this.#userData[0].id
                firebase.checkCurrentUser().then((user) => {
                    if (user != null) {
                        const html = `${this.#headerHTML}`;
                        this.clear();
                        this.parentContainer.insertAdjacentHTML("afterbegin", html);
                        this.renderNavElementSection();
                    }
                    else {
                        this.clear();
                        this.createLoginView();
                    }
                })
            } catch (error) {
                console.error(error);

            }
        })
    }


    renderNavElementSection() {
        this.parentContainer.addEventListener("click", (a) => {

            if (!a.target.getAttribute("href")) return;
            if (a.target.getAttribute("href") === "#home") {
                const html = `${this.#headerHTML}${this.bodyHTML}`
                this.clear()
                this.parentContainer.insertAdjacentHTML("afterbegin", html)
            }
            if (a.target.getAttribute("href") === "#section-one") {
                const html = `${this.#headerHTML}
                            `
                this.clear()
                this.parentContainer.insertAdjacentHTML("afterbegin", html)
            }
            if (a.target.getAttribute("href") === "#section-two") {
                const html = `${this.#headerHTML}
                            `
                this.clear()
                this.parentContainer.insertAdjacentHTML("afterbegin", html)
            }
            if (a.target.getAttribute("href") === "#section-three") {
                const html = `${this.#headerHTML}
                            `
                this.clear()
                this.parentContainer.insertAdjacentHTML("afterbegin", html)
            }
            if (a.target.getAttribute("href") === "#section-four") {
                const html = `${this.#headerHTML}
                            <section class="profile-section section" id="section-four">
                            <div class="profile-container">
                            <aside class="aside-bar">
                            <ul class="aside-ul">
                                <li><a class="aside-a" href="#">Profil</a></li>
                                <li><a class="aside-a" href="#">Rezerwacje</a></li>
                                <li><a class="aside-a" href="#">Zmiana hasła</a></li>
                                <li><a class="aside-a" href="#">Usuń konto</a></li>
                            </ul> 
                            </aside>
                            <div class="profile-container-div"></div>
                            
                            </div>
                            </section>                       
                            `
                this.clear()
                this.parentContainer.insertAdjacentHTML("afterbegin", html)
            }
        })
    }
    async render() {
        document.body.addEventListener("click", async (a) => {
            try {
                if (!a.target.classList.contains("aside-a")) return;
                if (a.target.textContent === "Profil") {
                    const data = this.#userData[0].data;
                    console.log(data);
                    const html = `<div class="profile-container-div profile-div">
                    <div class="username-div profile-info-div">
                    <h2>Nazwa użytkownika: </h2>
                    <p>${data.username}</p> 
                    </div>
                    <div class="emaill-div profile-info-div">
                    <h2>e-mail użytkownika:</h2>
                    <p>${data.email}</p> 
                    </div>
                    <div class="date-div profile-info-div">
                    <h2>Data dołaczęnia: </h2>
                    <p>sadas</p> 
                    </div>
                    </div>`
                    document.querySelector(".profile-container-div").innerHTML = '';
                    document.querySelector(".profile-container-div").insertAdjacentHTML("afterbegin", html)
                }
            }
            catch (error) {
                console.log(error)
            }
            if (a.target.textContent === "Rezerwacje") {
                const data = this.#userData[0].data;
                this.#carData = await firebase.getData(`${data.reservationNr}`);
                if (data?.reservationNr != null) {
                    const html = `<div class="profile-container-div profile-div">
                    <div class="reservation-div profile-info-div">
                    <h2>Twoje rezerwacje </h2>
                    <p>Rezerwacja nr:${data?.reservationNr} </p>
                    <p>Odbiór auta: dnia ${data?.dateInReservation} w ${this.#carData?.data().location}  
                    <p>total price:${this.#carData?.data()?.price * data?.reservationDays} </p>
                    <button class="cancel"> anuluj rezerwacje </button>
                    </div>
                    </div>
                    `
                    document.querySelector(".profile-container-div").innerHTML = '';
                    document.querySelector(".profile-container-div").insertAdjacentHTML("afterbegin", html)
                } else {

                    const html = `<div class="profile-container-div profile-div">
                    <div class="reservation-div profile-info-div">
                    <h2>Twoje rezerwacje </h2>
                    <p>Rezerwacja nr: </p> 
                    <h5> price: </h5>
                    <button class="cancel"> anuluj rezerwacje </button>
                    </div>
                    </div>`
                    document.querySelector(".profile-container-div").innerHTML = '';
                    document.querySelector(".profile-container-div").insertAdjacentHTML("afterbegin", html)
                }

                document.querySelector(".cancel").addEventListener("click", () => {
                    const userData = {
                        reservationNr: null,
                        dateInReservation: null,
                        reservationDays: null
                    }
                    const carData = {
                        reserved: false
                    }

                    firebase.updateCarInfo(this.#carData?.data()?.id, carData);
                    firebase.updateUserInfo(this.#userData[0]?.id, userData);
                    this.clear();
                    this.renderMainView();
                    firebase.logOut(firebase.auth).then(() => {
                        alert(`W celu poprawnego anulowania rezerwacji musieliśmy Cie wylogować, po ponownym zalogowaniu Twoja rezerwacja powinna być już niedostępna`);
                    })

                })
            }
            if (a.target.textContent === "Zmiana hasła") {
                const html = `<div class="profile-container-div profile-div">
                <div class="change-div profile-info-div">
                <h2>Wprowadź aktualne hasło: <input class="password-input" placeholder="password" type="password"></h2>
                <h2>Wprowadź nowe hasło: <input class="new-password-input" placeholder="password" type="password"></h2>
                <h2>Potwierdź nowe hasło: <input class="new-password-input-two" placeholder="password" type="password"></h2>
                <button class="ok">Zatwierdź</button>
                </div>`
                document.querySelector(".profile-container-div").innerHTML = '';
                document.querySelector(".profile-container-div").insertAdjacentHTML("afterbegin", html)
            }
            if (a.target.textContent === "Usuń konto") {
                const html = `<div class="profile-container-div profile-div">
                <div class="delete-div profile-info-div">
                <h2>Wprowadź hasło: <input class="delete-input" placeholder="password" type="password"> </h2>
                <button class="delete-ok-btn">Potwierdź</button> 
                </div>`
                document.querySelector(".profile-container-div").innerHTML = '';
                document.querySelector(".profile-container-div").insertAdjacentHTML("afterbegin", html)
            }
        })
    }

    changePassword() {
        document.body.addEventListener("click", async (a) => {
            if (!a.target.closest(".ok")) return;
            const oldPassword = document.querySelector(".password-input").value;
            const newPassword = document.querySelector(".new-password-input").value;
            const repeatPassword = document.querySelector(".new-password-input-two").value;

            if (this.#userData[0]?.data.password === oldPassword) {
                if (newPassword === repeatPassword) {
                    const data = {
                        password: newPassword
                    };

                    await firebase.updateUserInfo(this.#userId, data);
                    await firebase.changePassword(newPassword);

                    this.clear();
                    this.renderMainView();
                    firebase.logOut(firebase.auth).then(() => {
                        alert("Wylogowano pomyślnie");
                    });
                }
            }
        });
    }

    deleteAccount() {
        document.body.addEventListener("click", (a) => {
            if (a.target.closest(".delete-ok-btn")) {
                console.log(this.#userData[0].data)
                const passwordInput = document.querySelector(".delete-input").value;
                if (passwordInput === this.#userData[0].data.password) {
                    console.log(this.#userId);
                    firebase.deleteAccount();
                    firebase.deleteUserDataFromDataBase(this.#userId)
                    this.clear();
                    this.renderMainView();
                }
            }
        })
    }


}

export const app = new LoginView();


