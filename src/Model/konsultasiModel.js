import { instance } from ".";
import Cookie from "./accessCookie";

export default class KonsultasiModel {

    async createPredict(data) {
        const res = await instance.post('/predict-kulit', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data;
    }

    async getUser() {
        const cookie = await Cookie.getCookie();
        const res = await instance.get('/api/user', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${cookie.accessToken}`
            }
        });
        return res.data;
    }

    async getKonsultasi() {
        const res = await instance.get('/konsultasi');
        return res.data;
    }
    async deleteKonsultasi(id) {
        const res = await instance.delete(`/konsultasi/${id}`);
        return res.data;
    }
    async getUserFromId(id) {
        const res = await instance.get(`/api/user/${id}`);
        return res.data;
    }
}