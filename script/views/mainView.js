import * as firebase from "../firebase.js"

export default class View {
    parentContainer = document.body;
    headerHTML = `<header id="header">
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
                <li><a href="#" class="btn btn-primary">Załóż konto</a></li>
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
                <select id="location" name="location">
                  <option value="">Wybierz miejsce</option>
                  <option value="Poznań">Poznań</option>
                  <option value="Gdańsk">Gdańsk</option>
                  <option value="Warszawa">Warszawa</option>
                  <option value="Kraków">Kraków</option>
                </select>
                </div>
                <div class="form-group-dates">
                    <label for="dates">Data odbioru</label>
                    <input class="dateIn" type="date" id="dateIn" name="dateIn">
                    <label for="passengers">Data zwrotu</label>
                    <input class="dateOut" type="date" id="dateOut" name="dateOut">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-secondary">Wyszukaj!</button>
                </div>
            </form>
        </div>
    </div>
</header>`



    homePage() {
        this.parentContainer.addEventListener("click", (a) => {
            if (a.target.closest(".logo")) {
                this.clear();
                this.renderMainView();
            }
        })
    }
    renderMainView() {
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
                    <li><a href="#" class="btn btn-primary">Załóż konto</a></li>
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
                    <select id="location" name="location">
                      <option value="">Wybierz miejsce</option>
                      <option value="Poznań">Poznań</option>
                      <option value="Gdańsk">Gdańsk</option>
                      <option value="Warszawa">Warszawa</option>
                      <option value="Kraków">Kraków</option>
                    </select>
                    </div>
                    <div class="form-group-dates">
                        <label for="dates">Data odbioru</label>
                        <input class="dateIn" type="date" id="dateIn" name="dateIn">
                        <label for="passengers">Data zwrotu</label>
                        <input class="dateOut" type="date" id="dateOut" name="dateOut">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-secondary">Wyszukaj!</button>
                    </div>
                </form>
            </div>
        </div>
    </header>
    <section class="about-us section" id="section-one">
        <div class="about-us-container">
            <div class="div-title">
                <h2>O nas</h2>
            </div>
            <div class="div-img">
                <div class="div-img-text">
                    <h2>Lorem ipsum dolor sit.</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sequi consequatur sit accusamus,
                        reiciendis repudiandae mollitia voluptate quaerat maiores quisquam quibusdam delectus libero,
                        dolor
                        quas unde dolores eveniet impedit, dolore nostrum voluptatem dolorem eligendi tempora rerum.
                        Consequuntur, dolorem magnam. Error sed laborum numquam atque provident placeat debitis
                        quibusdam
                        veritatis exercitationem?</p>
                    <button class="btn section-one-btn">Dowiedz sie wiecej</button>
                </div>
                <div class="div-img-img">
                </div>
            </div>
        </div>
    </section>
    <section class="section our-fleet" id="section-two">
        <div class="operations">
            <h2>Flota</h2>
            <div class="operations__tab-container">
                <div class="div-ducato">
                    <div class="div-ducato-img">
                    </div>
                    <div class="div-ducato-info">
                        <h5>Fiat Ducato 2021r</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, dicta nam numquam commodi
                            fuga, culpa minima ipsam enim distinctio iure non illo. Eius, debitis sint!</p>
                        <ul>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                        </ul>
                        <button class="btn operations__tab operations__tab--1 operations__tab--active" data-tab="1">
                            Bus
                        </button>
                    </div>
                </div>
                <div class="div-talento">
                    <div class="div-talento-info">
                        <h5>Fiat Ducato 2021r</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, dicta nam numquam commodi
                            fuga, culpa minima ipsam enim distinctio iure non illo. Eius, debitis sint!</p>
                        <ul>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                        </ul>
                        <button class="btn operations__tab operations__tab--2" data-tab="2">
                            Van
                        </button>
                    </div>\
                    <div class="div-talento-img">
                    </div>
                </div>
            </div>
    </section>
    <section class="section our-location" id="section-three">
        <div class="figure-div">
            <div class="div-fig div-info-one">
                <h2>Gdańsk</h2>
            </div>
            <div class="div-fig div-info-two">
                <h2>Poznań</h2>
            </div>
            <div class="div-fig div-info-three">
                <h2>Warszawa</h2>
            </div>
            <div class="div-fig div-info-four">
                <h2>Kraków</h2>
            </div>
        </div>
    </section>
    <footer>
        <div class="footer-container">
            <h4>Dariusz Cieśla</h4>
        </div>

                    </footer>`;
        this.clear();
        this.parentContainer.insertAdjacentHTML("afterbegin", html);
    }

    clear() {
        this.parentContainer.innerHTML = ``;
    }

    logOut() {
        this.parentContainer.addEventListener("click", (a) => {
            if (a.target.closest(".log-out-btn")) {
                this.clear();
                this.renderMainView();
                firebase.logOut(firebase.auth).then(() => {
                    alert(`Wylogowano pomyslnie`);
                })
            }
        })
    }
}


export const app = new View();