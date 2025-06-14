
export default class FooterPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getKategoris() {
        try {
            const res = await this.#model.getKategoris();
            console.log(res);
            this.#view.setKategoriKesehatan(res.data);
            const filterData = res.data.filter((item) =>
                ["Allergy", "Diabetes", "Malaria"].includes(item.nama_kategori)
            );
            this.#view.setFilterCategories(filterData);
        } catch (err) {
            console.error(err);
        }
    }
}