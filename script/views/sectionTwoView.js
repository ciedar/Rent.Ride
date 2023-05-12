import View from "./mainView.js";

class TwoView extends View {


    showView() {
        this.parentContainer.addEventListener("click", (a) => {
            if (!a.target.closest(".div-ducato") && !a.target.closest(".div-talento")) return;
            this.clear();
            const html = ``;
            this.parentContainer.insertAdjacentHTML("afterbegin", html);
        })
    }

}

export const app = new TwoView();