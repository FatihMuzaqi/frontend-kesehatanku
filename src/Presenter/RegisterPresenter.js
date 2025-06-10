
export default class RegisterPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async Register(name, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            return this.#view.setMessage({name: "password", message:"confirm password tidak valid"});
        }
        if (password.slice("").length < 8) {
            return this.#view.setMessage({ name: "password", message: "Character Password harus lebih dari 8"});
        }
        this.#view.setLoading(true);

        try {
            const data = {
                name: name,
                email: email,
                password: password,
                confPassword: confirmPassword
            }
            const res = await this.#model.Register(data);
            if (res.status === "success") {
                alert(res.msg);
                this.#view.navigate("/login");
            }
        } catch (err) {
            console.log(err);
            this.#view.setMessage(err.message);
        } finally {
            this.#view.setLoading(false);
        }
    }

    async searchEmail(value) {

        if (value === "" || null) {
            this.#view.setShowCheck(false);
            return;
        }

        this.#view.setShowCheck(true);
        this.#view.setLoadingCheck(true);
        try {
            const res = await this.#model.searchUser(value);
            this.#view.setEmailAvailable(res.email);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoadingCheck(false);
        }
    }
}