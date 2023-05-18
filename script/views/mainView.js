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
        const html = `<header>
        <nav>
            <div class="logo">
                <a href="#">Rent&Ride</a>
            </div>
            <div class="nav-links">
                <ul>
                    <li><a href="#">Wypożycz</a></li>
                    <li><a href="#">Dlaczego my</a></li>
                    <li><a href="#">Flota</a></li>
                    <li><a href="#">Miasta</a></li>
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
        <div class="card card-gda">
            <div class="card-inner">
                <div class="card-side card-side-front">
                    <div class="card-image">
                        <img src="/images/cities/gdansk.jpg" alt="card-img">
                    </div>
                    <div class="card-body">
                        <h2 class="card-title">Gdańsk</h2>
                        <span class="card-arrow">&rarr;</span>
                    </div>
                </div>
                <div class="card-side card-side-back">
                    <div class="card-body">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A laboriosam dolores pariatur
                            placeat quaerat est, unde, officiis harum facere aliquid eaque iste rem consequuntur quas
                            quibusdam rerum animi? Eius blanditiis dolorum numquam vel, obcaecati odit! Optio deleniti
                            recusandae, iusto quaerat rem est totam incidunt obcaecati voluptas vitae voluptate
                            veritatis, nihil atque unde modi officiis nobis! Atque sapiente, esse beatae dolor ducimus
                            aspernatur, id tenetur illo eveniet quos omnis dicta! Nam aliquid laudantium voluptatem
                            possimus. Distinctio quibusdam quis officiis explicabo ipsa quisquam aut vitae quas commodi
                            laboriosam fugit deserunt velit labore ullam, voluptatibus dicta porro eos laborum, error
                            ratione! Consequatur, voluptatem.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-poz">
            <div class="card-inner">
                <div class="card-side card-side-front">
                    <div class="card-image">
                        <img src="/images/cities/poznan.jpg" alt="card-img">
                    </div>
                    <div class="card-body">
                        <h2 class="card-title">Gdańsk</h2>
                        <span class="card-arrow">&rarr;</span>
                    </div>
                </div>
                <div class="card-side card-side-back">
                    <div class="card-body">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga repellat illum autem
                            dignissimos vero minus accusamus, quam necessitatibus quod iusto. Reiciendis tempore eius
                            qui inventore officia esse numquam provident iste molestiae nulla consectetur itaque harum
                            nisi illum, minus labore ea perspiciatis, enim neque veritatis? Quia ad deleniti laborum
                            amet beatae autem minima impedit, accusamus natus blanditiis! Fugit, excepturi! Facere
                            aliquid corrupti adipisci ipsum at vero dolore nam animi. Impedit unde qui delectus
                            excepturi nostrum reiciendis praesentium, quis veniam accusamus, consequuntur, perspiciatis
                            quia cupiditate? Facere tempore, labore accusamus tenetur similique quo, veritatis deserunt
                            dignissimos rem numquam pariatur quae, eos error. Quae!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-war">
            <div class="card-inner">
                <div class="card-side card-side-front">
                    <div class="card-image">
                        <img src="/images/cities/warsaw.jpg" alt="card-img">
                    </div>
                    <div class="card-body">
                        <h2 class="card-title">Gdańsk</h2>
                        <span class="card-arrow">&rarr;</span>
                    </div>
                </div>
                <div class="card-side card-side-back">
                    <div class="card-body">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga tempora nostrum harum
                            recusandae odit sapiente id fugit, ad quasi veritatis quidem, animi itaque maxime numquam
                            eligendi soluta quis minima vero sit excepturi labore consectetur asperiores ex reiciendis?
                            Dicta aperiam soluta sunt sit expedita quia sequi veniam adipisci impedit nihil distinctio
                            suscipit, doloremque fugit numquam eos? Eveniet magnam facere libero molestiae sunt quis
                            dicta earum ipsa amet natus praesentium deleniti ut nisi nemo quos architecto accusamus
                            dolore laboriosam, tenetur itaque nam nihil numquam eos quod? Fugit laudantium ullam
                            obcaecati nobis sunt adipisci, iste explicabo placeat quo voluptatibus necessitatibus
                            provident, vero in.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-kra">
            <div class="card-inner">
                <div class="card-side card-side-front">
                    <div class="card-image">
                        <img src="/images/cities/krakow.jpg" alt="card-img">
                    </div>
                    <div class="card-body">
                        <h2 class="card-title">Gdańsk</h2>
                        <span class="card-arrow">&rarr;</span>
                    </div>
                </div>
                <div class="card-side card-side-back">
                    <div class="card-body">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ratione unde corrupti,
                            expedita debitis tenetur eos optio amet dolores ipsam odit alias cumque eius impedit
                            voluptate reprehenderit aspernatur. Recusandae aliquid molestias corrupti animi quis
                            officiis optio dolore esse ullam perferendis? Aut odio adipisci architecto quia aliquam
                            quidem ipsam alias. Quo rem quae est saepe dolores perferendis temporibus consequuntur
                            aspernatur quis. Excepturi aut dolorum maxime sint nesciunt ab eaque, omnis velit quidem
                            facere deleniti itaque quam ut numquam atque possimus fugiat sunt fugit eveniet blanditiis
                            provident! Eum odio voluptate nihil odit repellendus, qui doloremque esse vero neque aliquid
                            soluta enim culpa!</p>
                    </div>
                </div>
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