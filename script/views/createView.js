import View from "./mainView.js";
import * as firebase from "../firebase.js";

class CreateView extends View {
    #email;
    #password;
    #username;
    createAccountView() {
        this.parentContainer.addEventListener("click", (a) => {
            if (!a.target.closest('.btn-primary')) return;
            const html = `
            <div class="login-div">
                <div class="login-form-div">
                    <div class="email-div">
                        <label for="email">E-mail:</label>
                        <input class="email" placeholder="e-mail" type="email" id="email" name="email" required>
                    </div>
                <div class="email-div">
                    <label for="password">Hasło:</label>
                    <input class="password" placeholder="password" type="password" id="password" name="password" required>
                </div>
                <div class="user-div">
                    <label for="username">Nazwa użytkownika:</label>
                    <input class="username" placeholder="username" type="username" id="username" name="username" required>
                </div>
                    <button class="register" type="submit">Zarejestruj</button>
          </div>
          <div>
            <p>Lub zaloguj się przez:</p>
            <button class="register_in_google">Zarejestruj przez Google</button>
          </div>
          <p>Jesteś już naszym użytkownikiem? </p>
          <button class="login-btn">Zaloguj</button>
          </div>
          `
            this.clear();
            this.parentContainer.insertAdjacentHTML("afterbegin", html);
        })
    }
    async sign() {
        try {
            const result = await firebase.createAccount(firebase.auth, this.#email, this.#password);
            const { user } = result;
            console.log(user)
            firebase.createUserData(user, this.#username, this.#password);
        } catch (error) {
            console.log(error)
        }
    }
    async signGoogle() {
        try {
            const result = await firebase.signPop(firebase.auth, firebase.googleAuth);
            return result
        } catch (error) {
            console.error(error)
        }
    }

    normalEvent() {
        this.parentContainer.addEventListener("click", (a) => {
            const btn = a.target.closest(".register");
            if (!btn) return;
            this.#email = document.querySelector(".email").value;
            this.#password = document.querySelector(".password").value;
            this.#username = document.querySelector(".username").value;
            this.sign();
            // userInfo.then((a) => { console.log(a?.user?.email) });
        })
    }

    googleEvent() {
        this.parentContainer.addEventListener("click", (a) => {
            const btn = a.target.closest(".register_in_google");
            if (!btn) return;
            this.signGoogle().then(info => console.log(info)).catch(a => { throw new Error(a) });
        });
    }

}

export const app = new CreateView();