
export default class CategoriPresenter {
    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getKategori() {
        this.#view.setLoading(true);
        try {
            const res = await this.#model.getKategori();
            this.#view.Kategoris(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }

    async createKategori(kategori, deskripsi, image) {
        this.#view.setLoading(true);
        try {
            const data = new FormData();
            data.append("nama_kategori", kategori);
            data.append("deskripsi", deskripsi);
            data.append("images", image);
            const res = await this.#model.createKategori(data);
            this.getKategori();
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }

    async editKategori(id, kategori, deskripsi, image) {
        this.#view.setLoading(true);

        try {
            const data = new FormData();
            data.append("nama_kategori", kategori);
            data.append("deskripsi", deskripsi);
            data.append("images", image);
            const res = await this.#model.editKategori(id, data);
            await this.getKategori();
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }

    async deleteKategori(id) {
        this.#view.setLoading(true);

        if (!confirm("Apakah anda benar ingin menghapusnya?")) {
            console.log("tidak jadi menghapus kategori");
            return;
        }

        try {
            const res = await this.#model.deleteKategori(id);
            if (res.status === "success") {
                await this.getKategori();
                console.log("Berhasil Menghapus kategori");
            }
        } catch (err) {
            console.error(err);
        }
        finally {
            this.#view.setLoading(false);
        }
    }
    async simpanKategori(id, kategori, deskripsi, kategoris, image) {
        if (id !== null) {
            const searchKategoriById = kategoris.find(value => value.id === id);
            image = image ? image : searchKategoriById.images;
            kategori = kategori ? kategori : searchKategoriById.nama_kategori;
            deskripsi = deskripsi ? deskripsi : searchKategoriById.deskripsi;
            await this.editKategori(id, kategori, searchKategoriById.deskripsi, image);
            this.#view.setShowModal(false);
            return;
        }
        await this.createKategori(kategori, deskripsi, image);
        this.#view.setShowModal(false);
    }
}
