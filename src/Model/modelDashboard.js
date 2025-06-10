import { instance } from ".";
import Cookie from "./accessCookie";

export default class Dashboard {

    static async getKategori() {
        const res = await instance.get('/api/kategori');
        return res.data;
    }

    static async createKategori(data) {
        const res = await instance.post('/api/kategori', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return res.data;
    }

    static async editKategori(id, data) {
        const res = await instance.put(`/api/kategori/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return res.data;
    }

    static async deleteKategori(id) {
        const res = await instance.delete(`/api/kategori/${id}`);
        return res.data;
    }

    static async createArticle(data) {
        const res = await instance.post('/api/artikel', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data;
    }
    static async getArticle() {
        const res = await instance.get('/api/artikel');
        return res.data;
    }
    static async deleteArticle(id) {
        const res = await instance.delete(`/api/artikel/${id}`);
        return res.data;
    }
    static async updateArticle(id, data) {
        const res = await instance.put(`/api/artikel/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data;
    }

    static async getUser() {
        const cookie = await Cookie.getCookie();
        const res = await instance.get('/api/user', {
            headers: {
                Authorization: `Bearer ${cookie.accessToken}`
            }
        });

        return res.data;
    }
    static async Logout() {
        const res = await instance.get('/logout', {
            withCredentials: true
        });
        return res.data;
    }
}