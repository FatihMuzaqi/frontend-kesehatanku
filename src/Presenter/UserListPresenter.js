
export default class UserListPresenter {
    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getUsers() {
        this.#view.setLoading(true);
        try {
            const res = await this.#model.getUsers();
            console.log(res);
            if (res.status === "success") {
                this.#view.setUsers(res.data);
                this.#view.setRenderUsers(res.data);
                this.#view.setEndList(Math.ceil(res.data.length / 5));
            }
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }

    async deleteUser(id) {

        if (!confirm("Apakah anda yakin ingin menghapusnya?")) return;

        this.#view.setLoading(true);

        try {
            const res = await this.#model.deleteUser(id);
            await this.getUsers();
            console.log(res);
        } catch (err) {
            console.error(err);
        }
        finally {
            this.#view.setLoading(false);
        }
    }

    async handleEdit(id, name, email, password, users) {

        this.#view.setLoading(true);
        const searchUserById = users.find(value => value.id === id);
        if (!name) {
            name = searchUserById.name;
        }
        if (!email) {
            email = searchUserById.email;
        }
        if (!password) {
            password = searchUserById.password;
        }
        try {
            const data = {
                name: name,
                email: email,
                password: password
            }
            const res = await this.#model.EditUser(id, data);
            if (res.status === "success") {
                await this.getUsers();
                this.#view.setShowModal(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }

    hanldeFilterRole(value, users) {
        if (value.toLowerCase() === "admin") {
            this.#view.setRenderUsers(users.filter(user => {
                return user.roleId === 1;
            }));

            return;
        }
        if (value.toLowerCase() === "contributor") {
            this.#view.setRenderUsers(users.filter(user => {
                return user.roleId === 2;
            }));

            return;
        }
        this.#view.setRenderUsers(users);
    }
    handleNext(start, end) {
        if (start < end) {
            this.#view.setStartList(start + 1);
            this.#view.setFirstList(start * 5);
            this.#view.setLastList((start + 1) * 5);
            return;
        }
        this.#view.setStartList(1);
        this.#view.setFirstList(0 * 5);
        this.#view.setLastList(1 * 5);
    }
    handlePrev(start, end) {
        if (start > 1) {
            this.#view.setStartList(start - 1);
            this.#view.setFirstList((start - 2) * 5);
            this.#view.setLastList((start - 1) * 5);
            return;
        }

        this.#view.setStartList(end);
        this.#view.setFirstList((end - 1) * 5);
        this.#view.setLastList(end * 5);
    }
}