
export default class CreateUserPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async createUser(name, email, password, confirmPassword) {

        if (!(name || email || password || confirmPassword)) {
            alert("mohon untuk mengisi name, email, password, dan confirm password");
            return;
        }
        if (password !== confirmPassword) {
            alert("password dan confirm password tidak boleh berbeda!");
            return;
        }

        this.#view.setLoading(true);
        try {
            const res = await this.#model.createUser(name, email, password);
            if (res.status === "success") {
                alert(res.msg);
                this.#view.navigate("/dashboard/users");
            }
            console.log("Berhasil Membuat Users, status: ", res.status);
        } catch (err) {
            console.error(err);
        }
        finally {
            this.#view.setLoading();
        }
    }
}