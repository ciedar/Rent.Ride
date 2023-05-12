import View from "./mainView.js";
import { auth, createAccount, googleAuth, signPop, db } from "../firebase.js";

class LoginView extends View {
    #email;
    #password;
    showView() {
        this.parentContainer.addEventListener("click", (a) => {
            if (!a.target.closest('.btn-primary')) return;
            const html = `<form>
            <label for="email">E-mail:</label>
            <input class="email" type="email" id="email" name="email" required>
          
            <label for="password">Hasło:</label>
            <input class="password" type="password" id="password" name="password" required>
          
            <button class="sign_in" type="submit">Zaloguj</button>
          </form>
          
          <div>
            <p>Lub zaloguj się przez:</p>
            <button class="sign_in_google">Zaloguj przez Google</button>
          </div>
          `
            this.clear();
            this.parentContainer.insertAdjacentHTML("afterbegin", html);
        })
    }
    async sign() {
        try {
            const result = await createAccount(auth, this.#email, this.#password);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    async signGoogle() {
        try {
            const result = await signPop(auth, googleAuth);
            return result
        } catch (error) {
            console.error(error)
        }
    }

    normalEvent() {
        this.parentContainer.addEventListener("click", (a) => {
            const btn = a.target.closest(".sign_in");
            if (!btn) return;
            this.#email = document.querySelector(".email").value;
            this.#password = document.querySelector(".password").value;
        })
    }

    googleEvent() {
        this.parentContainer.addEventListener("click", (a) => {
            const btn = a.target.closest(".sign_in_google");
            if (!btn) return;
            this.signGoogle().then(info => console.log(info)).catch(a => { throw new Error(a) });
        });
    }
}

export const app = new LoginView();