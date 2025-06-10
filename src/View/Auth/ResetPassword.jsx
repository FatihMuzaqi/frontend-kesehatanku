import { useState } from "react";
import LoadingBerputar from "../../Animation Loading/LoadingBerputar";
import resetPasswordPresenter from "../../Presenter/ResetPresenter";
import { FaCheckCircle, FaLock, FaUnlock } from "react-icons/fa";
import ModelForgotPassword from "../../Model/forgotPassword";
import { useParams } from "react-router";

export default function ResetPassword() {

    const [Loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [lockPassword, setLockPassword] = useState(true);
    const [lockConfirmPassword, setLockConfirmPassword] = useState(true);

    const { token } = useParams();

    const presenter = new resetPasswordPresenter({
        model: ModelForgotPassword,
        view: {
            setLoading: setLoading,
            setResponse: setResponse
        }
    });

    async function handleSubmit(e) {
        e.preventDefault();
        await presenter.resetPassword(token, password, confirmPassword);
    }

    return (
        <>
            <div className="container d-flex align-items-center justify-content-center vw-100 vh-100">
                <div className="d-flex align-items-center justify-content-center w-50 h-60">
                    <div className="d-flex flex-column justify-content-center w-100 h-100 p-4">
                        {response?.status !== "success" ?
                            <>
                                <div className="m-15px">
                                    <h4 className="m-0 w-100 text-center fw-bold">Reset Password</h4>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="m-0">
                                        <label htmlFor="password">Enter your new password</label>
                                        <div className="d-flex align-items-center p-1 outline-1 rounded">
                                            <input type={lockPassword ? "password": "text"} name="password" placeholder="example123" onChange={(e) => setPassword(e.target.value)} className="d-block w-100 pi-15 rounded mb-5px border border-0 outline-0" disabled={Loading} required />
                                            <button type="button" onClick={() => setLockPassword(!lockPassword)} className="bg-transparent border border-0 px-2">
                                                {lockPassword ? <FaLock /> : <FaUnlock />}
                                            </button> 
                                        </div>
                                    </div>
                                    <p style={response?.status === "fail" ? {color: 'red'} : {color: 'green'}}>{response?.message}</p>
                                    <div className="m-0">
                                        <label htmlFor="password">Enter confirm password</label>
                                        <div className="d-flex align-items-center p-1 outline-1 rounded">
                                            <input type={lockConfirmPassword ? "password": "text"} name="password" placeholder="example123" onChange={(e) => setPassword(e.target.value)} className="d-block w-100 pi-15 rounded mb-5px border border-0 outline-0" disabled={Loading} required />
                                            <button type="button" onClick={() => setLockConfirmPassword(!lockPassword)} className="bg-transparent border border-0 px-2">
                                                {lockConfirmPassword ? <FaLock /> : <FaUnlock />}
                                            </button> 
                                        </div>
                                    </div>
                                    <button type="submit" className="w-100 btn btn-primary text-light rounded mb-20px fs-6 border border-0 p-8px text-align-center">
                                        {
                                            Loading ? (
                                                <LoadingBerputar wdith={20} hiegth={20} />
                                            ) : (
                                                <span>Submit</span>
                                            )
                                        }
                                    </button>
                                </form>
                            </> :
                            <>
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