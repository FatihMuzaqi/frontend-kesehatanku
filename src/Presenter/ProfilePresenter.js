import Cookie from "../Model/accessCookie";

export default class ProfilePresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getUser() {
        try {
            const res = await this.#model.getUser();
            this.#view.setUser(res.user);
        } catch (err) {
            console.error(err);
        }
    }

}