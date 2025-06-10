
export default class MainLayoutPresenter {
    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async Logout() {
        try {
            if (confirm("Apakah anda yakin ingin Logout?")) {
                const res = await this.#model.Users.Logout();
                alert(res.message);
                this.#view.navigate("/login");
            }
        } catch (err) {
            console.error(err);
        }
    }

    async getUser() {
        try {
            const res = await this.#model.Users.getUser();
            this.#view.setUser(res.user);
        } catch (err) {
            console.error(err);
        }
    }
}