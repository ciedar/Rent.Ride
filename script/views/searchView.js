import View from "./mainView.js";
import * as firebase from "../firebase.js";

class searchView extends View {
  #value;
  #container
  #fleet;
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

  createContainer() {
    this.#container = document.createElement("section");
    this.parentContainer.appendChild(this.#container);
    this.#container.classList.add("section");
    this.#container.classList.add("section-search");
    this.#container.innerHTML = `<div class="side__bar"></div>
                                    <div class="metin2"></div>`

  }
  searchAsideBar() {
    const html = `<aside class="sidebar">
        <div class="sidebar__section">
          <h2 class="sidebar__title">Filtruj wyniki</h2>
          <form class="sidebar__form">
            <label class="sidebar__label" for="carType">Typ samochodu</label>
            <select class="sidebar__select" id="carType" name="carType">
              <option value="">Wszystkie</option>
              <option value="utility">bus</option>
              <option value="suv">van</option>
            </select>
            <div class="slider">
                <input type="range" min="0" max="1000" step="1" value="0" class="slider__range">
                    <div class="slider__values">
                        <span class="slider__value slider__value--left">0</span>
                        <span class="slider__value slider__value--right">1000</span>
                    </div>
            </div>
            <form class="sidebar__form">
            <label class="sidebar__label" for="carType">Lokalizacja auta</label>
            <select class="sidebar__select" id="carType" name="carType">
              <option value="">Warszawa</option>
              <option value="utility">Poznań</option>
              <option value="suv">Kraków</option>
              <option value="convertible">Gdańsk</option>
            </select>
            <button class="sidebar__button" type="submit">Filtruj</button>
          </form>
        </div>
      </aside>`;
    document.querySelector(".side__bar").insertAdjacentHTML("afterbegin", html);
  }

  async loadCars(a) {
    try {
      this.#fleet = await firebase.showData(a);
      this.createContainer();
      this.searchAsideBar()
      const data = this.#fleet.docs.map(a => { return a.data() });
      const filter = data.filter((a) => {
        if (a.location === `${this.#value.value.toLowerCase()}`) {
          return a;
        }
      })
      if (this.#value.value.toLowerCase() != "wszystkie") {
        filter.forEach(async (a) => {
          const html = ` 
                   <div class="car-info car-info-${a.id}" id="${a.id}"> 
                   <img src="${await firebase.refURL(a.imgUrl)}" width="200px">
                   <div class="fire_fire">
                   <h2 class="name">${a.model}</h2>
                   <p>asdmaskd aksdjasik asdybasdjh jasnda</p>
                   <button class="reserv-btn">sprawdzam</button>
                   </div>
                   </div>`
          document.querySelector(".metin2").insertAdjacentHTML("afterbegin", html);
        });
      } else {
        data.forEach(async (a) => {
          const html = ` 
          <div class="car-info car-info-${a.id}" id="${a.id}"> 
                   <img src="${await firebase.refURL(a.imgUrl)}" width="200px">
                   <div class="fire_fire">
                   <h2 class="name">${a.model}</h2>
                   <p>asdmaskd aksdjasik asdybasdjh jasnda</p>
                   <button class="reserv-btn">sprawdzam</button>
                   </div>
                   </div>`
          document.querySelector(".metin2").insertAdjacentHTML("afterbegin", html);
        })
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  evnet() {
    this.parentContainer.addEventListener("click", (a) => {
      if (!a.target.closest(".btn-secondary")) return;
      this.#value = document.querySelector("#location");
      this.clear();
      firebase.checkCurrentUser().then((user) => {
        if (user != null) {
          this.parentContainer.insertAdjacentHTML("afterbegin", this.#headerHTML);
          this.loadCars("cars")
        } else {
          this.parentContainer.insertAdjacentHTML("afterbegin", this.headerHTML);
          this.loadCars("cars")
        }
      })

    })
  }
}

export const app = new searchView();