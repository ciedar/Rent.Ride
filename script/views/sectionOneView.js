import View from "./mainView.js";


class OneView extends View {


    showView() {
        this.parentContainer.addEventListener("click", (a) => {
            if (!a.target.closest(".section-one-btn")) return;
            this.clear();
            const html = ``;
            this.parentContainer.insertAdjacentHTML("afterbegin", html);
        })
    }
}

export const app = new OneView();