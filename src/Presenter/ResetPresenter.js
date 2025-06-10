
export default class resetPasswordPresenter {
    
    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async resetPassword(token, password, confirmPassword) {
        if (password !== confirmPassword) {
            return this.#view.setResponse({
                status: "fail",
                message: "value password dan value confirm password harus sama"
            });
        }
        this.#view.setLoading(true);

        try {
            const res = await this.#model.resetPassword(token, password);
            this.#view.setResponse(res);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }
}