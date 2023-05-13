import View from "./mainView.js";
import * as firebase from "../firebase.js";


class LoginView extends View {
    #user;
    #userData;
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

    login() {
        this.parentContainer.addEventListener("click", (a) => {
            if (!a.target.closest(".sign_in")) return;
            const email = document.querySelector(".email").value
            const password = document.querySelector(".password").value
            firebase.loginAccount(email, password).then(() => {
                this.#user = firebase.userId;
                if (firebase.user != null) {
                    this.getCurrentUser(this.#user);
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
    </header>`
                    this.clear()
                    this.parentContainer.insertAdjacentHTML('afterbegin', html);
                }
            }).catch((error) => {
                console.error(error);
                this.clear();
                this.createLoginView();
            })
        })
        this.renderNavElementSection();
    }

    renderNavElementSection() {
        this.parentContainer.addEventListener("click", (a) => {
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
                            <p>${this.#user}<p> 
                            </aside>
                            
                            </div>
                            </section>                       
                            `
                this.clear()
                this.parentContainer.insertAdjacentHTML("afterbegin", html)
            }
        })
    }
    getCurrentUser(id) {
        this.#userData = firebase.getCurrentUser(id);
        // this.#userData.then((a) => { console.log(a) })
        return this;
    }
}

export const app = new LoginView();