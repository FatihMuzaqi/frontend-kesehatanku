import { useState } from "react";
import LoadingBerputar from "../../Animation Loading/LoadingBerputar";
import { FaCheckCircle } from "react-icons/fa";
import ForgotPasswordPresenter from "../../Presenter/ForgotPasswordPresenter";
import ModelForgotPassword from "../../Model/forgotPassword";

export default function ForgotPassword() {

    const [Loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [email, setEmail] = useState(null);

    const presenter = new ForgotPasswordPresenter({
        model: ModelForgotPassword,
        view: {
            setResponse: setResponse,
            setLoading: setLoading
        }
    });

    async function hanldeSubmit(e) {
        e.preventDefault();
        await presenter.ForgotPassword(email);
    }

    return (
        <>
            <div className="container d-flex align-items-center justify-content-center vw-100 vh-100">
                <div className="d-flex align-items-center justify-content-center w-50 h-60">
                    <div className="d-flex flex-column justify-content-center w-100 h-100 p-4">
                        {response?.status !== "success" ?
                            <>
                                <div className="w-100 text-center">
                                    <img src="/image/LogoHealth.jpg" className="w-60px h-60px m-0" alt="Logo Health" />
                                </div>
                                <div className="m-15px">
                                    <h3 className="m-0 w-100 text-center fw-bold">Forgot your password?</h3>
                                    <p className="fs-15px color-span text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit temporibus enim corrupti adipisci voluptate odit!</p>
                                </div>
                                <form onSubmit={hanldeSubmit}>
                                    <div className="m-0">
                                        <label htmlFor="email">Enter your email</label>
                                        <input type="email" name="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} className="d-block w-100 p-8px pi-15 rounded-20px mb-5px border border-0 outline-1" disabled={Loading} required />
                                    </div>
                                    <button type="submit" className="w-100 btn btn-primary text-light rounded-20px mb-20px fs-6 border border-0 p-8px text-align-center">
                                        {
                                            Loading ? (
                                                <LoadingBerputar wdith={20} hiegth={20} />
                                            ) : (
                                                <span>Submit</span>
                                            )
                                        }
                                    </button>
                                </form>
                            </> : <>
                            <div className="d-flex flex-column align-items-center p-2">
                                <FaCheckCircle className="color-green fs-3 m-3" />
                                <h4>{response.status}</h4>
                                <p>{response.message}</p>
                            </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}