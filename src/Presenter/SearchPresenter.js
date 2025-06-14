
export default class SearchPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getArtikel(search) {
        this.#view.setLoading(true);
        try {
            const res = await this.#model.getArticle();
            const filterData = res.data.filter(item =>
                item.judul.toLowerCase().includes(search.toLowerCase())
            );
            this.#view.setArtikel(filterData);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }
    async getKategori() {
        try {
            const res = await this.#model.getKategori();
            this.#view.setKategori(res.data);
        } catch (err) {
            console.error(err);
        }
    }
}