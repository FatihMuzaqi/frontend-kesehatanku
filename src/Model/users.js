import Cookie from './accessCookie.js';
import { instance } from './index';

class Users {

    static async AuthLogin(data) {
        const res = await instance.post('/login', data, {
            withCredentials: true
        });
        return res.data;
    }
    static async Logout() {
        const res = await instance.get('/logout', {
            withCredentials: true
        });
        return res.data;
    }
    static async Register(data) {
        const res = await instance.post('/user', data);
        return res.data;
    }
    static async getUser() {
        const cookie = await Cookie.getCookie();
        const res = await instance.get('/api/user', {
            headers: {
                Authorization: `Bearer ${cookie.accessToken}`
            }
        })

        return res.data;
    }
    static async getUsers() {
        const res = await instance.get('/api/users');
        return res.data;
    }
    static async createUser(name, email, password) {
        const res = await instance.post('/api/users', {
            name: name,
            email: email,
            password: password,
        });

        return res.data;
    }
    static async deleteUser(id) {
        const res = await instance.delete(`/api/users/${id}`);
        return res.data;
    }
    static async EditUser(id, data) {
        const res = await instance.put(`/api/users/${id}`, data);
        return res.data;
    }
    static async searchUser(email) {
        const res = await instance.post('/api/search-email', {
            email: email
        });
        return res.data;
    }
}


export default Users;