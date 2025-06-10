
export default class LoginPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }
    async Login(email, password) {

        this.#view.setLoadingButton(true);

        try {

            const res = await this.#model.AuthLogin({ email, password });

            if (res.roles) {

                localStorage.setItem('role', res.roles);

                if (res.roles.toLowerCase() === "admin") {
                    this.#view.navigate("/dashboard");
                } else {
                    this.#view.navigate("/");
                }
            }

        } catch (err) {
            console.log(err);
        } finally {
            this.#view.setLoadingButton(false);
        }
    }
}