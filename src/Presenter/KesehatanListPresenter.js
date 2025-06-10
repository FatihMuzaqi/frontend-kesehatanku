
export default class KesehatanListPresenter {

    #model; 
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getKesehatan() {
        try {
            const res = await this.#model.getKesehatan();
            for (const data of res.data) {
                const user = await this.#model.getUserFromId(data.user_id);
                data.user = user.data;
            }
            this.#view.setRenderKesehatan(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async deleteKesehatan(id) {
        try {
            if (confirm("Apakah anda yakin ingin menghapusnya?")) {
                const res = await this.#model.deleteKesehatan(id);
                alert(res.message);
                this.getKesehatan();
            }
        } catch (err) {
            console.error(err);
        }
    }
}