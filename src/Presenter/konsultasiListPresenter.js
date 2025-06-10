
export default class KonsultasiListPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getKonsultasi() {
        try {
            const res = await this.#model.getKonsultasi();
            for (const data of res.data) {
                const user = await this.#model.getUserFromId(data.user_id);
                data.user = user.data;
            }
            this.#view.setKonsultasi(res.data);
            this.#view.setRenderKonsultasi(res.data);
        } catch (err) {
            console.error(err);
        }
    }
    async deleteKonsultasi(id) {
        try {
            if (confirm("Apakah anda yakin ingin menghapusnya?")) {
                const res = await this.#model.deleteKonsultasi(id);
                alert(res.message);
                this.getKonsultasi();
            }
        } catch (err) {
            console.error(err);
        }
    }
}