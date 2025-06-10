import { useState } from "react";
import { Button } from "react-bootstrap";
import Users from "../../Model/users";
import LoadingBerputar from "../../Animation Loading/LoadingBerputar";
import { Link, useNavigate } from "react-router";
import LoginPresenter from "../../Presenter/LoginPresenter";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [LoadingButton, setLoadingButton] = useState(false);

    const presenter = new LoginPresenter({
        model: Users,
        view: {
            setEmail: setEmail,
            setPassword: setPassword,
            setLoadingButton: setLoadingButton,
            navigate: navigate
        }
    });

    function submit(e) {
        e.preventDefault();
        presenter.Login(email, password);
    }

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center vw-100 dvh-100">
                <div className="d-flex align-items-center justify-content-center w-80 h-100">
                    <div className="d-flex flex-column w-50 h-100 p-20px w-lg-90">
                        <div className="">
                            <img src="/image/LogoHealth.png" className="w-100px h-60px m-0" alt="Logo Health" />
                        </div>
                        <div className="m-15px">
                            <h3 className="m-0">Selamat datang kembali!</h3>
                            <span className="fs-15px color-span">Masuk untuk melanjutkan akses informasi kesehatan Anda dengan mudah</span>
                        </div>
                        <form onSubmit={submit}>
                            <div className="mb-20px">
                                <label htmlFor="email">Email Address</label>
                                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="email@gmail.com" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={LoadingButton} />
                            </div>
                            <div className="mb-20px">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="********" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={LoadingButton} />
                            </div>
                            <div className="group-checked">
                                <input type="checkbox" name="" id="" />
                                <span>Keep me logged in</span>
                            </div>
                            <Button type="submit" variant="primary" className="w-100 d-flex align-items-center justify-content-center text-light mb-20px rounded border p-8px" disabled={LoadingButton}>
                                { LoadingButton ? <LoadingBerputar wdith={20} hiegth={20}/> : <><span>Login</span></> }
                            </Button>
                            <div className="text-center mb-10px">
                                <span>Don't have account? <a href="/register">Sign Up</a></span>
                            </div>
                            <div className="text-center mb-10px">
                                <Link to="/forgot-password">Reset Password</Link>
                            </div>
                        </form>
                    </div>
                    <div className="w-100 h-100 d-none d-lg-block">
                        <img src="/image/7191136_3568984.jpg" className="w-100 h-100 bg-dark" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}