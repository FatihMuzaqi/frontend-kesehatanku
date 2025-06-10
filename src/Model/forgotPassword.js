import { instance } from ".";

export default class ModelForgotPassword {

    static async ForgotPassword(email) {
        const res = await instance.post('/request-password-reset', {
            email: email
        });
        return res.data;
    }

    static async resetPassword(token, password) {
        const res = await instance.post(`/reset-password/${token}`, {
            newPassword: password
        });
        return res.data;
    }
}