
export default class LoginPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }
    async Login(email, password, checked) {

        this.#view.setLoadingButton(true);
        localStorage.removeItem("checked");

        if (checked) {
            localStorage.setItem("checked", checked);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        }

        try {
            const res = await this.#model.AuthLogin({ email, password });
            if (res.roles) {
                this.#view.setResponseMessage({ status: "success", message: "Berhasil Login" });
                alert("Berhasil Login")
                localStorage.setItem('role', res.roles);
                if (res.roles.toLowerCase() === "admin") {
                    this.#view.navigate("/dashboard");
                } else {
                    this.#view.navigate("/");
                }
            }

        } catch (err) {
            console.error(err);
            this.#view.setResponseMessage({ status: "fail", message: "email atau password tidak valid!!" });
        } finally {
            this.#view.setLoadingButton(false);
        }
    }
}