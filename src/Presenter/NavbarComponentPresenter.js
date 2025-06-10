
export default class NavbarComponentPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getKategori() {
        try {
            const res = await this.#model.getKategori();
            this.#view.setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async getUser() {
        try {
            const res = await this.#model.getUser();
            this.#view.setUser(res.user);
        } catch {
            this.#view.setUser(null);
        }
    }

    async Logout() {
        try {
            if (confirm("Apakah anda yakin ingin Logout?")) {
                const res = await this.#model.Logout();
                alert(res.message);
                this.#view.navigate("/login");
            }
        } catch (err) {
            console.error(err);
        }
    }

}