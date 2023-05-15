import View from "./mainView.js";
import * as firebase from "../firebase.js";


class LoginView extends View {
    #user;
    #userData;
    #userId;
    #headerHTML = `<header id="header">
    <nav>
        <div class="logo">
            <a href="#">Rent&Ride</a>
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
                    <input type="text" id="location" name="location" placeholder="Ville, aéroport, gare...">
                </div>
                <div class="form-group-dates">
                    <label for="dates">Data odbioru</label>
                    <input class="dateIn" type="date" id="dateIn" name="dates"
                        placeholder="Date et heure de départ et de retour">
                    <label for="passengers">Ilość pasażerów</label>
                    <input class="dateOut" type="date" id="dateOut" name="passengers"
                        placeholder="Nombre de passagers">
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
                const user = await firebase.checkCurrentUser();
                if (user) {
                    const html = `<header id="header">
                <nav>
                  <div class="logo">
                    <a href="#">Rent&Ride</a>
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
                        <input type="text" id="location" name="location" placeholder="Ville, aéroport, gare...">
                      </div>
                      <div class="form-group-dates">
                        <label for="dates">Data odbioru</label>
                        <input class="dateIn" type="date" id="dateIn" name="dates"
                          placeholder="Date et heure de départ et de retour">
                        <label for="passengers">Ilość pasażerów</label>
                        <input class="dateOut" type="date" id="dateOut" name="passengers"
                          placeholder="Nombre de passagers">
                      </div>
                      <div class="form-group">
                        <button type="submit" class="btn btn-secondary">Wyszukaj!</button>
                      </div>
                    </form>
                  </div>
                </div>
              </header>`;
                    this.clear();
                    this.parentContainer.insertAdjacentHTML("afterbegin", html);
                }
                if (!firebase.loginAccount(email, password)) {
                    this.clear();
                    this.createLoginView();
                }
            } catch (error) {
                // this.#user = null;
                console.error(error);
                // this.clear();
                // this.createLoginView();
            }
        });
        this.renderNavElementSection();
    }

    renderNavElementSection() {
        this.parentContainer.addEventListener("click", (a) => {
            // const data = this.getUserData();
            // data.forEach((a) => { console.log(a) });
            if (!a.target.getAttribute("href")) return;
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
                    const data = this.#userData[0];
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
                const html = `<div class="profile-container-div profile-div">
                <div class="reservation-div profile-info-div">
                <h2>Twoje rezerwacje </h2>
                <p>sadas</p> 
                </div>`
                document.querySelector(".profile-container-div").innerHTML = '';
                document.querySelector(".profile-container-div").insertAdjacentHTML("afterbegin", html)
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
                <button class="delete-ok-btn"></button> 
                </div>`
                document.querySelector(".profile-container-div").innerHTML = '';
                document.querySelector(".profile-container-div").insertAdjacentHTML("afterbegin", html)
            }
        })
    }

    // changePassword() {
    //     document.body.addEventListener("click", (a) => {
    //         if (!a.target.closest(".ok")) return;
    //         const oldPassword = document.querySelector(".password-input").value;
    //         const newPassword = document.querySelector(".new-password-input").value;
    //         const repeatPassword = document.querySelector(".new-password-input-two").value;
    //         // console.log(this.#userData[0]?.data?.passowrd)
    //         console.log(this.#userData[0].data)
    //         console.log(this.#userId);
    //         if (this.#userData[0]?.data.password === oldPassword) {
    //             console.log("here")
    //             if (newPassword === repeatPassword) {
    //                 console.log(this.#userData[0].data)
    //                 const data = {
    //                     password: newPassword
    //                 }
    //                 console.log(this.#userData[0].data)
    //                 console.log(this.#userId);
    //                 firebase.updateUserInfo(this.#userId, data);
    //                 firebase.changePassword(newPassword)
    //                 console.log(this.#userData[0].data)
    //                 console.log(this.#userId);

    //                 this.clear();
    //                 this.renderMainView();
    //                 firebase.logOut(firebase.auth).then(() => {
    //                     alert(`Wylogowano pomyslnie`);
    //                 })
    //             }
    //         }
    //     })
    // }
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


}

export const app = new LoginView();




    // async login() {
    //     this.parentContainer.addEventListener("click", (a) => {
    //         if (!a.target.closest(".sign_in")) return;
    //         const email = document.querySelector(".email").value
    //         const password = document.querySelector(".password").value
    //         try {

    //         }
    //         await firebase.loginAccount(email, password).then(() => {
    //             this.#user = firebase.userId;
    //             this.#userData = firebase.getCurrentUserData("id", this.#user)
    //             console.log(this.#userData);
    //             if (firebase.user != null) {
    //                 const html = `<header id="header">
    //     <nav>
    //         <div class="logo">
    //             <a href="#">Rent&Ride</a>
    //         </div>
    //         <div class="nav-links">
    //             <ul>
    //                 <li><a href="#header">Wypożycz</a></li>
    //                 <li><a href="#section-one">Dlaczego my</a></li>
    //                 <li><a href="#section-two">Flota</a></li>
    //                 <li><a href="#section-three">Miasta</a></li>
    //                 <li><a href="#section-four">Profil</a></li>
    //                 <li><a href="#" class="btn log-out-btn">Wyloguj</a></li>
    //             </ul>
    //         </div>
    //     </nav>
    //     <div class="header-content">
    //         <h1>Lorem ipsum dolor sit amet consectetur.</h1>
    //         <p>Lorem ipsum dolor sit amet.</p>
    //         <div class="search-form">
    //             <form>
    //                 <div class="form-group">
    //                     <label for="location">Skąd?</label>
    //                     <input type="text" id="location" name="location" placeholder="Ville, aéroport, gare...">
    //                 </div>
    //                 <div class="form-group-dates">
    //                     <label for="dates">Data odbioru</label>
    //                     <input class="dateIn" type="date" id="dateIn" name="dates"
    //                         placeholder="Date et heure de départ et de retour">
    //                     <label for="passengers">Ilość pasażerów</label>
    //                     <input class="dateOut" type="date" id="dateOut" name="passengers"
    //                         placeholder="Nombre de passagers">
    //                 </div>
    //                 <div class="form-group">
    //                     <button type="submit" class="btn btn-secondary">Wyszukaj!</button>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // </header>`
    //                 this.clear()
    //                 this.parentContainer.insertAdjacentHTML('afterbegin', html);
    //             }
    //         }).catch((error) => {
    //             console.error(error);
    //             this.clear();
    //             this.createLoginView();
    //         })
    //     })
    //     this.renderNavElementSection();
    // }