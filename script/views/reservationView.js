import View from "./mainView.js";
import * as firebase from "../firebase.js";


class ReservationView extends View {


    event() {
        document.body.addEventListener("click", async (a) => {
            if (!a.target.closest(".reserv-btn")) return;
            const id = a.target.closest(".car-info").getAttribute("id");
            const dataElement = await firebase.getData(id);
            console.log(dataElement.data())

            const html = `${this.headerHTML}
            <div class="reservation-div">
                <div class="reservation-div-img">
                    <img src="${await firebase.refURL(dataElement.data().imgUrl)}" width="400px">
                </div>
                <div class="reservation-div-info">
                    <h5>${dataElement.data().model}</h5>
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
                        ${dataElement.data().price}zł/day
                    </button>
                </div>
            </div>`
            this.clear();
            this.parentContainer.insertAdjacentHTML("afterbegin", html);
        })
    }
}



export const app = new ReservationView();