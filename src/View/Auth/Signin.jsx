import { useState } from "react";
import LoadingBerputar from "../../Animation Loading/LoadingBerputar";
import Users from "../../Model/users";
import RegisterPresenter from "../../Presenter/RegisterPresenter";
import { useNavigate } from "react-router";
import { FaCross } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


export default function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [LoadingCheck, setLoadingCheck] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(true);

    const presenter = new RegisterPresenter({
        model: Users,
        view: {
            setLoading: setLoading,
            setMessage: setMessage,
            navigate: navigate,
            setShowCheck: setShowCheck,
            setLoadingCheck: setLoadingCheck,
            setEmailAvailable: setEmailAvailable
        }
    })

    async function Submit(e) {
        e.preventDefault();
        await presenter.Register(name, email, password, confirmPassword);
    }

    async function hanldeInputEmail(e) {
        setEmail(e.target.value);
        setTimeout(async () => {
            await presenter.searchEmail(e.target.value);
        }, 500);
    }

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vw-100 dvh-100">
            <div className="d-flex align-items-center justify-content-center w-80 h-90">
                <div className="d-flex flex-column w-50 h-100 p-20px w-lg-90">
                    <div className="">
                        <img src="/image/LogoHealth.png" className="w-100px h-60px m-0" alt="Logo Health" />
                    </div>
                    <div className="m-15px">
                        <h3 className="m-0">Get Started</h3>
                        <span className="fs-15px color-span">
                            Buat akun untuk mulai mengakses berbagai informasi dan layanan kesehatan terpercaya.
                        </span>
                    </div>
                    <form onSubmit={Submit}>
                            <>
                                <div>
                                    <label htmlFor="text">Name</label>
                                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} placeholder="username" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} required />
                                </div>
                                <div>
                                    <label htmlFor="email">Email Address</label>
                                    <div className="d-flex align-items-center justify-content-center w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1">
                                        <input type="email" name="email" id="email" onChange={hanldeInputEmail} placeholder="email@gmail.com" className="border border-0 outline-0 w-100" disabled={Loading} required />
                                        {showCheck ?
                                            <>
                                                {LoadingCheck ? <div className="w-20px"><LoadingBerputar wdith={20} hiegth={20} /></div> : emailAvailable ? <div className="c-red"><FaTimesCircle /></div> : <div className="c-green"><FaCheckCircle /></div>}
                                            </> : <></>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="********" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} required />
                                </div>
                                {message?.name === "password" ? <p className="text-danger">{message.message}</p> : <></>}
                                <div>
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="********" className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} required />
                                </div>
                                <button type="submit" className="w-100 btn btn-primary text-light rounded-20px mb-20px fs-6 border  border-0 p-8px text-align-center" disabled={emailAvailable}>
                                    {Loading ? (
                                        <LoadingBerputar wdith={20} hiegth={20} />
                                    ) : (
                                        <span>Create Account</span>
                                    )}
                                </button>
                            </>
                        <div className="text-center mb-10px">
                            <span>I have already account? <a href="/login">Login</a></span>
                        </div>
                    </form>
                </div>
                <div className="w-100 h-100 d-none d-lg-block">
                    <img src="/image/7191136_3568984.jpg" className="w-100 h-100 object-fit-cover bg-dark" alt="" />
                </div>
            </div>
        </div>
    )
}