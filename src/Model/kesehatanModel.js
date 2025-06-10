import { instance } from ".";
import Cookie from "./accessCookie";

export default class Kesehatan {

    async PredictKesehatan(value, user) {
        const res = await instance.post('/predict-kesehatan', {
            symptoms: value,
            user: user
        });

        return res.data;
    }

    async getPertanyaan(id) {
        const res = await instance.get(`/api/questions/${id}`);
        return res.data;
    }

    async getUser() {
        const cookie = await Cookie.getCookie();
        const res = await instance.get('/api/user', {
            headers: {
                Authorization: `Bearer ${cookie.accessToken}`
            }
        });
        return res.data;
    }

    async getKesehatan() {
        const res = await instance.get('/kesehatan');
        return res.data;
    }

    async deleteKesehatan(id) {
        const res = await instance.delete(`/kesehatan/${id}`);
        return res.data;
    }

    async getUserFromId(id) {
        const res = await instance.get(`/api/user/${id}`);
        return res.data;
    }
}