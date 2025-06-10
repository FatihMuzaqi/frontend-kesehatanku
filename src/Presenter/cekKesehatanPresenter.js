

export default class KesehatanPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async startCekkesehatan() {
        this.#view.setLoading(true);
        try {
            const res = await this.#model.getCookie();
            if (res.status === "success") {
                
            }
        } catch (err) {
            this.#view.navigate("/login");
        } finally {
            this.#view.setLoading(false);
        }
    }

    async getUser() {
        this.#view.setLoading(true);
        try {
            const res = await this.#model.getUser();
            this.#view.setUser(res.user);
        } catch (err) {
            if (err.status === 401) {
                this.#view.navigate("/login");
            }
        } finally {
            this.#view.setLoading(false);
        }
    }

    async PredictKesehatan(value, user) {
        this.#view.setLoadingPredict(true);
        try {
            const res = await this.#model.PredictKesehatan(value, user);
            this.#view.setPredicted(res);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoadingPredict(false);
        }
    }

    async getPertanyaan(id) {
        this.#view.setLoading(true);

        try {
            const res = await this.#model.getPertanyaan(id);
            this.#view.setKategoriPertanyaan(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }
}